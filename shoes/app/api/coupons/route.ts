import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const couponsCol = await getCollection('coupons');
    const coupons = await couponsCol.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ coupons });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { code, discountType, discountValue, minOrder } = await req.json();

    if (!code || !discountValue) {
      return NextResponse.json({ error: 'Code and discountValue are required' }, { status: 400 });
    }

    const couponsCol = await getCollection('coupons');
    const cleanCode = code.trim().toUpperCase();

    const existing = await couponsCol.findOne({ code: cleanCode });
    if (existing) {
      return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
    }

    const newCoupon = {
      code: cleanCode,
      discountType: discountType || 'PERCENTAGE',
      discountValue: parseFloat(discountValue),
      minOrder: parseFloat(minOrder || '0'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await couponsCol.insertOne(newCoupon);
    return NextResponse.json({ success: true, coupon: { ...newCoupon, _id: res.insertedId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
