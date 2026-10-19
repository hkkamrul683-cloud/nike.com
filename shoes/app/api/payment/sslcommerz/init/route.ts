import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { PAYMENT_CONFIG, convertUsdToBdt } from '@/lib/payment';

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId || !ObjectId.isValid(orderId)) {
      return NextResponse.json({ error: 'Valid Order ID is required' }, { status: 400 });
    }

    const ordersCol = await getCollection('orders');
    const order = await ordersCol.findOne({ _id: new ObjectId(orderId) });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    const bdtAmount = convertUsdToBdt(order.totalAmount);
    const tranId = `${order.orderNumber}_${Date.now().toString().slice(-4)}`;

    const params = new URLSearchParams();
    params.append('store_id', PAYMENT_CONFIG.sslcommerz.storeId);
    params.append('store_passwd', PAYMENT_CONFIG.sslcommerz.storePassword);
    params.append('total_amount', bdtAmount.toString());
    params.append('currency', 'BDT');
    params.append('tran_id', tranId);
    params.append('success_url', `${siteUrl}/api/payment/sslcommerz/success`);
    params.append('fail_url', `${siteUrl}/api/payment/sslcommerz/fail`);
    params.append('cancel_url', `${siteUrl}/api/payment/sslcommerz/cancel`);
    params.append('ipn_url', `${siteUrl}/api/payment/sslcommerz/ipn`);

    params.append('shipping_method', 'Courier');
    params.append('product_name', order.items?.map((i: any) => i.name).join(', ').substring(0, 150) || 'SPORTIX Shoes');
    params.append('product_category', 'Shoes & Footwear');
    params.append('product_profile', 'physical-goods');

    // Customer Info
    const shipping = order.shippingAddress || {};
    params.append('cus_name', order.customerName || shipping.fullName || 'Valued Customer');
    params.append('cus_email', order.customerEmail || shipping.email || 'customer@example.com');
    params.append('cus_add1', shipping.addressLine1 || 'Dhaka, Bangladesh');
    params.append('cus_city', shipping.city || 'Dhaka');
    params.append('cus_postcode', shipping.postalCode || '1000');
    params.append('cus_country', shipping.country || 'Bangladesh');
    params.append('cus_phone', order.customerPhone || shipping.phone || '01700000000');

    // Shipping Info
    params.append('ship_name', shipping.fullName || 'Valued Customer');
    params.append('ship_add1', shipping.addressLine1 || 'Dhaka');
    params.append('ship_city', shipping.city || 'Dhaka');
    params.append('ship_postcode', shipping.postalCode || '1000');
    params.append('ship_country', shipping.country || 'Bangladesh');

    // Custom tracking values passed back on callback
    params.append('value_a', order._id.toString());
    params.append('value_b', order.orderNumber);
    params.append('value_c', bdtAmount.toString());

    // Update order with temporary tran_id
    await ordersCol.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          transactionId: tranId,
          bdtAmount,
          paymentMethod: 'SSLCOMMERZ',
          updatedAt: new Date(),
        },
      }
    );

    const sslRes = await fetch(PAYMENT_CONFIG.sslcommerz.initUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const sslData = await sslRes.json();

    if (sslData.status === 'SUCCESS' && sslData.GatewayPageURL) {
      return NextResponse.json({
        success: true,
        gatewayUrl: sslData.GatewayPageURL,
        sessionKey: sslData.sessionkey,
        bdtAmount,
      });
    } else {
      console.error('SSLCommerz Init Error:', sslData);
      return NextResponse.json(
        {
          error: sslData.failedreason || 'Failed to initiate SSLCommerz session',
          details: sslData,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('SSLCommerz Init exception:', error);
    return NextResponse.json(
      { error: error.message || 'SSLCommerz gateway connection error' },
      { status: 500 }
    );
  }
}
