import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function FeaturedSpotlight() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
          Featured Campaigns
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">
          Editorial deep-dives into our most iconic performance platforms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign 1: Air Infinity */}
        <div className="group relative rounded-3xl overflow-hidden bg-zinc-100 flex flex-col justify-between min-h-[480px]">
          <div className="relative w-full h-80 sm:h-96">
            <Image
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80"
              alt="Air Infinity Pro Running"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          </div>

          <div className="p-8 text-white -mt-20 relative z-10 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              Marathon Innovation
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter">
              AIR INFINITY PRO.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
              Dual high-pressure ZoomAir chambers paired with carbon composite propulsion. Tuned for marathoners chasing personal bests.
            </p>
            <div className="pt-2">
              <Link
                href="/products/sportix-air-infinity-pro"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-md"
              >
                Shop Air Infinity <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Campaign 2: Flight Retro */}
        <div className="group relative rounded-3xl overflow-hidden bg-zinc-900 flex flex-col justify-between min-h-[480px]">
          <div className="relative w-full h-80 sm:h-96">
            <Image
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
              alt="SPORTIX Flight Basketball"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          </div>

          <div className="p-8 text-white -mt-20 relative z-10 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-500">
              Basketball Heritage
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter">
              SPORTIX FLIGHT SERIES.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
              From the blacktops to the championship hardwood. Full-grain tumbled leather and iconic ankle support built to rule the paint.
            </p>
            <div className="pt-2">
              <Link
                href="/products?category=flight"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-md"
              >
                Explore Flight <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
