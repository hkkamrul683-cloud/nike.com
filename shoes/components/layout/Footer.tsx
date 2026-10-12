'use client';

import Link from 'next/link';
import { MapPin, Globe } from 'lucide-react';
import Logo from '@/components/brand/Logo';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid of Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-14 border-b border-zinc-800">
          {/* Column 1: Core Navigation (Bold) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Featured
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/products?sort=newest" className="hover:text-white transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/products?bestseller=true" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/products/sportix-air-infinity-pro" className="hover:text-white transition-colors">
                  Air Infinity Pro
                </Link>
              </li>
              <li>
                <Link href="/products?category=flight" className="hover:text-white transition-colors">
                  SPORTIX Flight
                </Link>
              </li>
              <li>
                <Link href="/products?sale=true" className="hover:text-white transition-colors">
                  Sale & Clearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Shoes */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Shoes
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/products?category=shoes" className="hover:text-white transition-colors">
                  All Shoes
                </Link>
              </li>
              <li>
                <Link href="/products?sport=running" className="hover:text-white transition-colors">
                  Running Shoes
                </Link>
              </li>
              <li>
                <Link href="/products?sport=basketball" className="hover:text-white transition-colors">
                  Basketball Shoes
                </Link>
              </li>
              <li>
                <Link href="/products?sport=training" className="hover:text-white transition-colors">
                  Gym & Training
                </Link>
              </li>
              <li>
                <Link href="/products?sport=lifestyle" className="hover:text-white transition-colors">
                  Lifestyle Sneakers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Clothing */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Clothing
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/products?category=clothing" className="hover:text-white transition-colors">
                  All Clothing
                </Link>
              </li>
              <li>
                <Link href="/products?search=Hoodie" className="hover:text-white transition-colors">
                  Hoodies & Sweats
                </Link>
              </li>
              <li>
                <Link href="/products?search=Jacket" className="hover:text-white transition-colors">
                  Jackets & Vests
                </Link>
              </li>
              <li>
                <Link href="/products?search=Tee" className="hover:text-white transition-colors">
                  Tops & T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?search=Leggings" className="hover:text-white transition-colors">
                  Pants & Leggings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kids */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Kids
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/products?gender=kids" className="hover:text-white transition-colors">
                  All Kids
                </Link>
              </li>
              <li>
                <Link href="/products?gender=kids&sport=running" className="hover:text-white transition-colors">
                  Kids Running Shoes
                </Link>
              </li>
              <li>
                <Link href="/products?gender=kids&sport=basketball" className="hover:text-white transition-colors">
                  Kids Basketball
                </Link>
              </li>
              <li>
                <Link href="/products?gender=kids" className="hover:text-white transition-colors">
                  Grade School Gear
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Get Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Get Help
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: About SPORTIX */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              About SPORTIX
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  News & Innovations
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors font-bold text-white">
                  SPORTIX Membership
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Country + Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-white font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>United States</span>
            </div>
            <span>&copy; 2026 SPORTIX, Inc. All Rights Reserved</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/legal" className="hover:text-white transition-colors">
              Guides
            </Link>
            <Link href="/legal" className="hover:text-white transition-colors">
              Terms of Sale
            </Link>
            <Link href="/legal" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/legal" className="hover:text-white transition-colors">
              SPORTIX Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
