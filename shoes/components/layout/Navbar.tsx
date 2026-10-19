'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Package,
  MapPin,
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
          { name: 'Nike Flight Court', href: '/products?category=flight' },
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
  Sale: {
    title: 'Sale',
    columns: [
      {
        heading: 'Shoes on Sale',
        links: [
          { name: 'All Sale Shoes', href: '/products?sale=true&category=shoes' },
          { name: 'Men\'s Sale Shoes', href: '/products?sale=true&gender=men' },
          { name: 'Women\'s Sale Shoes', href: '/products?sale=true&gender=women' },
          { name: 'Kids\' Sale Shoes', href: '/products?sale=true&gender=kids' },
        ],
      },
      {
        heading: 'Clothing on Sale',
        links: [
          { name: 'All Sale Clothing', href: '/products?sale=true&category=clothing' },
          { name: 'Men\'s Sale Tops', href: '/products?sale=true&gender=men&search=Tee' },
          { name: 'Women\'s Sale Leggings', href: '/products?sale=true&gender=women&search=Leggings' },
        ],
      },
    ],
    featured: [
      {
        title: 'Up to 40% Off Running Gear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        href: '/products?sale=true&sport=running',
        tag: 'Up to 40% Off',
      },
    ],
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { totalCartItems, wishlist, setIsCartDrawerOpen, user, logout, openAuthModal } = useCartWishlist();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActiveMenu(null);
      setIsUserMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white">
        {/* Top Micro Utility Bar — Nike style */}
        <div className="bg-white border-b border-zinc-100 px-6 py-2 hidden md:block text-[12px] text-zinc-700">
          <div className="max-w-7xl mx-auto flex justify-end items-center gap-4">
            <Link href="/stores" className="hover:underline transition-colors flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-zinc-500" />
              <span>Find a Store & Vendors</span>
            </Link>
            <span className="text-zinc-300 select-none">|</span>
            <Link href="/help" className="hover:underline transition-colors">Help</Link>
            <span className="text-zinc-300 select-none">|</span>
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <span>Hi, <strong className="font-semibold">{user.name || user.email.split('@')[0]}</strong></span>
                  {user.role === 'ADMIN' && (
                    <a
                      href="/admin"
                      className="inline-flex items-center gap-1 bg-zinc-900 text-white text-[10px] px-2 py-0.5 rounded font-bold hover:bg-zinc-700"
                    >
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </a>
                  )}
                </div>
                <span className="text-zinc-300 select-none">|</span>
                <button
                  onClick={logout}
                  className="hover:underline transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a href="/register" className="hover:underline transition-colors font-medium">Join Us</a>
                <span className="text-zinc-300 select-none">|</span>
                <a href="/login" className="hover:underline transition-colors font-medium">Sign In</a>
              </>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between border-b border-zinc-100">
          {/* Nike Swoosh Logo — left */}
          <Logo size="md" />

          {/* Desktop Navigation Links — center */}
          <nav className="hidden lg:flex items-center gap-8 h-full" onMouseLeave={() => setActiveMenu(null)}>
            {Object.keys(MEGA_MENUS).map((item) => (
              <div
                key={item}
                className="h-full flex items-center relative"
                onMouseEnter={() => setActiveMenu(item)}
              >
                <a
                  href={
                    item === 'Sale'
                      ? '/products?sale=true'
                      : item === 'New & Featured'
                      ? '/products?sort=newest'
                      : `/products?gender=${item.toLowerCase()}`
                  }
                  className={`text-[15px] font-medium tracking-normal transition-colors py-2 relative text-zinc-900 hover:text-black ${
                    activeMenu === item ? 'font-semibold' : ''
                  }`}
                >
                  {item}
                  {activeMenu === item && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 rounded-full" />
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 px-3 py-2 rounded-full text-zinc-700 hover:text-zinc-900 transition-all text-sm font-medium cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-sm pr-1">Search</span>
            </button>

            {/* Wishlist */}
            <a
              href="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
              title="Favourites"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-[14px] h-[14px] bg-zinc-950 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
              title="Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 w-[14px] h-[14px] bg-zinc-950 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Account */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2.5 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
                title="Account"
              >
                <UserIcon className="w-5 h-5" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-zinc-100 py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-zinc-100">
                        <p className="text-xs text-zinc-400 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-zinc-900 truncate mt-0.5">{user.name || user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                          {user.role}
                        </span>
                      </div>
                      <a
                        href="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-zinc-700 hover:bg-zinc-50"
                      >
                        <UserIcon className="w-4 h-4" /> My Profile
                      </a>
                      <a
                        href="/account/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-zinc-700 hover:bg-zinc-50"
                      >
                        <Package className="w-4 h-4" /> Orders & Tracking
                      </a>
                      {user.role === 'ADMIN' && (
                        <a
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50"
                        >
                          <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                        </a>
                      )}
                      <div className="border-t border-zinc-100 mt-1 pt-1">
                        <button
                          onClick={() => { setIsUserMenuOpen(false); logout(); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 space-y-2">
                      <button
                        onClick={() => { setIsUserMenuOpen(false); openAuthModal(); }}
                        className="block w-full py-3 bg-zinc-950 text-white text-center rounded-full text-[13px] font-bold hover:bg-zinc-700 transition-colors cursor-pointer"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => { setIsUserMenuOpen(false); openAuthModal(); }}
                        className="block w-full py-2.5 border border-zinc-300 text-zinc-900 text-center rounded-full text-[13px] font-medium hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        Join Us
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-full hover:bg-zinc-100 text-zinc-800"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMenu && MEGA_MENUS[activeMenu] && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-lg"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-8">
              <div className="col-span-8 grid grid-cols-3 gap-8">
                {MEGA_MENUS[activeMenu].columns.map((col, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                      {col.heading}
                    </h4>
                    <ul className="space-y-2.5">
                      {col.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <a
                            href={link.href}
                            onClick={() => setActiveMenu(null)}
                            className="text-[14px] text-zinc-800 hover:text-black font-medium block transition-colors"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Visual Tiles */}
              <div className="col-span-4 grid grid-cols-2 gap-4 border-l border-zinc-100 pl-8">
                {MEGA_MENUS[activeMenu].featured.map((card, fIdx) => (
                  <a
                    key={fIdx}
                    href={card.href}
                    onClick={() => setActiveMenu(null)}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] bg-zinc-100 rounded-lg overflow-hidden mb-2">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-zinc-900">
                        {card.tag}
                      </span>
                    </div>
                    <p className="text-[13px] font-bold text-zinc-900 group-hover:underline line-clamp-1">
                      {card.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-Out Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <Logo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {Object.entries(MEGA_MENUS).map(([category, data]) => {
                const isExpanded = mobileExpanded === category;
                return (
                  <div key={category} className="border-b border-zinc-100">
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : category)}
                      className="w-full flex items-center justify-between px-5 py-4 text-[15px] font-medium text-zinc-900 text-left"
                    >
                      <span>{category}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-zinc-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-4 space-y-2.5">
                        {data.columns.flatMap((c) => c.links).map((link, idx) => (
                          <a
                            key={idx}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm text-zinc-600 hover:text-zinc-900 py-0.5"
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="px-5 py-4 space-y-3 border-b border-zinc-100">
                <Link href="/stores" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[15px] font-medium text-zinc-800">
                  <MapPin className="w-4 h-4 text-zinc-500" /> Find Stores & Vendors
                </Link>
                <a href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[15px] font-medium text-zinc-800">
                  <Heart className="w-4 h-4" /> Favourites ({wishlist.length})
                </a>
                <a href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[15px] font-medium text-zinc-800">
                  <ShoppingBag className="w-4 h-4" /> Bag ({totalCartItems})
                </a>
                <a href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[15px] font-medium text-zinc-800">
                  <UserIcon className="w-4 h-4" /> My Account
                </a>
              </div>
            </div>

            <div className="p-5 border-t border-zinc-100">
              {user ? (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                  className="w-full py-3.5 bg-zinc-950 text-white rounded-full text-sm font-bold uppercase tracking-wider"
                >
                  Sign Out
                </button>
              ) : (
                <div className="space-y-2.5">
                  <a
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3.5 bg-zinc-950 text-white text-center rounded-full text-sm font-bold"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3 border border-zinc-300 text-zinc-900 text-center rounded-full text-sm font-medium hover:bg-zinc-100"
                  >
                    Join Us
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
