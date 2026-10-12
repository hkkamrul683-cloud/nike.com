'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PROMOS = [
  {
    title: 'FREE STANDARD SHIPPING ON ORDERS $150+',
    subtitle: 'Sign in for faster checkout and exclusive member rewards.',
    linkText: 'Join SPORTIX Club',
    href: '/register',
  },
  {
    title: 'EXTRA 20% OFF SELECT STYLES',
    subtitle: 'Use promo code MOVE20 at checkout on eligible footwear and apparel.',
    linkText: 'Shop Sale',
    href: '/products?sale=true',
  },
  {
    title: 'NEW IN: SPORTIX FLIGHT BASKETBALL RETRO',
    subtitle: 'Step into legendary court heritage with the new Chicago colorway.',
    linkText: 'Explore Flight',
    href: '/products?category=flight',
  },
];

export default function PromoBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PROMOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const promo = PROMOS[index];

  return (
    <div className="bg-zinc-100 border-b border-zinc-200 py-2.5 px-4 text-center text-xs text-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <span className="font-bold tracking-wider uppercase">{promo.title}</span>
        <span className="hidden md:inline text-zinc-500">— {promo.subtitle}</span>
        <Link
          href={promo.href}
          className="underline font-semibold text-zinc-950 hover:text-red-600 transition-colors ml-1"
        >
          {promo.linkText}
        </Link>
      </div>
    </div>
  );
}
