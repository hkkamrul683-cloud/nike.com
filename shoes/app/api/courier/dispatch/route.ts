import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { createSteadfastParcel } from '@/lib/courier';
import { convertUsdToBdt } from '@/lib/payment';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 403 });
    }

    const body = await req.json();
    const { orderId, note } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const ordersCol = await getCollection('orders');

    let query: any;
    if (ObjectId.isValid(orderId)) {
      query = { _id: new ObjectId(orderId) };
    } else {
      query = { orderNumber: orderId };
    }

    const order = await ordersCol.findOne(query);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Determine COD amount in BDT
    // If the customer already paid online (SSLCommerz or Stripe), COD is 0
    let codAmountBDT = 0;
    if (order.paymentStatus !== 'PAID' && order.paymentMethod === 'CASH_ON_DELIVERY') {
      codAmountBDT = convertUsdToBdt(order.totalAmount || 0);
    }

    // Build recipient address
    const addr = order.shippingAddress || {};
    const fullAddress = [
      addr.addressLine1,
      addr.addressLine2,
      addr.city,
      addr.state,
      addr.postalCode,
      addr.country || 'Bangladesh',
    ]
      .filter(Boolean)
      .join(', ');

    const recipientPhone = order.customerPhone || addr.phone || '01700000000';
    const recipientName = order.customerName || addr.fullName || 'Customer';

    // Item summary for package note
    const itemsSummary = (order.items || [])
      .map((item: any) => `${item.name} (${item.size || 'Std'}) x${item.quantity}`)
      .join(', ');

    const dispatchNote = note || `Sportix Order ${order.orderNumber}: ${itemsSummary.slice(0, 90)}`;

    // Call Steadfast parcel creation API (or sandbox simulation)
    const parcelResult = await createSteadfastParcel({
      invoice: order.orderNumber,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
      recipient_address: fullAddress,
      cod_amount: codAmountBDT,
      note: dispatchNote,
    });

    if (!parcelResult.success) {
      return NextResponse.json({ error: parcelResult.message || 'Failed to dispatch parcel to courier' }, { status: 500 });
    }

    // Update Order in MongoDB
    const courierData = {
      provider: 'Steadfast Courier',
      consignmentId: parcelResult.consignment_id,
      trackingCode: parcelResult.tracking_code,
      deliveryStatus: parcelResult.status || 'in_review',
      codAmountBDT: parcelResult.cod_amount,
      trackingUrl: parcelResult.tracking_url,
      dispatchedAt: new Date(),
      isDemo: parcelResult.isDemo || false,
    };

    const updatedOrder = await ordersCol.findOneAndUpdate(
      query,
      {
        $set: {
          status: 'SHIPPED',
          trackingNumber: parcelResult.tracking_code,
          courier: courierData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    return NextResponse.json({
      success: true,
      message: parcelResult.message,
      consignment: parcelResult,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error('Courier dispatch error:', error);
    return NextResponse.json({ error: error.message || 'Courier dispatch failed' }, { status: 500 });
  }
}
