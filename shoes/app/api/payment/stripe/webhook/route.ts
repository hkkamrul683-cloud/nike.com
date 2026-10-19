import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Stripe webhook secret not configured' }, { status: 200 });
  }

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
  }

  try {
    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const orderId = session.client_reference_id || session.metadata?.orderId;

      if (orderId && ObjectId.isValid(orderId)) {
        const ordersCol = await getCollection('orders');
        await ordersCol.updateOne(
          { _id: new ObjectId(orderId) },
          {
            $set: {
              paymentStatus: 'PAID',
              status: 'PROCESSING',
              paymentMethod: 'STRIPE',
              transactionId: session.payment_intent || session.id,
              paymentDetails: {
                gateway: 'Stripe Webhook',
                sessionId: session.id,
                currency: session.currency?.toUpperCase() || 'USD',
                paidAmount: session.amount_total ? session.amount_total / 100 : undefined,
                paidAt: new Date(),
              },
              updatedAt: new Date(),
            },
          }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Stripe webhook verification error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
