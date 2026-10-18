import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedSpotlight() {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-2">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
          Don&apos;t Miss
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1 — Air Infinity Pro */}
        <div className="group relative rounded-2xl overflow-hidden bg-[#f5f5f5] min-h-[480px] flex flex-col">
          <div className="relative flex-1 min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80"
              alt="Air Infinity Pro Running"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="p-7 bg-[#f5f5f5] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              Running Innovation
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-950">
              Air Infinity Pro
            </h3>
            <p className="text-sm text-zinc-600 max-w-sm leading-relaxed">
              Dual-chamber ZoomAir cushioning and carbon-composite propulsion for marathon PBs.
            </p>
            <div className="pt-2 flex gap-3">
              <Link
                href="/products/sportix-air-infinity-pro"
                className="px-6 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wide hover:bg-zinc-700 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/products?sport=running"
                className="px-6 py-2.5 border border-zinc-300 text-zinc-900 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2 — Flight Retro */}
        <div className="group relative rounded-2xl overflow-hidden bg-[#111111] min-h-[480px] flex flex-col">
          <div className="relative flex-1 min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
              alt="Nike Flight Basketball"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
            />
          </div>
          <div className="p-7 bg-[#111111] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Basketball Heritage
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              Flight Series
            </h3>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              From the blacktop to the hardwood. Iconic ankle support and full-grain leather since day one.
            </p>
            <div className="pt-2 flex gap-3">
              <Link
                href="/products?category=flight"
                className="px-6 py-2.5 bg-white text-zinc-950 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/products?sport=basketball"
                className="px-6 py-2.5 border border-zinc-700 text-white rounded-full text-xs font-bold uppercase tracking-wide hover:bg-zinc-800 transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
