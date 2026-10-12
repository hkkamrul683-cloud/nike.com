'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

const GENDERS = ['Men', 'Women', 'Kids', 'Unisex'];
const CATEGORIES = [
  { name: 'Shoes', slug: 'shoes' },
  { name: 'Clothing', slug: 'clothing' },
  { name: 'SPORTIX Flight', slug: 'flight' },
  { name: 'Accessories', slug: 'accessories' },
];
const SPORTS = ['Running', 'Basketball', 'Football', 'Training', 'Lifestyle'];
const SIZES = ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12', 'S', 'M', 'L', 'XL'];
const COLORS = ['Black', 'White', 'Red', 'Grey', 'Volt', 'Blue', 'Pink'];

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active filter state extracted from searchParams
  const selectedGender = searchParams.get('gender') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedSport = searchParams.get('sport') || '';
  const selectedSize = searchParams.get('size') || '';
  const selectedColor = searchParams.get('color') || '';
  const isSaleOnly = searchParams.get('sale') === 'true';
  const isBestsellerOnly = searchParams.get('bestseller') === 'true';
  const isFeaturedOnly = searchParams.get('featured') === 'true';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  // Update URL search parameters
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '' || (key === 'sale' && value === 'false')) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/products');
  };

  // Fetch products whenever search params change
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const query = searchParams.toString();
        const res = await fetch(`/api/products?${query}&limit=48`);
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
          setTotalCount(data.pagination?.total || data.products.length);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Compute active filters count
  const activeFilters = [
    selectedGender && { label: `Gender: ${selectedGender}`, key: 'gender' },
    selectedCategory && { label: `Category: ${selectedCategory}`, key: 'category' },
    selectedSport && { label: `Sport: ${selectedSport}`, key: 'sport' },
    selectedSize && { label: `Size: ${selectedSize}`, key: 'size' },
    selectedColor && { label: `Color: ${selectedColor}`, key: 'color' },
    isSaleOnly && { label: 'Sale & Offers', key: 'sale' },
    isBestsellerOnly && { label: 'Best Sellers', key: 'bestseller' },
    isFeaturedOnly && { label: 'Featured Drops', key: 'featured' },
    searchQuery && { label: `Search: "${searchQuery}"`, key: 'search' },
  ].filter(Boolean) as { label: string; key: string }[];

  const pageTitle = selectedCategory
    ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Products'
    : selectedSport
    ? `${selectedSport} Gear`
    : selectedGender
    ? `${selectedGender.toUpperCase()}'S COLLECTION`
    : isSaleOnly
    ? 'Sale & Clearance'
    : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header & Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
            {pageTitle} ({totalCount})
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">
            Engineered footwear, apparel, and athletic essentials
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Hide/Show Filters Desktop Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-800 hover:border-zinc-950 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Mobile Filter Sheet Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-800"
          >
            <Filter className="w-3.5 h-3.5" /> Filters
            {activeFilters.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-zinc-950 text-white text-[10px] flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
              aria-label="Sort products by"
              className="appearance-none bg-zinc-50 border border-zinc-300 hover:border-zinc-950 px-4 py-2 pr-8 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-800 outline-none cursor-pointer transition-colors"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Sort: Price Low to High</option>
              <option value="price-desc">Sort: Price High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
          {activeFilters.map((tag) => (
            <button
              key={tag.key}
              onClick={() => updateFilter(tag.key, null)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-medium transition-colors"
            >
              <span>{tag.label}</span>
              <X className="w-3 h-3 text-zinc-500" />
            </button>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-red-600 hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Layout Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
        {/* Desktop Filter Sidebar */}
        {showFilters && (
          <aside className="hidden md:block md:col-span-3 space-y-6 pr-4 border-r border-zinc-100">
            {/* Gender Filter */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-3">
                Gender
              </h3>
              <div className="space-y-2">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    onClick={() =>
                      updateFilter(
                        'gender',
                        selectedGender.toLowerCase() === g.toLowerCase() ? null : g.toLowerCase()
                      )
                    }
                    className={`flex items-center justify-between w-full text-xs text-left py-1 hover:text-black transition-colors ${
                      selectedGender.toLowerCase() === g.toLowerCase()
                        ? 'font-bold text-zinc-950'
                        : 'text-zinc-600'
                    }`}
                  >
                    <span>{g}</span>
                    {selectedGender.toLowerCase() === g.toLowerCase() && (
                      <Check className="w-3.5 h-3.5 text-zinc-950" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="pt-4 border-t border-zinc-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-3">
                Category
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() =>
                      updateFilter(
                        'category',
                        selectedCategory === cat.slug ? null : cat.slug
                      )
                    }
                    className={`flex items-center justify-between w-full text-xs text-left py-1 hover:text-black transition-colors ${
                      selectedCategory === cat.slug
                        ? 'font-bold text-zinc-950'
                        : 'text-zinc-600'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.slug && (
                      <Check className="w-3.5 h-3.5 text-zinc-950" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sport Filter */}
            <div className="pt-4 border-t border-zinc-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-3">
                Sport
              </h3>
              <div className="space-y-2">
                {SPORTS.map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      updateFilter(
                        'sport',
                        selectedSport.toLowerCase() === s.toLowerCase() ? null : s.toLowerCase()
                      )
                    }
                    className={`flex items-center justify-between w-full text-xs text-left py-1 hover:text-black transition-colors ${
                      selectedSport.toLowerCase() === s.toLowerCase()
                        ? 'font-bold text-zinc-950'
                        : 'text-zinc-600'
                    }`}
                  >
                    <span>{s}</span>
                    {selectedSport.toLowerCase() === s.toLowerCase() && (
                      <Check className="w-3.5 h-3.5 text-zinc-950" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes Filter */}
            <div className="pt-4 border-t border-zinc-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-3">
                Size
              </h3>
              <div className="grid grid-cols-3 gap-1.5">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => updateFilter('size', selectedSize === size ? null : size)}
                    className={`py-1.5 px-2 border rounded text-[11px] font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sale Toggle */}
            <div className="pt-4 border-t border-zinc-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSaleOnly}
                  onChange={(e) => updateFilter('sale', e.target.checked ? 'true' : null)}
                  className="w-4 h-4 rounded text-zinc-950 focus:ring-zinc-950"
                />
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Sale & Offers Only
                </span>
              </label>
            </div>
          </aside>
        )}

        {/* Product Grid Area */}
        <main
          className={`${
            showFilters ? 'md:col-span-9' : 'md:col-span-12'
          } transition-all`}
        >
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3 animate-pulse">
                  <div className="aspect-square bg-zinc-200 rounded-xl" />
                  <div className="h-4 bg-zinc-200 rounded w-3/4" />
                  <div className="h-3 bg-zinc-200 rounded w-1/2" />
                  <div className="h-4 bg-zinc-200 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-zinc-50 rounded-2xl p-8">
              <h3 className="text-xl font-black uppercase text-zinc-900 mb-2">
                We couldn&apos;t find anything that matched.
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6">
                Try selecting different filters, clearing your search term, or browsing all available sportswear styles.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 ${
                showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
              } gap-x-6 gap-y-10`}
            >
              {products.map((product, idx) => (
                <ProductCard key={product._id} product={product} priority={idx < 4} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col p-6 overflow-y-auto animate-slideIn">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <h2 className="text-base font-black uppercase">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-6">
              {/* Gender */}
              <div>
                <h4 className="text-xs font-bold uppercase mb-2">Gender</h4>
                <div className="space-y-1.5">
                  {GENDERS.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        updateFilter('gender', selectedGender.toLowerCase() === g.toLowerCase() ? null : g.toLowerCase());
                        setIsMobileFilterOpen(false);
                      }}
                      className="block text-xs text-zinc-700 py-1"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase mb-2">Category</h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        updateFilter('category', selectedCategory === cat.slug ? null : cat.slug);
                        setIsMobileFilterOpen(false);
                      }}
                      className="block text-xs text-zinc-700 py-1"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sport */}
              <div>
                <h4 className="text-xs font-bold uppercase mb-2">Sport</h4>
                <div className="space-y-1.5">
                  {SPORTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        updateFilter('sport', selectedSport.toLowerCase() === s.toLowerCase() ? null : s.toLowerCase());
                        setIsMobileFilterOpen(false);
                      }}
                      className="block text-xs text-zinc-700 py-1"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 mt-auto">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="w-8 h-8 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <ProductCatalogContent />
    </Suspense>
  );
}
