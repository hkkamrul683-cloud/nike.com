'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Package,
} from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { useCartWishlist } from '@/context/CartWishlistContext';
import SearchModal from '@/components/ui/SearchModal';

interface MegaMenuContent {
  title: string;
  columns: {
    heading: string;
    links: { name: string; href: string }[];
  }[];
  featured: {
    title: string;
    image: string;
    href: string;
    tag: string;
  }[];
}

const MEGA_MENUS: Record<string, MegaMenuContent> = {
  'New & Featured': {
    title: 'New & Featured',
    columns: [
      {
        heading: 'Trending Now',
        links: [
          { name: 'Shop All New Arrivals', href: '/products?sort=newest' },
          { name: 'Best Sellers', href: '/products?bestseller=true' },
          { name: 'Member Exclusives', href: '/products?featured=true' },
          { name: 'Latest Sneaker Drops', href: '/products?category=shoes&sort=newest' },
        ],
      },
      {
        heading: 'Shop Icons',
        links: [
          { name: 'Air Infinity Series', href: '/products?search=Infinity' },
          { name: 'SPORTIX Flight Court', href: '/products?category=flight' },
          { name: 'Metatrack Cross 9', href: '/products?search=Metatrack' },
          { name: 'Club Fleece Essentials', href: '/products?search=Fleece' },
        ],
      },
      {
        heading: 'Popular by Sport',
        links: [
          { name: 'Road Running', href: '/products?sport=running' },
          { name: 'Basketball', href: '/products?sport=basketball' },
          { name: 'Gym & Training', href: '/products?sport=training' },
          { name: 'Football Cleats', href: '/products?sport=football' },
        ],
      },
    ],
    featured: [
      {
        title: 'Built to Move: Air Infinity Pro',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        href: '/products/sportix-air-infinity-pro',
        tag: 'New Release',
      },
      {
        title: 'Flight Retro High: Chicago Heritage',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
        href: '/products/sportix-flight-retro-high',
        tag: 'Trending',
      },
    ],
  },
  Men: {
    title: 'Men',
    columns: [
      {
        heading: 'Shoes',
        links: [
          { name: 'All Men\'s Shoes', href: '/products?gender=men&category=shoes' },
          { name: 'Running Shoes', href: '/products?gender=men&sport=running' },
          { name: 'Basketball Shoes', href: '/products?gender=men&sport=basketball' },
          { name: 'Gym & Training', href: '/products?gender=men&sport=training' },
          { name: 'Lifestyle Sneakers', href: '/products?gender=men&sport=lifestyle' },
        ],
      },
      {
        heading: 'Clothing',
        links: [
          { name: 'All Men\'s Apparel', href: '/products?gender=men&category=clothing' },
          { name: 'Hoodies & Sweatshirts', href: '/products?gender=men&search=Hoodie' },
          { name: 'Jackets & Windrunners', href: '/products?gender=men&search=Jacket' },
          { name: 'Tops & Training Tees', href: '/products?gender=men&search=Tee' },
          { name: 'Pants & Shorts', href: '/products?gender=men&search=Shorts' },
        ],
      },
      {
        heading: 'Shop By Sport',
        links: [
          { name: 'Running', href: '/products?gender=men&sport=running' },
          { name: 'Basketball', href: '/products?gender=men&sport=basketball' },
          { name: 'Football', href: '/products?gender=men&sport=football' },
          { name: 'Training & Gym', href: '/products?gender=men&sport=training' },
        ],
      },
    ],
    featured: [
      {
        title: 'Tech Knit Windrunner',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
        href: '/products/sportix-tech-knit-windrunner-jacket',
        tag: 'Essential Outerwear',
      },
      {
        title: 'Metatrack Cross 9 Gym',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
        href: '/products/sportix-metatrack-cross-9',
        tag: 'Heavy Training',
      },
    ],
  },
  Women: {
    title: 'Women',
    columns: [
      {
        heading: 'Shoes',
        links: [
          { name: 'All Women\'s Shoes', href: '/products?gender=women&category=shoes' },
          { name: 'Running Shoes', href: '/products?gender=women&sport=running' },
          { name: 'Training & Gym', href: '/products?gender=women&sport=training' },
          { name: 'Basketball Shoes', href: '/products?gender=women&sport=basketball' },
          { name: 'Lifestyle Sneakers', href: '/products?gender=women&sport=lifestyle' },
        ],
      },
      {
        heading: 'Clothing',
        links: [
          { name: 'All Women\'s Apparel', href: '/products?gender=women&category=clothing' },
          { name: 'Sports Bras', href: '/products?gender=women&search=Bra' },
          { name: 'Leggings & Tights', href: '/products?gender=women&search=Leggings' },
          { name: 'Hoodies & Crewnecks', href: '/products?gender=women&search=Crewneck' },
          { name: 'Jackets & Vests', href: '/products?gender=women&category=clothing' },
        ],
      },
      {
        heading: 'Featured Collections',
        links: [
          { name: 'Invincible Cushion 3', href: '/products/sportix-invincible-cushion-3' },
          { name: 'High-Support AeroSwift', href: '/products/sportix-aeroswift-high-support-sports-bra' },
          { name: 'One High-Waisted Tight', href: '/products/sportix-one-high-waisted-7-8-leggings' },
          { name: 'Barefoot Free Flex', href: '/products/sportix-free-flex-barefoot-50' },
        ],
      },
    ],
    featured: [
      {
        title: 'Invincible Cushion 3',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
        href: '/products/sportix-invincible-cushion-3',
        tag: 'Pillow Soft',
      },
      {
        title: 'AeroSwift Sports Bra',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
        href: '/products/sportix-aeroswift-high-support-sports-bra',
        tag: 'Zero Distraction',
      },
    ],
  },
  Kids: {
    title: 'Kids',
    columns: [
      {
        heading: 'Shoes',
        links: [
          { name: 'All Kids\' Shoes', href: '/products?gender=kids' },
          { name: 'Running & Playground', href: '/products?gender=kids&sport=running' },
          { name: 'Basketball High-Tops', href: '/products?gender=kids&sport=basketball' },
        ],
      },
      {
        heading: 'Ages & Sizing',
        links: [
          { name: 'Grade School (Sizes 1Y - 7Y)', href: '/products?gender=kids' },
          { name: 'Junior Athletic Gear', href: '/products?gender=kids' },
        ],
      },
    ],
    featured: [
      {
        title: 'Junior Air Flex Runner',
        image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80',
        href: '/products/sportix-junior-air-flex-runner',
        tag: 'School & Recess',
      },
    ],
  },
  'SPORTIX Flight': {
    title: 'SPORTIX Flight',
    columns: [
      {
        heading: 'Court Silhouettes',
        links: [
          { name: 'Shop All Flight', href: '/products?category=flight' },
          { name: 'Flight Retro High', href: '/products/sportix-flight-retro-high' },
          { name: 'Flight Court Elevate', href: '/products/sportix-flight-court-elevate' },
          { name: 'Flight Tearaway Pants', href: '/products/sportix-flight-warmup-tearaway-pants' },
        ],
      },
      {
        heading: 'Heritage & Street',
        links: [
          { name: 'Basketball Headwear & Caps', href: '/products/sportix-flight-heritage-snapback-cap' },
          { name: 'Youth Edition Flight', href: '/products/sportix-flight-youth-edition' },
          { name: 'Elite Crew Cushion Socks', href: '/products/sportix-elite-crew-cushion-socks-3-pack' },
        ],
      },
    ],
    featured: [
      {
        title: 'Flight Retro High Chicago',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
        href: '/products/sportix-flight-retro-high',
        tag: 'Hardwood Royalty',
      },
    ],
  },
};

