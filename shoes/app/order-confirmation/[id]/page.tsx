'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  ArrowRight,
  Printer,
} from 'lucide-react';
import { trackPurchase } from '@/lib/analytics';

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        if (data.order) {
          setOrder(data.order);
          // Dispatch purchase conversion event to GTM and Meta Pixel
          trackPurchase({
            id: data.order._id || id,
            orderNumber: data.order.orderNumber,
            total: data.order.totalAmount || 0,
            subtotal: data.order.subtotal || 0,
            shipping: data.order.shippingFee || 0,
            currency: 'USD',
            items: (data.order.items || []).map((it: any) => ({
              id: it.productId || it.id,
              name: it.name,
              price: it.price,
              quantity: it.quantity,
              size: it.size,
              color: it.color,
            })),
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="w-10 h-10 border-3 border-zinc-950 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-black uppercase">Order Not Found</h1>
        <p className="text-xs text-zinc-500">
          We could not locate this order. Please verify your confirmation email or order number.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const orderDate = order?.createdAt ? new Date(order.createdAt) : null;
  const estimatedDeliveryText = orderDate
    ? new Date(orderDate.getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '2-4 Business Days';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Success Hero */}
      <div className="text-center space-y-3 pb-10 border-b border-zinc-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
          Payment Confirmed & Verified
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
          THANK YOU FOR YOUR ORDER.
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
          We have received your order and sent a confirmation receipt to{' '}
          <strong className="text-zinc-950 font-bold">{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Order Highlights Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-b border-zinc-200 text-xs">
        <div>
          <span className="text-zinc-500 uppercase font-semibold text-[11px] block">Order Number</span>
          <span className="font-bold text-zinc-950 text-sm">{order.orderNumber}</span>
        </div>
        <div>
          <span className="text-zinc-500 uppercase font-semibold text-[11px] block">Status</span>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px] uppercase mt-0.5">
            {order.status}
          </span>
        </div>
        <div>
          <span className="text-zinc-500 uppercase font-semibold text-[11px] block">Estimated Arrival</span>
          <span className="font-bold text-zinc-950 flex items-center gap-1 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            {estimatedDeliveryText}
          </span>
        </div>
        <div>
          <span className="text-zinc-500 uppercase font-semibold text-[11px] block">Tracking Code</span>
          <span className="font-mono font-bold text-zinc-950 mt-0.5 block">{order.trackingNumber || 'Pending'}</span>
        </div>
      </div>

      {/* Itemized Breakdown & Delivery Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-b border-zinc-200">
        {/* Purchased Items */}
        <div className="md:col-span-7 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-zinc-950">
            Items in this Shipment ({order.items?.length})
          </h2>
          <div className="space-y-4 divide-y divide-zinc-100">
            {order.items?.map((item: any, idx: number) => (
              <div key={idx} className="pt-4 first:pt-0 flex items-center gap-4">
                <div className="relative w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-zinc-950">{item.name}</h4>
                  <p className="text-zinc-500 mt-0.5">
                    Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                  </p>
                  <p className="font-bold text-zinc-950 mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Financial Breakdown */}
        <div className="md:col-span-5 space-y-6 bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-950 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" /> Shipping Destination
            </h3>
            <div className="text-xs text-zinc-600 space-y-0.5">
              <p className="font-bold text-zinc-900">{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.addressLine1}</p>
              {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress?.addressLine2}</p>}
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
              </p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span className="font-bold text-zinc-950">${order.subtotal?.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({order.couponCode})</span>
                <span>-${order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-600">
              <span>Shipping</span>
              <span className="font-bold text-zinc-950">
                {order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee?.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-black text-zinc-950 pt-2 border-t border-zinc-200">
              <span>Total Paid</span>
              <span>${order.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/products"
          className="px-8 py-3.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          onClick={() => window.print()}
          className="px-6 py-3.5 border border-zinc-300 text-zinc-800 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Print Invoice Receipt
        </button>
      </div>
    </div>
  );
}
