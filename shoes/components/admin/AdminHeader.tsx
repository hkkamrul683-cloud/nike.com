'use client';

import React from 'react';
import {
  Menu,
  Search,
  Plus,
  RefreshCw,
  Bell,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onOpenMobileMenu: () => void;
  onOpenAddProduct: () => void;
  onReseed: () => void;
  isReseeding: boolean;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  orderCount: number;
}

export default function AdminHeader({
  activeTab,
  onOpenMobileMenu,
  onOpenAddProduct,
  onReseed,
  isReseeding,
  globalSearch,
  setGlobalSearch,
  orderCount,
}: AdminHeaderProps) {
  const tabTitles: Record<AdminTab, string> = {
    overview: 'Console Overview',
    products: 'Product Catalog',
    orders: 'Order Management',
    vendors: 'Vendor & Supplier Management',
    customers: 'Customer Relationship Management',
    reviews: 'Reviews & Social Proof Moderation',
    coupons: 'Discounts & Promotions',
    settings: 'Store Configuration & Logistics',
    system: 'System Health & Metrics',
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 min-w-0">
          <span className="hidden sm:inline hover:text-zinc-200 transition-colors">HypeKicks</span>
          <span className="hidden sm:inline text-zinc-600">/</span>
          <span className="hidden md:inline text-zinc-400">Admin</span>
          <span className="hidden md:inline text-zinc-600">/</span>
          <span className="font-semibold text-white tracking-tight truncate">
            {tabTitles[activeTab]}
          </span>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search items, order numbers, coupons..."
            className="w-full pl-9 pr-8 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all font-medium"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5">
        {/* Reset Database Button */}
        <button
          onClick={onReseed}
          disabled={isReseeding}
          title="Reset database to default verified products"
          className="px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReseeding ? 'animate-spin text-white' : ''}`} />
          <span className="hidden sm:inline">{isReseeding ? 'Resetting...' : 'Seed Catalog'}</span>
        </button>

        {/* Add Product Button */}
        <button
          onClick={onOpenAddProduct}
          className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Product</span>
        </button>
      </div>
    </header>
  );
}
