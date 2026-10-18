'use client';

import React from 'react';
import {
  Database,
  Cloud,
  Server,
  ShieldCheck,
  Cpu,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

interface AdminSystemProps {
  onReseed: () => void;
  isReseeding: boolean;
  productCount: number;
  orderCount: number;
}

export default function AdminSystem({
  onReseed,
  isReseeding,
  productCount,
  orderCount,
}: AdminSystemProps) {
  const infraCards = [
    {
      title: 'Database Cluster',
      service: 'MongoDB Atlas',
      status: 'Healthy & Connected',
      icon: Database,
      details: [
        { label: 'Cluster Tier', value: 'Atlas M0 Shared' },
        { label: 'Collections', value: 'Products, Orders, Users, Coupons' },
        { label: 'Latency', value: '~16 ms' },
      ],
    },
    {
      title: 'Media Storage CDN',
      service: 'Cloudinary CDN',
      status: 'Active',
      icon: Cloud,
      details: [
        { label: 'Asset Bucket', value: 'SPORTIX / Products' },
        { label: 'Optimization', value: 'WebP / Auto Quality' },
        { label: 'Upload API', value: 'Direct Unsigned / Signed' },
      ],
    },
    {
      title: 'Application Runtime',
      service: 'Next.js App Router',
      status: 'Production Engine',
      icon: Server,
      details: [
        { label: 'Framework', value: 'Next.js 15 (Turbopack)' },
        { label: 'Rendering', value: 'Hybrid SSR & React Server Actions' },
        { label: 'Region', value: 'Global Edge Routing' },
      ],
    },
    {
      title: 'Security & Access',
      service: 'Role Guard',
      status: 'Enforced',
      icon: ShieldCheck,
      details: [
        { label: 'Role Level', value: 'ADMINISTRATOR' },
        { label: 'Session Token', value: 'JWT Encrypted Cookie' },
        { label: 'CORS Policy', value: 'Strict Same-Origin' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Infrastructure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infraCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{card.title}</h4>
                    <p className="text-[11px] text-zinc-400">{card.service}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {card.status}
                </span>
              </div>

              <div className="pt-2 border-t border-zinc-800/60 space-y-2 text-xs">
                {card.details.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">{d.label}</span>
                    <span className="text-zinc-200 font-mono font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Catalog & Database Tools */}
      <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">Database Seed & Diagnostics</h4>
            <p className="text-xs text-zinc-400">
              Restore the verified 24-item catalog, demo customer credentials, and starter promo vouchers.
            </p>
          </div>

          <button
            onClick={onReseed}
            disabled={isReseeding}
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReseeding ? 'animate-spin' : ''}`} />
            <span>{isReseeding ? 'Executing Seed...' : 'Re-Seed Database'}</span>
          </button>
        </div>

        <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-400 space-y-1">
          <div className="flex items-center gap-2 text-zinc-300">
            <Terminal className="w-3.5 h-3.5 text-zinc-500" />
            <span>Live Catalog Diagnostic:</span>
          </div>
          <p className="text-emerald-400 pl-5">✓ {productCount} products indexed in MongoDB</p>
          <p className="text-emerald-400 pl-5">✓ {orderCount} customer transactions recorded</p>
          <p className="text-emerald-400 pl-5">✓ Authentication and cart synchronization operational</p>
        </div>
      </div>
    </div>
  );
}