export default function Navbar() {
  const { totalCartItems, wishlist, isCartDrawerOpen, setIsCartDrawerOpen, user, logout, openAuthModal } = useCartWishlist();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Close menus on route change or scroll
  useEffect(() => {
    const handleScroll = () => {
      setActiveMenu(null);
      setIsUserMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        {/* Top Micro Utility Bar (Nike Style) */}
        <div className="bg-zinc-50 border-b border-zinc-200/80 px-6 py-1.5 hidden md:block text-[12px] text-zinc-900 font-medium">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Wing Logo Mark */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-zinc-800 tracking-wider">SPORTIX GLOBAL</span>
            </div>

            {/* Utility links: Help | Sign Up | Log In */}
            <div className="flex items-center gap-3">
              <Link href="/help" className="hover:text-zinc-600 transition-colors">
                Help
              </Link>
              <span className="text-zinc-900 select-none">|</span>
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <span>Hi, <strong className="text-zinc-950 font-semibold">{user.name || user.email.split('@')[0]}</strong></span>
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="inline-flex items-center gap-1 bg-zinc-900 text-white text-[10px] px-2 py-0.5 rounded font-bold hover:bg-zinc-800"
                      >
                        <ShieldCheck className="w-3 h-3" /> Admin
                      </Link>
                    )}
                  </div>
                  <span className="text-zinc-900 select-none">|</span>
                  <button
                    onClick={logout}
                    className="hover:text-zinc-600 transition-colors cursor-pointer"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="hover:text-zinc-600 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                  <span className="text-zinc-900 select-none">|</span>
                  <Link
                    href="/login"
                    className="hover:text-zinc-600 transition-colors font-medium"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 h-full">
            {Object.keys(MEGA_MENUS).map((item) => (
              <div
                key={item}
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu(item)}
              >
                <Link
                  href={
                    item === 'SPORTIX Flight'
                      ? '/products?category=flight'
                      : `/products?gender=${item.toLowerCase()}`
                  }
                  className="text-sm font-semibold tracking-tight transition-colors py-2 relative text-zinc-900 hover:text-black"
                >
                  {item}
                  {activeMenu === item && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950" />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Pill Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200/80 px-3 py-2 rounded-full text-zinc-500 hover:text-zinc-900 transition-all text-xs font-medium cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4 text-zinc-700" />
              <span className="hidden sm:inline pr-2">Search</span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-zinc-950 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2.5 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
                title="Account"
              >
                <UserIcon className="w-5 h-5" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-zinc-200 py-2 z-50 animate-fadeIn">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-zinc-100">
                        <p className="text-xs text-zinc-500 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-zinc-900 truncate">{user.name || user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                          {user.role}
                        </span>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                      >
                        <UserIcon className="w-4 h-4" /> My Profile
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                      >
                        <Package className="w-4 h-4" /> Orders & Tracking
                      </Link>
                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50"
                        >
                          <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-zinc-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 text-left"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 space-y-2">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          openAuthModal();
                        }}
                        className="block w-full py-2.5 bg-zinc-950 text-white text-center rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          openAuthModal();
                        }}
                        className="block w-full py-2 border border-zinc-300 text-zinc-900 text-center rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        Join SPORTIX Club
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-zinc-100 text-zinc-800"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Expandable Mega Menu Dropdown */}
        {activeMenu && MEGA_MENUS[activeMenu] && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-xl animate-fadeIn"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
              {/* Columns */}
              <div className="col-span-8 grid grid-cols-3 gap-6">
                {MEGA_MENUS[activeMenu].columns.map((col, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                      {col.heading}
                    </h4>
                    <ul className="space-y-2">
                      {col.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <Link
                            href={link.href}
                            onClick={() => setActiveMenu(null)}
                            className="text-xs text-zinc-600 hover:text-zinc-950 hover:underline font-medium block py-0.5 transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Visual Tiles */}
              <div className="col-span-4 grid grid-cols-2 gap-4 border-l border-zinc-100 pl-8">
                {MEGA_MENUS[activeMenu].featured.map((card, fIdx) => (
                  <Link
                    key={fIdx}
                    href={card.href}
                    onClick={() => setActiveMenu(null)}
                    className="group block"
                  >
                    <div className="relative aspect-4/5 bg-zinc-100 rounded-xl overflow-hidden mb-2">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-zinc-900">
                        {card.tag}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-zinc-900 group-hover:underline line-clamp-1">
                      {card.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-Out Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col animate-slideIn">
            <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
              <Logo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {Object.entries(MEGA_MENUS).map(([category, data]) => {
                const isExpanded = mobileExpanded === category;
                return (
                  <div key={category} className="border-b border-zinc-100 pb-3">
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : category)}
                      className="w-full flex items-center justify-between text-base font-bold text-zinc-900 text-left py-1"
                    >
                      <span>{category}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-zinc-400 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 pl-3 space-y-3">
                        {data.columns.flatMap((c) => c.links).map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs font-medium text-zinc-600 hover:text-zinc-950 py-1"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 space-y-3">
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold text-zinc-800"
                >
                  <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold text-zinc-800"
                >
                  <ShoppingBag className="w-4 h-4" /> Bag ({totalCartItems})
                </Link>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold text-zinc-800"
                >
                  <UserIcon className="w-4 h-4" /> My Account
                </Link>
              </div>
            </div>

            <div className="p-5 border-t border-zinc-200 bg-zinc-50">
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-3 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Sign Out
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3 bg-zinc-950 text-white text-center rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-zinc-800 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-2.5 border border-zinc-300 text-zinc-900 text-center rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-zinc-100 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
