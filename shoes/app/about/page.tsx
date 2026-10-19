import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-10">
      <div className="text-center space-y-3 pb-8 border-b border-zinc-200">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Our Story</span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-zinc-950">
          STEP INTO THE FUTURE.
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto">
          HypeKicks was born on the track and built for the streets. We design sports footwear and technical streetwear that merges aerodynamic innovation with iconic street heritage.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-zinc-700 leading-relaxed">
        <h2 className="text-xl font-black uppercase text-zinc-950">Aerodynamic Performance</h2>
        <p>
          Every pair of HypeKicks road racers, basketball high-tops, and gym training shoes is tested by competitive athletes and streetwear creators. By pairing pressurized Air cushioning with responsive carbon propulsion, we eliminate wasted energy and convert ground strike impact into explosive forward momentum.
        </p>

        <h2 className="text-xl font-black uppercase text-zinc-950">Sustainable Athletics</h2>
        <p>
          Over 60% of the polyester yarn used across our 2026 apparel and Flyknit footwear upper constructions is derived from recycled post-consumer plastics. We believe speed and environmental responsibility go hand in hand.
        </p>
      </div>

      <div className="pt-6">
        <Link
          href="/products"
          className="inline-block px-8 py-3.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
