import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const orderId = formData.get('value_a')?.toString();
    const failedReason = formData.get('failedreason')?.toString() || 'Transaction failed';

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    if (orderId && ObjectId.isValid(orderId)) {
      const ordersCol = await getCollection('orders');
      await ordersCol.updateOne(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            paymentStatus: 'FAILED',
            updatedAt: new Date(),
          },
        }
      );
    }

    return NextResponse.redirect(
      `${siteUrl}/checkout?error=${encodeURIComponent(failedReason || 'Payment failed')}`,
      { status: 303 }
    );
  } catch (error: any) {
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;
    return NextResponse.redirect(`${siteUrl}/checkout?error=Payment%20failed`, {
      status: 303,
    });
  }
}
