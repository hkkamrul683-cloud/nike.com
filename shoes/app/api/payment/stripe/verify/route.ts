import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const isSimulated = searchParams.get('simulated') === 'true';

  const host = req.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

  if (!orderId || !ObjectId.isValid(orderId)) {
    return NextResponse.redirect(`${siteUrl}/checkout?error=Invalid%20order%20verification`, {
      status: 303,
    });
  }

  const ordersCol = await getCollection('orders');
  const order = await ordersCol.findOne({ _id: new ObjectId(orderId) });

  if (!order) {
    return NextResponse.redirect(`${siteUrl}/checkout?error=Order%20not%20found`, {
      status: 303,
    });
  }

  // Handle Simulation Mode
  if (isSimulated) {
    await ordersCol.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          paymentStatus: 'PAID',
          status: 'PROCESSING',
          paymentMethod: 'STRIPE',
          transactionId: sessionId || `sim_pi_${Date.now()}`,
          paymentDetails: {
            gateway: 'Stripe (Test Mode / Simulation)',
            currency: 'USD',
            paidAmountUSD: order.totalAmount,
            paidAt: new Date(),
          },
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.redirect(`${siteUrl}/order-confirmation/${orderId}?payment=success`, {
      status: 303,
    });
  }

  // Handle Real Stripe Session Verification
  if (!stripe || !sessionId) {
    return NextResponse.redirect(`${siteUrl}/checkout?error=Stripe%20session%20missing`, {
      status: 303,
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      await ordersCol.updateOne(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            paymentStatus: 'PAID',
            status: 'PROCESSING',
            paymentMethod: 'STRIPE',
            transactionId: (session.payment_intent as string) || session.id,
            paymentDetails: {
              gateway: 'Stripe',
              sessionId: session.id,
              paymentIntentId: session.payment_intent,
              currency: session.currency?.toUpperCase() || 'USD',
              paidAmount: session.amount_total ? session.amount_total / 100 : order.totalAmount,
              customerEmail: session.customer_details?.email,
              paidAt: new Date(),
            },
            updatedAt: new Date(),
          },
        }
      );

      return NextResponse.redirect(`${siteUrl}/order-confirmation/${orderId}?payment=success`, {
        status: 303,
      });
    } else {
      return NextResponse.redirect(
        `${siteUrl}/checkout?error=Payment%20was%20not%20completed`,
        { status: 303 }
      );
    }
  } catch (error: any) {
    console.error('Stripe verification error:', error);
    return NextResponse.redirect(
      `${siteUrl}/checkout?error=${encodeURIComponent(error.message || 'Stripe payment error')}`,
      { status: 303 }
    );
  }
}
