'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingBag,
  Tag,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Boxes,
  Sparkles,
  BarChart3,
  Flame,
  Users,
  Activity,
} from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface AdminOverviewProps {
  products: any[];
  orders: any[];
  coupons: any[];
  customersCount?: number;
  settings?: any;
  setActiveTab: (tab: AdminTab) => void;
  onOpenAddProduct: () => void;
}

export default function AdminOverview({
  products,
  orders,
  coupons,
  customersCount = 0,
  settings,
  setActiveTab,
  onOpenAddProduct,
}: AdminOverviewProps) {
  const [chartDays, setChartDays] = useState<7 | 14 | 30>(7);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const processingOrders = orders.filter((o) => o.status === 'PROCESSING' || !o.status);
  const lowStockProducts = products.filter((p) => (p.stock || 0) <= 5);
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 6);

  // Calculate Average Order Value
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  // Build Daily Chart Data from Orders
  const generateChartData = (days: number) => {
    const data = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dateKey = d.toISOString().slice(0, 10);

      // Find orders matching this day
      const dayOrders = orders.filter((o) => {
        if (!o.createdAt) return false;
        return new Date(o.createdAt).toISOString().slice(0, 10) === dateKey;
      });

      const dayRevenue = dayOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      data.push({
        label: dayStr,
        dateKey,
        revenue: dayRevenue,
        ordersCount: dayOrders.length,
      });
    }

    return data;
  };

  const chartData = generateChartData(chartDays);
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 100);

  // Calculate Best Selling Shoes
  const shoeSalesMap = new Map<string, { name: string; brand?: string; quantity: number; revenue: number; image?: string }>();
  orders.forEach((o) => {
    (o.items || []).forEach((item: any) => {
      const key = item.name || 'Shoe';
      const existing = shoeSalesMap.get(key) || {
        name: key,
        brand: item.brand,
        quantity: 0,
        revenue: 0,
        image: item.image,
      };
      existing.quantity += item.quantity || 1;
      existing.revenue += (item.price || 0) * (item.quantity || 1);
      shoeSalesMap.set(key, existing);
    });
  });

  const topSellingShoes = Array.from(shoeSalesMap.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 4);

  const kpis = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+18.4%',
      period: 'vs last 30d',
      icon: DollarSign,
      trend: 'up',
      detail: `${orders.length} completed orders`,
    },
    {
      title: 'Pending Fulfillment',
      value: processingOrders.length.toString(),
      change: `${processingOrders.length} require action`,
      period: 'unfulfilled',
      icon: ShoppingBag,
      trend: 'warning',
      detail: 'Needs courier dispatch',
      highlight: processingOrders.length > 0,
    },
    {
      title: 'Average Order Value',
      value: `$${avgOrderValue.toFixed(2)}`,
      change: '+6.2%',
      period: 'per cart',
      icon: TrendingUp,
      trend: 'up',
      detail: 'Healthy basket size',
    },
    {
      title: 'Catalog Health',
      value: products.length.toString(),
      change: lowStockProducts.length > 0 ? `${lowStockProducts.length} low stock` : 'Healthy stock',
      period: 'items active',
      icon: Package,
      trend: lowStockProducts.length > 0 ? 'warning' : 'up',
      detail: `${coupons.length} active promo codes`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SPORTIX Production Environment Active</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Executive Store Overview
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Live telemetry on customer transactions, catalog inventory, and fulfillment operations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('orders')}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Review Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenAddProduct}
              className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-xs font-bold text-zinc-950 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Product</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid Background Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />
      </div>

      {/* Marketing Pixels & Tracking Telemetry Bar */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-zinc-300 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-400" />
            Tracking Status:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                settings?.metaPixelActive && settings?.metaPixelId
                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                  : 'bg-zinc-800/60 text-zinc-500 border-zinc-700/50'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  settings?.metaPixelActive && settings?.metaPixelId ? 'bg-blue-400 animate-pulse' : 'bg-zinc-600'
                }`}
              />
              Meta Pixel:{' '}
              {settings?.metaPixelActive && settings?.metaPixelId
                ? `${settings.metaPixelId.slice(0, 4)}...${settings.metaPixelId.slice(-4)}`
                : 'Disabled'}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                settings?.gaActive && settings?.gaId
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-zinc-800/60 text-zinc-500 border-zinc-700/50'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  settings?.gaActive && settings?.gaId ? 'bg-amber-400' : 'bg-zinc-600'
                }`}
              />
              GA4: {settings?.gaActive && settings?.gaId ? 'Active' : 'Disabled'}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                settings?.gtmActive && settings?.gtmId
                  ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                  : 'bg-zinc-800/60 text-zinc-500 border-zinc-700/50'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  settings?.gtmActive && settings?.gtmId ? 'bg-cyan-400' : 'bg-zinc-600'
                }`}
              />
              GTM: {settings?.gtmActive && settings?.gtmId ? 'Active' : 'Disabled'}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                settings?.clarityActive && settings?.clarityId
                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                  : 'bg-zinc-800/60 text-zinc-500 border-zinc-700/50'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  settings?.clarityActive && settings?.clarityId ? 'bg-purple-400' : 'bg-zinc-600'
                }`}
              />
              Clarity: {settings?.clarityActive && settings?.clarityId ? 'Active' : 'Disabled'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('settings')}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>Configure Pixels</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-medium text-zinc-400">{kpi.title}</span>
                <div className="w-7 h-7 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-300">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <p className="text-2xl font-bold tracking-tight text-white font-mono">
                  {kpi.value}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center text-[11px] font-semibold ${
                      kpi.trend === 'warning'
                        ? 'text-amber-400'
                        : kpi.highlight
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {kpi.change}
                  </span>
                  <span className="text-[11px] text-zinc-400">{kpi.period}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>{kpi.detail}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Sales & Orders Visual Telemetry Chart */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Sales & Revenue Velocity</h3>
              <p className="text-xs text-zinc-400">
                Daily transaction volume and gross incoming revenue.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 self-start sm:self-auto text-xs">
            {([7, 14, 30] as const).map((d) => (
              <button
                key={d}
                onClick={() => setChartDays(d)}
                className={`px-3 py-1 rounded-md font-mono transition-colors ${
                  chartDays === d
                    ? 'bg-zinc-800 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {d}D
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Telemetry Graphic */}
        <div className="pt-4">
          <div className="h-44 w-full flex items-end gap-1.5 sm:gap-2 relative">
            {chartData.map((item, idx) => {
              const heightPercent = maxRevenue > 0 ? Math.max(8, (item.revenue / maxRevenue) * 100) : 8;
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex-1 h-full flex flex-col justify-end items-center relative group cursor-pointer"
                >
                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <div className="absolute -top-14 z-20 bg-zinc-950 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg shadow-xl text-center pointer-events-none whitespace-nowrap">
                      <p className="text-[10px] text-zinc-400 font-mono">{item.label}</p>
                      <p className="text-xs font-bold text-emerald-400 font-mono">
                        ${item.revenue.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-zinc-400">{item.ordersCount} orders</p>
                    </div>
                  )}

                  {/* Visual Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      item.revenue > 0
                        ? isHovered
                          ? 'bg-emerald-400 shadow-lg shadow-emerald-500/20'
                          : 'bg-emerald-500/80 hover:bg-emerald-400'
                        : 'bg-zinc-800/80 hover:bg-zinc-700'
                    }`}
                  />
                  <span className="text-[9px] font-mono text-zinc-500 mt-2 truncate max-w-full">
                    {item.label.split(' ')[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders + Best Sellers & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Orders (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-white">Recent Store Transactions</h3>
            </div>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({orders.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-12 text-center text-zinc-400 text-xs">
              No orders recorded yet. Place a test order to see live data.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/60">
              {recentOrders.map((order) => {
                const status = order.status || 'PROCESSING';
                const statusColors: Record<string, string> = {
                  PROCESSING: 'bg-amber-950/80 text-amber-400 border-amber-800/40',
                  SHIPPED: 'bg-blue-950/80 text-blue-400 border-blue-800/40',
                  DELIVERED: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40',
                  CANCELLED: 'bg-red-950/80 text-red-400 border-red-800/40',
                };

                return (
                  <div
                    key={order._id}
                    className="p-4 hover:bg-zinc-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center font-mono font-bold text-zinc-300 text-[10px] shrink-0">
                        {order.orderNumber ? order.orderNumber.slice(-3) : 'ORD'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white font-mono">
                            {order.orderNumber}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                              statusColors[status] || statusColors.PROCESSING
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {order.customerName || 'Customer'} &bull; {order.customerEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="text-right">
                        <p className="font-mono font-bold text-white text-sm">
                          ${order.totalAmount?.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-zinc-400">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>

                      <Link
                        href={`/order-confirmation/${order._id || order.orderNumber}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="View Receipt"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Best Sellers & Stock Warnings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Selling Footwear */}
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <h4 className="text-xs font-semibold text-white">Top Selling Footwear</h4>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Performance</span>
            </div>

            {topSellingShoes.length === 0 ? (
              <p className="text-xs text-zinc-400 py-3">
                Sales rankings will populate automatically as shoppers checkout.
              </p>
            ) : (
              <div className="space-y-2.5 pt-1">
                {topSellingShoes.map((shoe, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold text-zinc-200 truncate">{shoe.name}</p>
                      <p className="text-[11px] text-zinc-500 font-mono">
                        {shoe.quantity} pairs sold &bull; ${shoe.revenue.toFixed(2)}
                      </p>
                    </div>
                    <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Low Stock Warning Card */}
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-semibold text-white">Stock Warnings</h4>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {lowStockProducts.length} items
              </span>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-zinc-400">
                All catalog items have healthy stock levels (&gt; 5 units).
              </p>
            ) : (
              <div className="space-y-2 pt-1">
                {lowStockProducts.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-zinc-200 truncate pr-2">{item.name}</span>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/40 font-mono text-[10px] font-bold shrink-0">
                      {item.stock} left
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setActiveTab('products')}
              className="w-full py-2 text-center text-xs text-zinc-400 hover:text-white transition-colors font-medium border-t border-zinc-800/60 pt-3 block cursor-pointer"
            >
              Manage Inventory →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
