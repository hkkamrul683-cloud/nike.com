import Link from 'next/link';
import { Truck, RotateCcw, CreditCard, HelpCircle, Mail, Phone } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-12">
      <div className="text-center space-y-3 pb-8 border-b border-zinc-200">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
          SPORTIX Customer Service & Support
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          Everything you need to know regarding deliveries, wear trials, orders, and payment methods.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-200 space-y-3">
          <Truck className="w-6 h-6 text-zinc-950" />
          <h3 className="text-sm font-bold uppercase text-zinc-950">Shipping & Delivery</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Free Standard Delivery on orders over $150. Delivery times typically range between 2 to 4 business days.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-200 space-y-3">
          <RotateCcw className="w-6 h-6 text-zinc-950" />
          <h3 className="text-sm font-bold uppercase text-zinc-950">30-Day Wear Trial</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Take your shoes out for a run. If you don&apos;t love them within 30 days, returns are 100% free with pre-printed labels.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-200 space-y-3">
          <CreditCard className="w-6 h-6 text-zinc-950" />
          <h3 className="text-sm font-bold uppercase text-zinc-950">Secure Payment</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            We accept all major credit/debit cards, Apple Pay, Google Pay, and Cash on Delivery for designated regions.
          </p>
        </div>
      </div>

      <div className="bg-zinc-950 text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-black uppercase">Need Immediate Assistance?</h3>
          <p className="text-xs text-zinc-400">Our athlete support specialists are available 24/7.</p>
        </div>
        <div className="flex gap-4">
          <a
            href="mailto:support@sportix.com"
            className="px-6 py-3 bg-white text-zinc-950 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}
