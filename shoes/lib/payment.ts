// Payment Gateway Configuration and Utilities
// Supports SSLCommerz (Bangladesh) and Stripe (International) + Cash on Delivery

export const PAYMENT_CONFIG = {
  // Exchange rate: 1 USD to BDT (Adjustable or dynamic)
  USD_TO_BDT_RATE: 120,

  // SSLCommerz Configuration (Defaults to Sandbox / Test mode)
  sslcommerz: {
    storeId: process.env.SSLCOMMERZ_STORE_ID || 'testbox',
    storePassword: process.env.SSLCOMMERZ_STORE_PASSWORD || 'qwerty',
    isSandbox: process.env.SSLCOMMERZ_IS_SANDBOX !== 'false', // default true
    get initUrl() {
      return this.isSandbox
        ? 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php'
        : 'https://securepay.sslcommerz.com/gwprocess/v4/api.php';
    },
    get validationUrl() {
      return this.isSandbox
        ? 'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php'
        : 'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php';
    },
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
};

export function convertUsdToBdt(usdAmount: number): number {
  return Math.round(usdAmount * PAYMENT_CONFIG.USD_TO_BDT_RATE);
}
