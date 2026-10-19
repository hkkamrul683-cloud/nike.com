'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  Search,
  Check,
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

const CATEGORIES = [
  { label: 'All Products', value: '' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Jordan & Flight', value: 'flight' },
  { label: 'Accessories', value: 'accessories' },
];

const GENDERS = [
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'Unisex', value: 'unisex' },
  { label: 'Kids', value: 'kids' },
];

const SPORTS = [
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Running', value: 'running' },
  { label: 'Basketball', value: 'basketball' },
  { label: 'Football', value: 'football' },
  { label: 'Training & Gym', value: 'training' },
];

const PRICE_TIERS = [
  { label: 'Under $50', min: '0', max: '50' },
  { label: '$50 - $100', min: '50', max: '100' },
  { label: '$100 - $150', min: '100', max: '150' },
  { label: 'Over $150', min: '150', max: '1000' },
];

const COLOR_SWATCHES = [
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#FFFFFF', border: true },
  { name: 'Grey', hex: '#9CA3AF' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Orange', hex: '#EA580C' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Pink', hex: '#EC4899' },
];

const SIZES = [
  'US 6',
  'US 6.5',
  'US 7',
  'US 7.5',
  'US 8',
  'US 8.5',
  'US 9',
  'US 9.5',
  'US 10',
  'US 10.5',
  'US 11',
  'US 11.5',
  'US 12',
  'US 13',
];

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedGender = searchParams.get('gender') || '';
  const selectedSport = searchParams.get('sport') || '';
  const selectedColor = searchParams.get('color') || '';
  const selectedSize = searchParams.get('size') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const isSale = searchParams.get('sale') === 'true';
  const isFeatured = searchParams.get('featured') === 'true';
  const isBestseller = searchParams.get('bestseller') === 'true';
  const selectedSort = searchParams.get('sort') || 'featured';

  // UI state
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Accordion state
  const [openSections, setOpenSections] = useState({
    category: true,
    gender: true,
    sport: true,
    price: true,
    color: true,
    size: true,
    specials: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/products');
  };

  // Fetch products whenever searchParams change
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        if (!params.has('limit')) {
          params.set('limit', '150');
        }
        const res = await fetch(`/api/products?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
          setTotalCount(data.pagination?.total ?? (data.products?.length || 0));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Construct readable page title
  const getPageTitle = () => {
    const vendorParam = searchParams.get('vendor') || searchParams.get('vendorSlug');
    if (vendorParam) {
      const formatted = vendorParam
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return `${formatted} Collection`;
    }
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (isSale) return 'Sale & Clearance';
    if (isBestseller) return 'Best Sellers';
    if (isFeatured) return 'Trending & Featured';

    const parts = [];
    if (selectedGender) {
      parts.push(selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1) + "'s");
    }
    if (selectedSport) {
      parts.push(selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1));
    }
    if (selectedCategory) {
      const cat = CATEGORIES.find((c) => c.value === selectedCategory);
      parts.push(cat?.label || 'Products');
    } else if (parts.length > 0) {
      parts.push('Shoes & Gear');
    } else {
      parts.push('All Shoes & Gear');
    }

    return parts.join(' ');
  };

  const vendorParam = searchParams.get('vendor') || searchParams.get('vendorSlug');

  // Active filter pills count
  const activeFilters = [
    vendorParam && {
      label: `Vendor: ${vendorParam
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')}`,
      key: 'vendor',
    },
    searchQuery && { label: `"${searchQuery}"`, key: 'search' },
    selectedCategory && {
      label: CATEGORIES.find((c) => c.value === selectedCategory)?.label || selectedCategory,
      key: 'category',
    },
    selectedGender && {
      label: GENDERS.find((g) => g.value === selectedGender)?.label || selectedGender,
      key: 'gender',
    },
    selectedSport && {
      label: SPORTS.find((s) => s.value === selectedSport)?.label || selectedSport,
      key: 'sport',
    },
    selectedColor && { label: `Color: ${selectedColor}`, key: 'color' },
    selectedSize && { label: `Size: ${selectedSize}`, key: 'size' },
    minPrice && { label: `$${minPrice} - $${maxPrice}`, key: 'price' },
    isSale && { label: 'Sale', key: 'sale' },
    isBestseller && { label: 'Best Seller', key: 'bestseller' },
    isFeatured && { label: 'Featured', key: 'featured' },
  ].filter(Boolean) as { label: string; key: string }[];

  return (
    <div className="min-h-screen bg-white text-zinc-950 pb-20 font-sans">
      {/* 1. Header & Controls Bar (Sticky Nike Sub-Header) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
          {/* Title + Count */}
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              {getPageTitle()}
            </h1>
            <span className="text-sm sm:text-base text-zinc-500 font-normal">
              ({totalCount})
            </span>
          </div>

          {/* Controls: Hide Filters + Sort Dropdown */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex items-center gap-2 text-[14px] font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Sort Menu */}
            <div className="flex items-center gap-1.5 text-[14px]">
              <span className="text-zinc-500 hidden sm:inline">Sort By:</span>
              <select
                value={selectedSort}
                onChange={(e) => updateQuery({ sort: e.target.value })}
                aria-label="Sort products"
                className="bg-transparent font-medium text-zinc-900 outline-none cursor-pointer text-[14px] py-1 pl-1 pr-6"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-desc">Price: High-Low</option>
                <option value="price-asc">Price: Low-High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {activeFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  if (f.key === 'price') {
                    updateQuery({ minPrice: null, maxPrice: null });
                  } else {
                    updateQuery({ [f.key]: null });
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[13px] font-medium text-zinc-800 transition-colors shrink-0"
              >
                <span>{f.label}</span>
                <X className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-[13px] font-semibold text-zinc-600 hover:text-zinc-950 underline underline-offset-4 ml-1 shrink-0"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* 2. Main Grid Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6">
        <div className="flex gap-10 items-start">
          {/* Left Sidebar Filters */}
          {showFilters && (
            <aside className="w-64 shrink-0 hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar pr-4 divide-y divide-zinc-200">
              {/* Category */}
              <div className="pb-6">
                <button
                  onClick={() => toggleSection('category')}
                  className="w-full flex items-center justify-between text-[15px] font-semibold text-zinc-900 py-1"
                >
                  <span>Category</span>
                  {openSections.category ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {openSections.category && (
                  <div className="mt-3 space-y-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.value;
                      return (
                        <button
                          key={cat.value}
                          onClick={() => updateQuery({ category: cat.value || null })}
                          className={`block w-full text-left text-[14px] transition-colors py-0.5 ${
                            isSelected
                              ? 'font-bold text-zinc-950'
                              : 'text-zinc-600 hover:text-zinc-950 font-normal'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="py-6">
                <button
                  onClick={() => toggleSection('gender')}
                  className="w-full flex items-center justify-between text-[15px] font-semibold text-zinc-900 py-1"
                >
                  <span>Gender</span>
                  {openSections.gender ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {openSections.gender && (
                  <div className="mt-3 space-y-2.5">
                    {GENDERS.map((g) => {
                      const isSelected = selectedGender === g.value;
                      return (
                        <label
                          key={g.value}
                          className="flex items-center gap-2.5 cursor-pointer text-[14px] text-zinc-700 hover:text-zinc-950 select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              updateQuery({ gender: isSelected ? null : g.value })
                            }
                            className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-zinc-950 cursor-pointer"
                          />
                          <span>{g.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Shop By Sport */}
              <div className="py-6">
                <button
                  onClick={() => toggleSection('sport')}
                  className="w-full flex items-center justify-between text-[15px] font-semibold text-zinc-900 py-1"
                >
                  <span>Sport</span>
                  {openSections.sport ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {openSections.sport && (
                  <div className="mt-3 space-y-2.5">
                    {SPORTS.map((s) => {
                      const isSelected = selectedSport === s.value;
                      return (
                        <label
                          key={s.value}
                          className="flex items-center gap-2.5 cursor-pointer text-[14px] text-zinc-700 hover:text-zinc-950 select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              updateQuery({ sport: isSelected ? null : s.value })
                            }
                            className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-zinc-950 cursor-pointer"
                          />
                          <span>{s.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Shop By Price */}
              <div className="py-6">
                <button
                  onClick={() => toggleSection('price')}
                  className="w-full flex items-center justify-between text-[15px] font-semibold text-zinc-900 py-1"
                >
                  <span>Shop By Price</span>
                  {openSections.price ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {openSections.price && (
                  <div className="mt-3 space-y-2.5">
                    {PRICE_TIERS.map((tier) => {
                      const isSelected =
                        minPrice === tier.min && maxPrice === tier.max;
                      return (
                        <label
                          key={tier.label}
                          className="flex items-center gap-2.5 cursor-pointer text-[14px] text-zinc-700 hover:text-zinc-950 select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              if (isSelected) {
                                updateQuery({ minPrice: null, maxPrice: null });
                              } else {
                                updateQuery({ minPrice: tier.min, maxPrice: tier.max });
                              }
                            }}
                            className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-zinc-950 cursor-pointer"
                          />
                          <span>{tier.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Colours */}
              <div className="py-6">
                <button
                  onClick={() => toggleSection('color')}
                  className="w-full flex items-center justify-between text-[15px] font-semibold text-zinc-900 py-1"
                >
                  <span>Colour</span>
                  {openSections.color ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {openSections.color && (
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {COLOR_SWATCHES.map((c) => {
                      const isSelected =
                        selectedColor.toLowerCase() === c.name.toLowerCase();
                      return (
                        <button
                          key={c.name}
                          onClick={() =>
                            updateQuery({
                              color: isSelected ? null : c.name.toLowerCase(),
                            })
                          }
                          className="flex flex-col items-center gap-1 group py-1"
                        >
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                              c.border ? 'border border-zinc-300' : ''
                            } ${isSelected ? 'ring-2 ring-zinc-950 ring-offset-2' : ''}`}
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && (
                              <Check
                                className={`w-3.5 h-3.5 ${
                                  c.name === 'White' || c.name === 'Yellow'
                                    ? 'text-zinc-950'
                                    : 'text-white'
                                }`}
                              />
                            )}
                          </span>
                          <span className="text-[11px] text-zinc-600 font-medium">
                            {c.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sizes */}
              <div className="py-6">
                <button
                  onClick={() => toggleSection('size')}
                  className="w-full flex items-center justify-between text-[15px] font-semibold text-zinc-900 py-1"
                >
                  <span>Sizes</span>
                  {openSections.size ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {openSections.size && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {SIZES.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() =>
                            updateQuery({ size: isSelected ? null : sz })
                          }
                          className={`py-2 px-1 rounded-md text-xs font-medium border text-center transition-colors ${
                            isSelected
                              ? 'border-zinc-950 bg-zinc-950 text-white'
                              : 'border-zinc-200 text-zinc-800 hover:border-zinc-400'
                          }`}
                        >
                          {sz.replace('US ', '')}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Special Features */}
              <div className="py-6">
                <button
                  onClick={() => toggleSection('specials')}
                  className="w-full flex items-center justify-between text-[15px] font-semibold text-zinc-900 py-1"
                >
                  <span>Sale & Specials</span>
                  {openSections.specials ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {openSections.specials && (
                  <div className="mt-3 space-y-2.5">
                    <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-zinc-700 hover:text-zinc-950 select-none">
                      <input
                        type="checkbox"
                        checked={isSale}
                        onChange={() =>
                          updateQuery({ sale: isSale ? null : 'true' })
                        }
                        className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-zinc-950 cursor-pointer"
                      />
                      <span>Sale Items</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-zinc-700 hover:text-zinc-950 select-none">
                      <input
                        type="checkbox"
                        checked={isBestseller}
                        onChange={() =>
                          updateQuery({ bestseller: isBestseller ? null : 'true' })
                        }
                        className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-zinc-950 cursor-pointer"
                      />
                      <span>Best Sellers</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-zinc-700 hover:text-zinc-950 select-none">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={() =>
                          updateQuery({ featured: isFeatured ? null : 'true' })
                        }
                        className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-zinc-950 cursor-pointer"
                      />
                      <span>Featured Silhouettes</span>
                    </label>
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 ${
                  showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                }`}
              >
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="space-y-3 animate-pulse">
                    <div className="aspect-square bg-zinc-100 rounded-md" />
                    <div className="h-4 bg-zinc-100 rounded w-1/3" />
                    <div className="h-4 bg-zinc-100 rounded w-3/4" />
                    <div className="h-3 bg-zinc-100 rounded w-1/2" />
                    <div className="h-4 bg-zinc-100 rounded w-1/4" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-24 text-center max-w-md mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                  We couldn&apos;t find anything that matched your selection
                </h3>
                <p className="text-sm text-zinc-500">
                  Try clearing some filters or searching for another silhouette or
                  sport.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-zinc-950 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 ${
                  showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                }`}
              >
                {products.map((product, idx) => (
                  <ProductCard
                    key={product._id?.toString() || idx}
                    product={product}
                    priority={idx < 6}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
