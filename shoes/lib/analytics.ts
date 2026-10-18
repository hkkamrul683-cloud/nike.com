// lib/analytics.ts
// Centralized Analytics & E-commerce Tracking Helper
// Supports Google Tag Manager (DataLayer), Meta Pixel (fbq), GA4, and Microsoft Clarity

declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: any;
    clarity?: any;
    gtag?: any;
  }
}

export interface AnalyticsProduct {
  id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  category?: string;
  brand?: string;
  size?: string;
  color?: string;
  quantity?: number;
}

export interface AnalyticsOrder {
  id: string;
  orderNumber?: string;
  total: number;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  currency?: string;
  items: AnalyticsProduct[];
}

// 1. Page View Tracking
export const trackPageView = (url?: string) => {
  if (typeof window === 'undefined') return;

  const pageUrl = url || window.location.pathname + window.location.search;

  // Google Tag Manager / GA4 DataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: pageUrl,
    page_title: document.title,
  });

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

// 2. View Item / Product Detail View
export const trackViewItem = (product: AnalyticsProduct) => {
  if (typeof window === 'undefined' || !product) return;

  const itemPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

  // GTM / GA4 Ecommerce View Item
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'view_item',
    ecommerce: {
      currency: 'USD',
      value: itemPrice,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: itemPrice,
          item_brand: product.brand || 'SPORTIX',
          item_category: product.category || 'Footwear',
          item_variant: [product.color, product.size].filter(Boolean).join(' / '),
        },
      ],
    },
  });

  // Meta Pixel ViewContent
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: itemPrice,
      currency: 'USD',
    });
  }
};

// 3. Add to Cart
export const trackAddToCart = (product: AnalyticsProduct, quantity: number = 1) => {
  if (typeof window === 'undefined' || !product) return;

  const itemPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const totalValue = itemPrice * quantity;

  // GTM / GA4 Ecommerce Add To Cart
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'USD',
      value: totalValue,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: itemPrice,
          quantity: quantity,
          item_brand: product.brand || 'SPORTIX',
          item_category: product.category || 'Footwear',
          item_variant: [product.color, product.size].filter(Boolean).join(' / '),
        },
      ],
    },
  });

  // Meta Pixel AddToCart
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: totalValue,
      currency: 'USD',
    });
  }
};

// 4. Remove from Cart
export const trackRemoveFromCart = (product: AnalyticsProduct, quantity: number = 1) => {
  if (typeof window === 'undefined' || !product) return;

  const itemPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'USD',
      value: itemPrice * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: itemPrice,
          quantity: quantity,
        },
      ],
    },
  });
};

// 5. Begin Checkout
export const trackBeginCheckout = (items: AnalyticsProduct[], totalAmount: number) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'USD',
      value: totalAmount,
      items: (items || []).map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.salePrice && item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity || 1,
        item_variant: [item.color, item.size].filter(Boolean).join(' / '),
      })),
    },
  });

  // Meta Pixel InitiateCheckout
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      value: totalAmount,
      currency: 'USD',
      num_items: items?.length || 0,
      content_ids: items?.map((i) => i.id) || [],
    });
  }
};

// 6. Purchase / Completed Order
export const trackPurchase = (order: AnalyticsOrder) => {
  if (typeof window === 'undefined' || !order) return;

  const orderId = order.orderNumber || order.id;

  // GTM / GA4 Purchase
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: orderId,
      value: order.total,
      currency: order.currency || 'USD',
      tax: order.tax || 0,
      shipping: order.shipping || 0,
      items: (order.items || []).map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.salePrice && item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity || 1,
        item_variant: [item.color, item.size].filter(Boolean).join(' / '),
      })),
    },
  });

  // Meta Pixel Purchase
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', {
      value: order.total,
      currency: order.currency || 'USD',
      content_type: 'product',
      content_ids: order.items?.map((i) => i.id) || [],
      order_id: orderId,
    });
  }
};
