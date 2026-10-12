'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  Heart,
  MapPin,
  ShieldCheck,
  LogOut,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, wishlist } = useCartWishlist();
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

  if (!user && !isLoading) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-black uppercase">Sign In Required</h1>
        <p className="text-xs text-zinc-500">
          Please sign in to view your SPORTIX member account and order history.
        </p>
        <Link
          href="/login"
          className="inline-block px-8 py-3.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10">
      {/* Profile Header */}
      <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-zinc-300 text-2xl font-black uppercase shrink-0">
            {user?.name?.[0] || user?.email?.[0] || 'S'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                {user?.name || 'SPORTIX Athlete'}
              </h1>
              {user?.role === 'ADMIN' && (
                <span className="px-2 py-0.5 rounded bg-red-600 text-[10px] font-black uppercase tracking-wider">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 font-medium">{user?.email}</p>
            <span className="inline-block px-3 py-1 bg-white/10 text-zinc-300 rounded-full text-[11px] font-bold uppercase tracking-wider mt-1">
              SPORTIX Member Since 2026
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
            >
              <ShieldCheck className="w-4 h-4" /> Admin Console
            </Link>
          )}
          <button
            onClick={() => logout()}
            className="px-5 py-2.5 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl hover:border-zinc-950 transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-zinc-500">Orders & History</span>
            <p className="text-2xl font-black text-zinc-950">{orders.length}</p>
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl hover:border-zinc-950 transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-zinc-500">Saved Favorites</span>
            <p className="text-2xl font-black text-zinc-950">{wishlist.length}</p>
          </div>
        </Link>

        <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-200 text-zinc-900 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-zinc-500">Saved Addresses</span>
            <p className="text-2xl font-black text-zinc-950">
              {user?.addresses?.length || 1}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <h2 className="text-lg font-black uppercase tracking-tight text-zinc-950">
            Recent Orders
          </h2>
          <Link
            href="/account/orders"
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline flex items-center gap-1"
          >
            View All ({orders.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 bg-zinc-50 rounded-2xl text-center space-y-2">
            <p className="text-sm font-bold text-zinc-800">No orders yet.</p>
            <p className="text-xs text-zinc-500">When you place orders, they will appear here.</p>
            <Link
              href="/products"
              className="inline-block mt-2 px-6 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 3).map((ord) => (
              <div
                key={ord._id}
                className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-zinc-950">{ord.orderNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-200">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    {ord.items?.length} items • Ordered on{' '}
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-zinc-950">
                    ${ord.totalAmount?.toFixed(2)}
                  </span>
                  <Link
                    href={`/order-confirmation/${ord._id || ord.orderNumber}`}
                    className="px-4 py-2 border border-zinc-300 hover:border-zinc-950 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-900"
                  >
                    View Receipt
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
