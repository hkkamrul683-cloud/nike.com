'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

interface TrendingCarouselProps {
  products: any[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
}

export default function TrendingCarousel({
  products,
  title = 'Trending Now',
  subtitle = 'The hottest silhouettes and performance gear this week',
  viewAllLink = '/products?bestseller=true',
}: TrendingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={viewAllLink}
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline hidden sm:inline"
          >
            Shop All
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
              title="Scroll Left"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
              title="Scroll Right"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
      >
        {products.map((product, idx) => (
          <div
            key={product._id?.toString() || idx}
            className="w-[260px] sm:w-[300px] shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
