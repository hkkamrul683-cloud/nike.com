import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { stripe } from '@/lib/stripe';

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

    // If Stripe API key is not configured in .env.local, provide simulation mode for instant testing
    if (!stripe || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('pk_') || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      // Return simulation session URL so testing works out of the box
      return NextResponse.json({
        success: true,
        isSimulated: true,
        url: `${siteUrl}/api/payment/stripe/verify?session_id=sim_stripe_${Date.now()}&order_id=${order._id}&simulated=true`,
        message: 'Running in Stripe Simulation / Test Mode. Add STRIPE_SECRET_KEY in .env.local for live Stripe hosted checkout.',
      });
    }

    // Build line items for Stripe Checkout
    const line_items: any[] = (order.items || []).map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image && item.image.startsWith('http') ? [item.image] : [],
          description: `Size: ${item.size} | Color: ${item.color}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping if applicable
    if (order.shippingFee && order.shippingFee > 0) {
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Standard Insured Shipping',
            description: 'Delivery within 2-4 business days',
          },
          unit_amount: Math.round(order.shippingFee * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: order.customerEmail,
      client_reference_id: order._id.toString(),
      line_items,
      success_url: `${siteUrl}/api/payment/stripe/verify?session_id={CHECKOUT_SESSION_ID}&order_id=${order._id}`,
      cancel_url: `${siteUrl}/checkout?error=Stripe%20payment%20cancelled`,
      metadata: {
        orderId: order._id.toString(),
        orderNumber: order.orderNumber,
      },
    });

    // Update order with pending stripe session id
    await ordersCol.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          stripeSessionId: session.id,
          paymentMethod: 'STRIPE',
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('Stripe Checkout Session error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize Stripe checkout session' },
      { status: 500 }
    );
  }
}
