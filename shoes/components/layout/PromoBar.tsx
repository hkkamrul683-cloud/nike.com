'use client';

import Link from 'next/link';

export default function PromoBar() {
  return (
    <aside
      aria-label="Promotional banner"
      className="bg-[#f5f5f5] border-b border-zinc-200/80 py-3 px-4 text-center text-zinc-900"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-1">
        <p className="text-sm md:text-[15px] font-semibold text-zinc-900 tracking-tight">
          Enjoy 15% Off On The SPORTIX App. Use: APP15
        </p>
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-zinc-900">
          <Link
            href="/help"
            className="underline underline-offset-2 hover:text-zinc-600 transition-colors"
          >
            Download Now
          </Link>
          <Link
            href="/legal"
            className="underline underline-offset-2 hover:text-zinc-600 transition-colors"
          >
            T&Cs
          </Link>
        </div>
      </div>
    </aside>
  );
}
