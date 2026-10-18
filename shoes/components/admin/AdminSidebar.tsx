'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Activity,
  ExternalLink,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Database,
  Cloud,
  X,
  Users,
  MessageSquare,
  Sliders,
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'products'
  | 'orders'
  | 'customers'
  | 'reviews'
  | 'coupons'
  | 'settings'
  | 'system';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  productCount: number;
  orderCount: number;
  couponCount: number;
  customerCount?: number;
  reviewCount?: number;
  user: any;
  onLogout: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  onOpenAddProduct: () => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  productCount,
  orderCount,
  couponCount,
  customerCount = 0,
  reviewCount = 0,
  user,
  onLogout,
  isMobileOpen,
  setIsMobileOpen,
  onOpenAddProduct,
}: AdminSidebarProps) {
  const navItems = [
    {
      id: 'overview' as AdminTab,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'products' as AdminTab,
      label: 'Products & Shoes',
      icon: Package,
      badge: productCount,
    },
    {
      id: 'orders' as AdminTab,
      label: 'Orders & Shipping',
      icon: ShoppingBag,
      badge: orderCount,
    },
    {
      id: 'customers' as AdminTab,
      label: 'Customers & CRM',
      icon: Users,
      badge: customerCount > 0 ? customerCount : null,
    },
    {
      id: 'reviews' as AdminTab,
      label: 'Reviews & Feedback',
      icon: MessageSquare,
      badge: reviewCount > 0 ? reviewCount : null,
    },
    {
      id: 'coupons' as AdminTab,
      label: 'Discounts & Promo',
      icon: Tag,
      badge: couponCount,
    },
    {
      id: 'settings' as AdminTab,
      label: 'Store & Logistics',
      icon: Sliders,
      badge: null,
    },
    {
      id: 'system' as AdminTab,
      label: 'System & Infra',
      icon: Activity,
      badge: 'Live',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-zinc-950 text-zinc-200 border-r border-zinc-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Workspace / Store Selector */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-zinc-950 font-black shadow-md shrink-0">
              <svg
                width="16"
                height="14"
                viewBox="0 0 76 65"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-tight truncate">SPORTIX</span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  prod
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate">Enterprise Admin</p>
            </div>
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onOpenAddProduct();
              setIsMobileOpen(false);
            }}
            className="w-full py-2 px-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-between shadow-xs cursor-pointer group"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
              <span>+ New Product</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-200/60 px-1.5 py-0.5 rounded">
              ⌘N
            </span>
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-2 py-1.5 font-semibold">
            Platform Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-xs font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-zinc-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : typeof item.badge === 'string'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                        : 'bg-zinc-800/80 text-zinc-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Infrastructure health status */}
        <div className="mx-3 mb-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              System Health
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </span>
          </div>

          <div className="space-y-1.5 pt-1 text-[11px] text-zinc-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-zinc-400" />
                MongoDB Atlas
              </span>
              <span className="text-zinc-300 font-mono text-[10px]">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cloud className="w-3 h-3 text-zinc-400" />
                Cloudinary CDN
              </span>
              <span className="text-zinc-300 font-mono text-[10px]">Active</span>
            </div>
          </div>
        </div>

        {/* Bottom User Profile & Store Link */}
        <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60 space-y-2">
          <Link
            href="/"
            className="w-full py-1.5 px-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs font-medium flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span>Back to Storefront</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-linear-to-tr from-zinc-700 to-zinc-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-zinc-400 truncate">{user?.email || 'admin@sportix.com'}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
