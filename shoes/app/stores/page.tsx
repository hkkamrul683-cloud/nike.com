'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  Store,
  Navigation,
  Star,
  ChevronRight,
  Package,
} from 'lucide-react';
import { INITIAL_VENDORS, Vendor } from '@/lib/vendors-data';

export default function StoresAndVendorsPage() {
  const [vendors, setVendors] = useState<any[]>(INITIAL_VENDORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch updated vendors from API to get live product counts and status
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch('/api/vendors');
        if (res.ok) {
          const data = await res.json();
          if (data.vendors && data.vendors.length > 0) {
            setVendors(data.vendors);
          }
        }
      } catch (err) {
        console.error('Failed to load vendors:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const cities = ['all', 'Dhaka', 'Gazipur'];

  const filteredStores = vendors.filter((v) => {
    const matchesSearch =
      !searchQuery ||
      v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity =
      selectedCity === 'all' ||
      v.city?.toLowerCase() === selectedCity.toLowerCase();

    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Hero Header */}
      <section className="bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-mono font-semibold">
            <Store className="w-3.5 h-3.5" />
            <span>10 Authorized Footwear Outlets & Vendors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Find a Store & Official Vendors
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Locate verified footwear supplier outlets, authorized retail partner stores,
            and in-person fitting centers across Bangladesh.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by area (Gulshan, Banani, Uttara...), store or brand..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 text-sm focus:outline-hidden focus:border-zinc-700 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* City Filter Pills */}
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-zinc-200">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {city === 'all' ? `All Outlets (${vendors.length})` : `${city}`}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            Showing {filteredStores.length} of {vendors.length} Stores
          </span>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filteredStores.map((store) => {
            const initials = store.name
              ?.split(' ')
              .slice(0, 2)
              .map((w: string) => w[0])
              .join('')
              .toUpperCase() || 'VN';

            const mapQuery = encodeURIComponent(
              `${store.name}, ${store.address}, ${store.city}, Bangladesh`
            );

            return (
              <div
                key={store._id || store.slug}
                className="rounded-3xl border border-zinc-200 bg-white p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-zinc-400"
              >
                <div className="space-y-4">
                  {/* Store Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white font-mono font-bold text-sm flex items-center justify-center shadow-sm">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-zinc-950 group-hover:text-black line-clamp-1">
                          {store.name}
                        </h3>
                        <p className="text-xs text-zinc-500 line-clamp-1">
                          {store.company || store.name}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Rating & Badge */}
                  <div className="flex items-center gap-3 text-xs text-zinc-600">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{store.rating || 4.8}</span>
                    </div>
                    <span>&bull;</span>
                    <span className="text-zinc-500 font-medium">Authorized Retailer</span>
                    {store.productCount > 0 && (
                      <>
                        <span>&bull;</span>
                        <span className="font-mono font-semibold text-zinc-800">
                          {store.productCount} Shoes In Stock
                        </span>
                      </>
                    )}
                  </div>

                  {/* Location Info */}
                  <div className="space-y-2 pt-2 border-t border-zinc-100 text-xs">
                    <div className="flex items-start gap-2.5 text-zinc-700">
                      <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-zinc-900">{store.city} Flagship</strong>
                        <span className="text-zinc-600 leading-relaxed">
                          {store.address || 'Dhaka, Bangladesh'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-zinc-700">
                      <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span>10:00 AM &ndash; 9:00 PM (Open 7 Days)</span>
                    </div>

                    {store.phone && (
                      <div className="flex items-center gap-2.5 text-zinc-700 font-mono">
                        <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                        <a
                          href={`tel:${store.phone}`}
                          className="hover:underline hover:text-zinc-950"
                        >
                          {store.phone}
                        </a>
                      </div>
                    )}

                    {store.email && (
                      <div className="flex items-center gap-2.5 text-zinc-700">
                        <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                        <a
                          href={`mailto:${store.email}`}
                          className="hover:underline hover:text-zinc-950 truncate max-w-[220px]"
                        >
                          {store.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Scope note */}
                  {store.notes && (
                    <p className="text-[11px] text-zinc-500 italic bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                      &ldquo;{store.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-5 mt-5 border-t border-zinc-100 flex items-center gap-2">
                  <Link
                    href={`/products?vendor=${store.slug}`}
                    className="flex-1 py-2.5 px-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Browse Shoes</span>
                  </Link>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-zinc-300 hover:border-zinc-950 text-zinc-700 hover:text-zinc-950 transition-colors"
                    title="Get Directions on Google Maps"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStores.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <Store className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-900">No Stores Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              We couldn&apos;t find any stores matching &ldquo;{searchQuery}&rdquo;.
              Try searching for &quot;Dhaka&quot;, &quot;Gulshan&quot;, or &quot;Nike&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('all');
              }}
              className="mt-3 px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Assistance Footer Banner */}
      <section className="bg-zinc-50 border-t border-zinc-200 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-zinc-950 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black uppercase tracking-tight">
              Want to partner with HypeKicks?
            </h3>
            <p className="text-xs text-zinc-400">
              Authorized footwear suppliers and brand distributors can apply for marketplace retail onboarding.
            </p>
          </div>
          <Link
            href="/help"
            className="px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            Contact Partner Desk
          </Link>
        </div>
      </section>
    </div>
  );
}
