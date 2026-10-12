import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const SPORTS = [
  {
    name: 'Running',
    tagline: 'Speed & Long Distance',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=running',
  },
  {
    name: 'Basketball',
    tagline: 'Flight & Hardwood Supremacy',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=basketball',
  },
  {
    name: 'Gym & Training',
    tagline: 'Heavy Lifts & High Intensity',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=training',
  },
  {
    name: 'Football',
    tagline: 'Lethal Speed & Turf Control',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=football',
  },
];

export default function ShopBySport() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
          Shop By Sport
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">
          Equipment and footwear fine-tuned for your exact athletic discipline
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SPORTS.map((sport) => (
          <Link
            key={sport.name}
            href={sport.href}
            className="group relative h-96 rounded-2xl overflow-hidden block shadow-sm"
          >
            <Image
              src={sport.image}
              alt={sport.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                {sport.tagline}
              </span>
              <div className="flex items-center justify-between mt-1">
                <h3 className="text-xl font-black uppercase tracking-tight">
                  {sport.name}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
