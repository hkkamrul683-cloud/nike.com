import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HeroCampaign() {
  return (
    <section className="relative w-full bg-zinc-950 text-white overflow-hidden">
      {/* Hero Visual Image Banner */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] min-h-[500px] max-h-[850px]">
        <Image
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=2000&q=85"
          alt="SPORTIX Built to Move Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/40" />

        {/* Content Box */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-16 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-full">
              New Season 2026
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white drop-shadow-md">
              BUILT TO MOVE.
              <br />
              <span className="text-zinc-200">FIND YOUR NEXT LEVEL.</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-medium max-w-lg leading-relaxed">
              Engineered with dual ZoomAir energy chambers and featherlight breathable uppers. Designed to propel you faster, farther, and beyond every limit.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/products?sort=newest"
                className="px-7 py-3.5 bg-white text-zinc-950 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-lg"
              >
                Shop New Arrivals
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products?category=flight"
                className="px-7 py-3.5 bg-zinc-900/80 backdrop-blur-md border border-white/20 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-zinc-950 transition-all shadow-lg"
              >
                Explore Flight Series
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
