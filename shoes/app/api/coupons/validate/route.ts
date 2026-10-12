import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json({ success: false, message: 'Please enter a coupon code' }, { status: 400 });
    }

    const couponsCol = await getCollection('coupons');
    const coupon = await couponsCol.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return NextResponse.json({ success: false, message: 'Invalid or expired promo code' }, { status: 404 });
    }

    const currentSubtotal = parseFloat(subtotal || '0');
    if (currentSubtotal < coupon.minOrder) {
      return NextResponse.json({
        success: false,
        message: `This coupon requires a minimum subtotal of $${coupon.minOrder.toFixed(2)}`,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrder: coupon.minOrder,
      },
    });
  } catch (error: any) {
    console.error('Coupon validation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
