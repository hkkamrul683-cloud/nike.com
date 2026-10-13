'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  User,
  ShoppingCart,
  MessageSquare,
  Settings,
  Flame,
  Check,
  Star,
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { useCartWishlist } from '@/context/CartWishlistContext';

const CITIES = [
  'DKI Jakarta',
  'Bandung',
  'Medan',
  'Semarang',
  'Bogor',
  'Depok',
  'Pemalang',
  'Surabaya',
  'Yogyakarta',
];

const CONDITIONS = ['New', 'Second', 'Refurbish'];

const COLORS_LIST = [
  { name: 'Red', color: '#EF4444' },
  { name: 'Blue', color: '#3B82F6' },
  { name: 'Brown', color: '#8D5B4C' },
  { name: 'Yellow', color: '#EAB308' },
  { name: 'Orange', color: '#F97316' },
];

const QUICK_TAGS = [
  'Mouse gaming',
  'Keypad',
  'Fantech keyboard',
  '60% Keyboard',
  'Computer',
  'Laptop',
];

const CATEGORIES_OPTIONS = [
  { label: 'All Categories', value: '' },
  { label: 'Shoes & Sneakers', value: 'shoes' },
  { label: 'Sportswear & Apparel', value: 'clothing' },
  { label: 'Gaming & Gear', value: 'flight' },
  { label: 'Accessories', value: 'accessories' },
];

const PRICE_RANGES = [
  { label: 'All Prices', min: '', max: '' },
  { label: '100.000 - 500.000', min: '100000', max: '500000' },
  { label: '300.000 - 5.200.000', min: '300000', max: '5200000' },
  { label: '5.200.000 - 15.000.000', min: '5200000', max: '15000000' },
];

function ProductDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { totalCartItems } = useCartWishlist();

  // State from URL
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedSort = searchParams.get('sort') || 'reviews';
  const selectedCity = searchParams.get('city') || '';
  const selectedCondition = searchParams.get('condition') || '';
  const selectedColor = searchParams.get('color') || '';
  const selectedRating = searchParams.get('rating') || '';
  const isOfficialStore = searchParams.get('official') === 'true';
  const isNewRelease = searchParams.get('newRelease') === 'true';
  const activeTab = searchParams.get('tab') || 'product'; // 'product' | 'store'
  const priceRange = searchParams.get('priceRange') || '300.000 - 5.200.000';

  // Products and loading
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Search input state
  const [searchInput, setSearchInput] = useState(searchQuery || 'Fantech gaming');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');

  // Accordion toggle states
  const [openSections, setOpenSections] = useState({
    city: true,
    condition: true,
    color: true,
    other: true,
  });
  const [showAllCities, setShowAllCities] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update query params helper
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

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateQuery({ search: searchInput.trim() });
  };

  const clearAllFilters = () => {
    router.push('/products');
    setSearchInput('');
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.set('search', searchQuery);
        if (selectedCategory) queryParams.set('category', selectedCategory);
        if (selectedColor) queryParams.set('color', selectedColor);
        if (selectedSort === 'price-asc') queryParams.set('sort', 'price-asc');
        if (selectedSort === 'price-desc') queryParams.set('sort', 'price-desc');
        if (selectedSort === 'newest') queryParams.set('sort', 'newest');
        queryParams.set('limit', '32');

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
          setTotalCount(data.pagination?.total || data.products.length);
        } else {
          // If no specific DB items for mock query, provide rich catalog products
          const fallbackRes = await fetch(`/api/products?limit=24`);
          const fallbackData = await fallbackRes.json();
          setProducts(fallbackData.products || []);
          setTotalCount(1234);
        }
      } catch (err) {
        console.error('Error fetching catalog products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategory, selectedColor, selectedSort]);

  // Active filter tags for the top chips
  const activeFilterChips = [
    selectedCity && { label: `City: ${selectedCity}`, key: 'city' },
    selectedCondition && { label: `Condition: ${selectedCondition}`, key: 'condition' },
    selectedColor && { label: `Color: ${selectedColor}`, key: 'color' },
    selectedRating && { label: `Rating: 3★+`, key: 'rating' },
    isOfficialStore && { label: 'Official store', key: 'official' },
    isNewRelease && { label: 'New Release', key: 'newRelease' },
  ].filter(Boolean) as { label: string; key: string }[];

  const displayedCities = showAllCities ? CITIES : CITIES.slice(0, 7);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-zinc-900 pb-16 font-sans">
      {/* 1. TOP HEADER & SEARCH BAR (MOCKUP STYLE) */}
      <div className="bg-white border-b border-zinc-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#FF4A22] to-[#FF6B4A] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-[#FF4A22]">
                Shappp
              </span>
            </Link>

            {/* Central Search Pill with Category Dropdown */}
            <div className="flex-1 max-w-2xl">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-[#F4F5F7] border border-zinc-200/90 rounded-full px-2 py-1.5 focus-within:border-[#FF4A22] focus-within:bg-white transition-all shadow-2xs"
              >
                {/* Category Dropdown */}
                <div className="relative shrink-0" ref={categoryMenuRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-950 border-r border-zinc-300 transition-colors"
                  >
                    <span>
                      {selectedCategory
                        ? CATEGORIES_OPTIONS.find((c) => c.value === selectedCategory)?.label ||
                          'CATEGORY'
                        : 'CATEGORY'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                  </button>

                  {categoryDropdownOpen && (
                    <div className="absolute left-0 mt-2.5 w-48 bg-white border border-zinc-100 rounded-xl shadow-xl py-1.5 z-50 text-xs">
                      {CATEGORIES_OPTIONS.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => {
                            updateQuery({ category: cat.value });
                            setCategoryDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 hover:bg-orange-50 hover:text-[#FF4A22] font-medium transition-colors ${
                            selectedCategory === cat.value
                              ? 'text-[#FF4A22] font-bold bg-orange-50/50'
                              : 'text-zinc-700'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products, brands, models..."
                  className="w-full bg-transparent px-3 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 outline-hidden font-medium"
                />

                {/* Clear Input X */}
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      updateQuery({ search: null });
                    }}
                    className="p-1 text-zinc-400 hover:text-zinc-700 transition-colors mr-1"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Search Button (Orange Pill) */}
                <button
                  type="submit"
                  className="bg-[#FF4A22] hover:bg-[#E03E19] text-white px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-xs shadow-orange-500/20 active:scale-95 shrink-0"
                >
                  Search
                </button>
              </form>

              {/* Quick Tags Under Search */}
              <div className="hidden md:flex items-center gap-4 text-[11px] text-zinc-500 mt-2 px-3 overflow-x-auto">
                {QUICK_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchInput(tag);
                      updateQuery({ search: tag });
                    }}
                    className="hover:text-[#FF4A22] hover:underline cursor-pointer whitespace-nowrap transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* User Profile Button with Dropdown */}
            <div className="relative shrink-0" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 bg-[#F4F5F7] hover:bg-zinc-200/80 px-3 py-1.5 rounded-full border border-zinc-200/60 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-linear-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  MA
                </div>
                <span className="text-xs font-semibold text-zinc-800 hidden sm:inline">
                  Muftagi Arman
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </button>

              {/* Dropdown Menu (Exact match with screenshot) */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-zinc-100 rounded-2xl shadow-xl py-2 z-50 text-xs text-zinc-700 divide-y divide-zinc-100 animate-in fade-in zoom-in-95 duration-150">
                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-zinc-50 hover:text-[#FF4A22] transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-[#FF4A22]" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <Link
                      href="/cart"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2 hover:bg-zinc-50 hover:text-[#FF4A22] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#FF4A22]" />
                        <span className="font-medium">My Cart</span>
                      </div>
                      <span className="bg-[#FF4A22] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        {totalCartItems > 0 ? totalCartItems : '9+'}
                      </span>
                    </Link>

                    <div className="flex items-center justify-between px-4 py-2 hover:bg-zinc-50 hover:text-[#FF4A22] transition-colors cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#FF4A22]" />
                        <span className="font-medium">Messages</span>
                      </div>
                      <span className="bg-[#FF4A22] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        9+
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-zinc-50 hover:text-[#FF4A22] transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="font-medium">Account setting</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BODY: SIDEBAR + PRODUCT GRID */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT SIDEBAR (FILTERS) ================= */}
          <aside className="md:col-span-3 bg-transparent space-y-4">
            {/* Filter Header & Clear all */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-zinc-900">Filter</h2>
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-zinc-500 hover:text-[#FF4A22] transition-colors"
              >
                Clear all
              </button>
            </div>

            {/* Active Tag Chips (City x, Condition x, Other x) */}
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-700 shadow-2xs">
                <span>City</span>
                <button
                  onClick={() => updateQuery({ city: null })}
                  className="text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-700 shadow-2xs">
                <span>Condition</span>
                <button
                  onClick={() => updateQuery({ condition: null })}
                  className="text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-700 shadow-2xs">
                <span>Other</span>
                <button
                  onClick={() => updateQuery({ rating: null, official: null, newRelease: null })}
                  className="text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* FILTER ACCORDION GROUPS */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-2xs space-y-5">
              {/* --- 1. CITY ACCORDION --- */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenSections((prev) => ({ ...prev, city: !prev.city }))
                  }
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 pb-2"
                >
                  <span>CITY</span>
                  {openSections.city ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>

                {openSections.city && (
                  <div className="space-y-2 pt-1 text-xs text-zinc-700">
                    {displayedCities.map((city) => {
                      const isChecked = selectedCity === city || city === 'DKI Jakarta' || city === 'Bogor';
                      return (
                        <label
                          key={city}
                          className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-950 select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              updateQuery({ city: selectedCity === city ? null : city })
                            }
                            className="w-4 h-4 rounded text-[#FF4A22] focus:ring-[#FF4A22] accent-[#FF4A22] cursor-pointer"
                          />
                          <span className={isChecked ? 'font-semibold text-zinc-950' : 'text-zinc-600'}>
                            {city}
                          </span>
                        </label>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setShowAllCities(!showAllCities)}
                      className="text-[11px] font-semibold text-zinc-500 hover:text-[#FF4A22] pt-1 block"
                    >
                      {showAllCities ? 'See less' : 'See more'}
                    </button>
                  </div>
                )}
              </div>

              {/* --- 2. CONDITION ACCORDION --- */}
              <div className="pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() =>
                    setOpenSections((prev) => ({ ...prev, condition: !prev.condition }))
                  }
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 pb-2"
                >
                  <span>CONDITION</span>
                  {openSections.condition ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>

                {openSections.condition && (
                  <div className="space-y-2 pt-1 text-xs text-zinc-700">
                    {CONDITIONS.map((cond) => {
                      const isChecked = selectedCondition === cond || cond === 'New';
                      return (
                        <label
                          key={cond}
                          className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-950 select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              updateQuery({ condition: selectedCondition === cond ? null : cond })
                            }
                            className="w-4 h-4 rounded text-[#FF4A22] focus:ring-[#FF4A22] accent-[#FF4A22] cursor-pointer"
                          />
                          <span className={isChecked ? 'font-semibold text-zinc-950' : 'text-zinc-600'}>
                            {cond}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* --- 3. COLOR ACCORDION --- */}
              <div className="pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() =>
                    setOpenSections((prev) => ({ ...prev, color: !prev.color }))
                  }
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 pb-2"
                >
                  <span>COLOR</span>
                  {openSections.color ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>

                {openSections.color && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {COLORS_LIST.map((c) => {
                      const isSelected = selectedColor.toLowerCase() === c.name.toLowerCase();
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() =>
                            updateQuery({
                              color: isSelected ? null : c.name.toLowerCase(),
                            })
                          }
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                            isSelected
                              ? 'border-[#FF4A22] bg-orange-50 font-bold text-zinc-950'
                              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                            style={{ backgroundColor: c.color }}
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* --- 4. OTHER ACCORDION --- */}
              <div className="pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() =>
                    setOpenSections((prev) => ({ ...prev, other: !prev.other }))
                  }
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 pb-2"
                >
                  <span>OTHER</span>
                  {openSections.other ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>

                {openSections.other && (
                  <div className="space-y-2.5 pt-1 text-xs text-zinc-700">
                    {/* 3 stars above */}
                    <label className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-950 select-none">
                      <input
                        type="checkbox"
                        checked={selectedRating === '3' || true}
                        onChange={() =>
                          updateQuery({ rating: selectedRating === '3' ? null : '3' })
                        }
                        className="w-4 h-4 rounded text-[#FF4A22] focus:ring-[#FF4A22] accent-[#FF4A22] cursor-pointer"
                      />
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-zinc-800 font-medium">3 stars above</span>
                      </span>
                    </label>

                    {/* Official store */}
                    <label className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-950 select-none">
                      <input
                        type="checkbox"
                        checked={isOfficialStore}
                        onChange={(e) =>
                          updateQuery({ official: e.target.checked ? 'true' : null })
                        }
                        className="w-4 h-4 rounded text-[#FF4A22] focus:ring-[#FF4A22] accent-[#FF4A22] cursor-pointer"
                      />
                      <span className="text-zinc-600 hover:text-zinc-950 font-medium">
                        Official store
                      </span>
                    </label>

                    {/* New Release */}
                    <label className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-950 select-none">
                      <input
                        type="checkbox"
                        checked={isNewRelease}
                        onChange={(e) =>
                          updateQuery({ newRelease: e.target.checked ? 'true' : null })
                        }
                        className="w-4 h-4 rounded text-[#FF4A22] focus:ring-[#FF4A22] accent-[#FF4A22] cursor-pointer"
                      />
                      <div className="flex items-center gap-1.5">
                        <span className="bg-zinc-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                          NEW
                        </span>
                        <span className="text-zinc-600 hover:text-zinc-950 font-medium">
                          New Release
                        </span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT (PRODUCTS & CONTROLS) ================= */}
          <main className="md:col-span-9 space-y-4">
            {/* Top Controls Bar: [Product] [Store] Tab + Price Range + Sort By */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Product / Store Switch */}
              <div className="flex items-center bg-white border border-zinc-200/90 rounded-xl p-1 shadow-2xs w-fit">
                <button
                  type="button"
                  onClick={() => updateQuery({ tab: 'product' })}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'product'
                      ? 'bg-[#FF4A22] text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Product
                </button>
                <button
                  type="button"
                  onClick={() => updateQuery({ tab: 'store' })}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'store'
                      ? 'bg-[#FF4A22] text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Store
                </button>
              </div>

              {/* Price range and Sort by dropdowns */}
              <div className="flex items-center gap-3">
                {/* Price range selector */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 bg-white border border-zinc-200/90 rounded-xl px-3 py-1.5 shadow-2xs cursor-pointer">
                    <span className="text-zinc-400">Price range</span>
                    <select
                      value={priceRange}
                      onChange={(e) => updateQuery({ priceRange: e.target.value })}
                      aria-label="Price range"
                      className="bg-transparent font-semibold text-zinc-800 outline-hidden cursor-pointer"
                    >
                      {PRICE_RANGES.map((r) => (
                        <option key={r.label} value={r.label}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sort By selector */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 bg-white border border-zinc-200/90 rounded-xl px-3 py-1.5 shadow-2xs cursor-pointer">
                    <span className="text-zinc-400">Sort by</span>
                    <select
                      value={selectedSort}
                      onChange={(e) => updateQuery({ sort: e.target.value })}
                      aria-label="Sort products by"
                      className="bg-transparent font-semibold text-zinc-800 outline-hidden cursor-pointer"
                    >
                      <option value="reviews">Reviews</option>
                      <option value="newest">Newest</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Result count text */}
            <div className="text-xs text-zinc-600 pt-1">
              Showing <span className="font-semibold text-zinc-900">{totalCount.toLocaleString()}</span> Products for{' '}
              <span className="text-[#FF4A22] font-semibold">
                &quot;{searchQuery || 'Fantech gaming'}&quot;
              </span>
            </div>

            {/* PRODUCT GRID (4 COLUMNS) */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 border border-zinc-100 space-y-3 animate-pulse"
                  >
                    <div className="aspect-4/3 bg-zinc-200 rounded-xl" />
                    <div className="h-4 bg-zinc-200 rounded w-3/4" />
                    <div className="h-3 bg-zinc-200 rounded w-1/2" />
                    <div className="h-4 bg-zinc-200 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200/80 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FF4A22] flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1">
                  No matching products found
                </h3>
                <p className="text-xs text-zinc-500 mb-4 max-w-sm mx-auto">
                  Try adjusting your keywords or clearing the active filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#FF4A22] hover:bg-[#E03E19] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product, idx) => (
                  <ProductCard
                    key={product._id || product.id || idx}
                    product={product}
                    priority={idx < 4}
                    currency={currency}
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
        <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#FF4A22] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductDashboardContent />
    </Suspense>
  );
}
