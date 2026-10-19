import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { PAYMENT_CONFIG } from '@/lib/payment';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const val_id = formData.get('val_id')?.toString();
    const tran_id = formData.get('tran_id')?.toString();
    const amount = formData.get('amount')?.toString();
    const card_type = formData.get('card_type')?.toString();
    const bank_tran_id = formData.get('bank_tran_id')?.toString();
    const card_brand = formData.get('card_brand')?.toString();
    const orderId = formData.get('value_a')?.toString();

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    if (!val_id || !orderId || !ObjectId.isValid(orderId)) {
      return NextResponse.redirect(`${siteUrl}/checkout?error=Invalid%20Payment%20Payload`, {
        status: 303,
      });
    }

    const ordersCol = await getCollection('orders');

    // Validate payment with SSLCommerz server
    const validationUrl = `${PAYMENT_CONFIG.sslcommerz.validationUrl}?val_id=${val_id}&store_id=${PAYMENT_CONFIG.sslcommerz.storeId}&store_passwd=${PAYMENT_CONFIG.sslcommerz.storePassword}&v=1&format=json`;

    let isValid = false;
    let validationData: any = {};

    try {
      const valRes = await fetch(validationUrl);
      validationData = await valRes.json();
      if (validationData.status === 'VALID' || validationData.status === 'VALIDATED') {
        isValid = true;
      }
    } catch (e) {
      console.warn('SSLCommerz validation fetch error:', e);
      // If validation API has timeout in sandbox, check if val_id is provided
      if (val_id && PAYMENT_CONFIG.sslcommerz.isSandbox) {
        isValid = true;
      }
    }

    if (isValid) {
      await ordersCol.updateOne(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            paymentStatus: 'PAID',
            status: 'PROCESSING',
            transactionId: tran_id,
            paymentMethod: 'SSLCOMMERZ',
            paymentDetails: {
              gateway: 'SSLCommerz',
              valId: val_id,
              bankTranId: bank_tran_id || validationData.bank_tran_id,
              cardType: card_type || validationData.card_type,
              cardBrand: card_brand || validationData.card_brand,
              currency: 'BDT',
              paidAmountBDT: amount || validationData.amount,
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
      await ordersCol.updateOne(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            paymentStatus: 'FAILED',
            updatedAt: new Date(),
          },
        }
      );

      return NextResponse.redirect(
        `${siteUrl}/checkout?error=${encodeURIComponent('Payment validation failed. Please try again.')}`,
        { status: 303 }
      );
    }
  } catch (error: any) {
    console.error('SSLCommerz Success Callback Exception:', error);
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;
    return NextResponse.redirect(`${siteUrl}/checkout?error=Payment%20processing%20error`, {
      status: 303,
    });
  }
}
