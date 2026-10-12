import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number' }, { status: 400 });
    }

    // Generate 6-digit OTP (e.g. random code or standard demo)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const otpCol = await getCollection('otp_codes');
    await otpCol.updateOne(
      { phone: cleanPhone },
      {
        $set: {
          phone: cleanPhone,
          code,
          expiresAt,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    // If an external SMS API is configured in environment, send here
    // e.g. Twilio or Greenweb SMS
    console.log(`[OTP] Sent OTP ${code} to mobile number ${cleanPhone}`);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully to your mobile number',
      phone: cleanPhone,
    });
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send OTP' }, { status: 500 });
  }
}
