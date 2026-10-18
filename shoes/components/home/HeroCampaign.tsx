import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HeroCampaign() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Main Hero — Full Width */}
      <div className="relative w-full h-[75vh] sm:h-[85vh] min-h-[540px] max-h-[900px]">
        <Image
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=2000&q=85"
          alt="Nike — Just Do It"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay — subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Text Content — bottom left, Nike style */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 md:px-16 pb-12 sm:pb-16">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
              JUST DO IT.
            </h1>
            <p className="text-sm sm:text-base text-white/80 font-normal max-w-md leading-relaxed">
              New season, new moves. Explore the latest Nike footwear and apparel engineered to push every limit.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/products?sort=newest"
                className="px-7 py-3.5 bg-white text-zinc-950 rounded-full text-sm font-bold hover:bg-zinc-100 transition-all flex items-center gap-2 group"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products?featured=true"
                className="px-7 py-3.5 bg-transparent border border-white text-white rounded-full text-sm font-bold hover:bg-white hover:text-zinc-950 transition-all"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-hero 2-panel grid — Nike homepage style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {/* Panel 1 */}
        <div className="relative h-[50vh] min-h-[320px] overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
            alt="Nike Running — Air Infinity Pro"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">Running</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Air Infinity Pro</h2>
            <Link
              href="/products?sport=running"
              className="inline-block mt-1 px-5 py-2.5 bg-white text-zinc-950 rounded-full text-xs font-bold hover:bg-zinc-100 transition-colors"
            >
              Shop Running
            </Link>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="relative h-[50vh] min-h-[320px] overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80"
            alt="Nike Basketball — Flight Retro"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">Basketball</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Flight Series</h2>
            <Link
              href="/products?sport=basketball"
              className="inline-block mt-1 px-5 py-2.5 bg-white text-zinc-950 rounded-full text-xs font-bold hover:bg-zinc-100 transition-colors"
            >
              Shop Basketball
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
