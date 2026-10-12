'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TERMS = [
  'Air Infinity',
  'Flight Retro',
  'Running Shoes',
  'Club Fleece Hoodie',
  'Basketball',
  'Leggings',
  'Dunk Low',
  'Gym Training',
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query.trim())}&limit=6`);
        const data = await res.json();
        if (data.products) {
          setResults(data.products);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md animate-fadeIn">
      {/* Top Search Input Bar */}
      <div className="border-b border-zinc-200 px-6 py-6 max-w-5xl mx-auto w-full flex items-center gap-4">
        <Search className="w-6 h-6 text-zinc-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, shoes, apparel, sports..."
          className="w-full text-xl md:text-2xl font-medium outline-none bg-transparent placeholder:text-zinc-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 rounded-full hover:bg-zinc-100 text-zinc-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onClose}
          className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full hover:bg-zinc-100 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Results / Suggestions Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-5xl mx-auto w-full">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Products ({results.length})
              </h3>
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1"
              >
                View all results <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 p-2 rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  <div className="relative w-20 h-20 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={product.images?.[0] || '/placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 group-hover:underline line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-zinc-500 line-clamp-1">{product.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-zinc-900">
                        ${product.salePrice || product.price}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs text-zinc-400 line-through">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !query && (
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <TrendingUp className="w-4 h-4 text-red-600" /> Popular Search Terms
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TERMS.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-sm font-medium text-zinc-800 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isLoading && query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-bold text-zinc-800 mb-1">
              No results found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-sm text-zinc-500">
              Check your spelling or browse our popular categories below.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
