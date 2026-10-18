import Link from 'next/link';
import Image from 'next/image';

const SPORTS = [
  {
    name: 'Running',
    tagline: 'Go the Distance',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=running',
  },
  {
    name: 'Basketball',
    tagline: 'Own the Court',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=basketball',
  },
  {
    name: 'Training',
    tagline: 'Train Harder',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=training',
  },
  {
    name: 'Football',
    tagline: 'Speed & Control',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=football',
  },
  {
    name: 'Lifestyle',
    tagline: 'Street & Style',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=lifestyle',
  },
  {
    name: 'Yoga',
    tagline: 'Flow & Focus',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    href: '/products?sport=yoga',
  },
];

export default function ShopBySport() {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
          Shop by Sport
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Gear built for your game
        </p>
      </div>

      {/* 6-tile grid — Nike style */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SPORTS.map((sport) => (
          <Link
            key={sport.name}
            href={sport.href}
            className="group relative rounded-xl overflow-hidden block bg-zinc-100 aspect-[3/4]"
          >
            <Image
              src={sport.image}
              alt={sport.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Text */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
              <p className="text-[10px] font-medium text-white/70 mb-0.5">{sport.tagline}</p>
              <h3 className="text-sm font-black uppercase tracking-tight leading-tight">
                {sport.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
