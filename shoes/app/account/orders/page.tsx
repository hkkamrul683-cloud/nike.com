'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Calendar, Truck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          if (data.orders) setOrders(data.orders);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-zinc-200">
        <Link
          href="/account"
          className="p-2 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
            Orders & Tracking
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Review delivery status, tracking codes, and itemized receipts.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 rounded-3xl p-8 space-y-4">
          <Package className="w-12 h-12 text-zinc-400 mx-auto" />
          <h3 className="text-lg font-black uppercase text-zinc-950">No orders yet</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            You haven&apos;t placed any orders yet. Once you make a purchase, all shipments will be tracked here.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs hover:border-zinc-400 transition-all"
            >
              {/* Order Header Card */}
              <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-zinc-500 font-semibold uppercase text-[10px] block">Order Placed</span>
                    <span className="font-bold text-zinc-950">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-semibold uppercase text-[10px] block">Total</span>
                    <span className="font-bold text-zinc-950">${order.totalAmount?.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-semibold uppercase text-[10px] block">Ship To</span>
                    <span className="font-bold text-zinc-950">{order.shippingAddress?.fullName || 'Customer'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-zinc-600 font-bold">{order.orderNumber}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold uppercase text-[10px] border border-emerald-200">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items List */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-800">
                    <Truck className="w-4 h-4 text-zinc-500" />
                    <span>Tracking: <strong className="font-mono text-zinc-950">{order.trackingNumber || 'Processing'}</strong></span>
                  </div>
                  <Link
                    href={`/order-confirmation/${order._id || order.orderNumber}`}
                    className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                  >
                    View Invoice Receipt <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-2xl">
                      <div className="relative w-16 h-16 bg-zinc-200 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={item.image || '/placeholder.png'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 text-xs">
                        <h4 className="font-bold text-zinc-900 truncate">{item.name}</h4>
                        <p className="text-zinc-500 text-[11px]">Size: {item.size} • Qty: {item.quantity}</p>
                        <p className="font-bold text-zinc-950 mt-0.5">${item.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
