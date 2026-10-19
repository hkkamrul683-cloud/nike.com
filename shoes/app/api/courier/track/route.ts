import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getSteadfastStatus } from '@/lib/courier';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const orderId = searchParams.get('orderId');

    if (!code && !orderId) {
      return NextResponse.json({ error: 'Tracking code or order identifier required' }, { status: 400 });
    }

    const ordersCol = await getCollection('orders');
    let order: any = null;

    if (orderId) {
      const query = ObjectId.isValid(orderId) ? { _id: new ObjectId(orderId) } : { orderNumber: orderId };
      order = await ordersCol.findOne(query);
    } else if (code) {
      order = await ordersCol.findOne({
        $or: [
          { trackingNumber: code },
          { 'courier.trackingCode': code },
          { 'courier.consignmentId': code },
        ],
      });
    }

    const trackingCode = code || order?.courier?.trackingCode || order?.trackingNumber;
    const cid = order?.courier?.consignmentId;

    let liveStatus = 'in_review';
    let isDemo = true;

    if (cid || trackingCode) {
      const courierCheck = await getSteadfastStatus(cid || trackingCode);
      if (courierCheck && courierCheck.deliveryStatus) {
        liveStatus = courierCheck.deliveryStatus;
        isDemo = courierCheck.isDemo || false;
      }
    }

    return NextResponse.json({
      success: true,
      trackingCode,
      consignmentId: cid,
      deliveryStatus: liveStatus,
      isDemo,
      provider: order?.courier?.provider || 'Steadfast Courier',
      trackingUrl: `https://steadfast.com.bd/t/${trackingCode}`,
      orderNumber: order?.orderNumber,
      orderStatus: order?.status,
      codAmountBDT: order?.courier?.codAmountBDT ?? 0,
      dispatchedAt: order?.courier?.dispatchedAt,
    });
  } catch (error: any) {
    console.error('Courier track API error:', error);
    return NextResponse.json({ error: error.message || 'Tracking inquiry failed' }, { status: 500 });
  }
}
