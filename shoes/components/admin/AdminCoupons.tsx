'use client';

import React, { useState } from 'react';
import { Tag, Plus, Check, Copy, Percent, DollarSign, Sparkles } from 'lucide-react';

interface AdminCouponsProps {
  coupons: any[];
  onCreateCoupon: (payload: {
    code: string;
    discountValue: string;
    discountType: string;
    minOrder: string;
  }) => Promise<void>;
}

export default function AdminCoupons({ coupons, onCreateCoupon }: AdminCouponsProps) {
  const [code, setCode] = useState('');
  const [discountValue, setDiscountValue] = useState('15');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [minOrder, setMinOrder] = useState('75');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateCoupon({
        code: code.trim().toUpperCase(),
        discountValue,
        discountType,
        minOrder,
      });
      setCode('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (cCode: string) => {
    navigator.clipboard.writeText(cCode);
    setCopiedCode(cCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Create Coupon Card (4 cols) */}
      <div className="lg:col-span-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-zinc-400" />
          <h3 className="text-sm font-semibold text-white">New Promo Campaign</h3>
        </div>
        <p className="text-xs text-zinc-400">
          Create promotional voucher codes for checkout discounts.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Coupon Code
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. FLASH25"
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono font-bold uppercase placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 outline-none cursor-pointer"
              >
                <option value="PERCENTAGE">Percent (%)</option>
                <option value="FIXED">Fixed ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Value {discountType === 'PERCENTAGE' ? '(%)' : '($)'}
              </label>
              <input
                type="number"
                required
                min="1"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono font-bold focus:outline-hidden focus:border-zinc-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Minimum Order ($)
            </label>
            <input
              type="number"
              min="0"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono font-bold focus:outline-hidden focus:border-zinc-700"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Creating...' : 'Deploy Promo Code'}</span>
          </button>
        </form>
      </div>

      {/* Coupons Table (8 cols) */}
      <div className="lg:col-span-8 rounded-xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Active Promotional Codes</h3>
          <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            {coupons.length} Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950/70 border-b border-zinc-800/80 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount Amount</th>
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400 text-xs">
                    No promo codes active. Create one using the form.
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c._id || c.code} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-white tracking-wide">
                      {c.code}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {c.discountType === 'PERCENTAGE'
                        ? `${c.discountValue}% OFF`
                        : `$${c.discountValue} OFF`}
                    </td>
                    <td className="py-3 px-4 text-zinc-400 font-mono text-[11px]">
                      Min. ${c.minOrder ? Number(c.minOrder).toFixed(2) : '0.00'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => copyToClipboard(c.code)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title="Copy code"
                      >
                        {copiedCode === c.code ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
