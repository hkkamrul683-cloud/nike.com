import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';

const DEFAULT_SETTINGS = {
  storeName: 'SPORTIX Athletic Footwear',
  contactEmail: 'support@sportix.com',
  contactPhone: '+880 1700-123456',
  storeAddress: 'Level 4, Gulshan-2, Dhaka 1212, Bangladesh',
  currency: 'USD',
  currencySymbol: '$',
  insideCityShippingFee: 5.00,
  outsideCityShippingFee: 12.00,
  freeShippingThreshold: 150.00,
  taxRate: 5,
  heroAnnouncement: 'Spring 2026 Collection Live: Free Delivery on orders over $150 with code SPORTIX',
  heroAnnouncementActive: true,
  enableCashOnDelivery: true,
  enableOnlinePayment: true,
  returnPolicyDays: 7,

  // Marketing & Analytics Tracking Integrations
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  metaPixelActive: true,
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  gaActive: true,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  gtmActive: true,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || '',
  clarityActive: true,
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
};

export async function GET(req: NextRequest) {
  try {
    const settingsCol = await getCollection('settings');
    const existing = await settingsCol.findOne({ key: 'general_store_settings' });
    const existingVal = existing?.value || {};

    const mergedSettings = {
      ...DEFAULT_SETTINGS,
      ...existingVal,
      // If db value is empty or not yet set, fall back to environment variables
      metaPixelId: existingVal.metaPixelId !== undefined ? existingVal.metaPixelId : (process.env.NEXT_PUBLIC_META_PIXEL_ID || ''),
      metaPixelActive: existingVal.metaPixelActive !== undefined ? existingVal.metaPixelActive : true,
      gaId: existingVal.gaId !== undefined ? existingVal.gaId : (process.env.NEXT_PUBLIC_GA_ID || ''),
      gaActive: existingVal.gaActive !== undefined ? existingVal.gaActive : true,
      gtmId: existingVal.gtmId !== undefined ? existingVal.gtmId : (process.env.NEXT_PUBLIC_GTM_ID || ''),
      gtmActive: existingVal.gtmActive !== undefined ? existingVal.gtmActive : true,
      clarityId: existingVal.clarityId !== undefined ? existingVal.clarityId : (process.env.NEXT_PUBLIC_CLARITY_ID || ''),
      clarityActive: existingVal.clarityActive !== undefined ? existingVal.clarityActive : true,
      googleSiteVerification: existingVal.googleSiteVerification !== undefined ? existingVal.googleSiteVerification : (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''),
    };

    return NextResponse.json({
      success: true,
      settings: mergedSettings,
    });
  } catch (error: any) {
    console.error('Fetch settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const settingsCol = await getCollection('settings');

    await settingsCol.updateOne(
      { key: 'general_store_settings' },
      {
        $set: {
          key: 'general_store_settings',
          value: {
            ...DEFAULT_SETTINGS,
            ...body,
            updatedAt: new Date(),
            updatedBy: user.email,
          },
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: 'Store settings saved successfully' });
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
