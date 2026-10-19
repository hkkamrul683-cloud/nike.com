'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin } from 'lucide-react';
import Logo from '@/components/brand/Logo';

const FOOTER_LINKS = [
  {
    heading: 'Resources',
    links: [
      { name: 'Find a Store & Vendors', href: '/stores' },
      { name: 'Become a Member', href: '/register' },
      { name: 'HypeKicks Journal', href: '/about' },
      { name: 'Gift Cards', href: '/help' },
      { name: 'Site Feedback', href: '/help' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { name: 'Get Help', href: '/help' },
      { name: 'Order Status', href: '/account/orders' },
      { name: 'Shipping & Delivery', href: '/help' },
      { name: 'Returns', href: '/help' },
      { name: 'Payment Options', href: '/help' },
      { name: 'Contact Us', href: '/help' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { name: 'About HypeKicks', href: '/about' },
      { name: 'News', href: '/about' },
      { name: 'Careers', href: '/about' },
      { name: 'Investors', href: '/about' },
      { name: 'Sustainability', href: '/about' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pb-12 border-b border-zinc-800">
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white hover:text-zinc-300 transition-colors font-normal"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-[12px] text-zinc-500">
          {/* Left — logo + location + copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Logo size="sm" whiteOnly />
            <div className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-medium text-white">Global</span>
            </div>
            <span>&copy; 2026 HypeKicks, Inc. All Rights Reserved</span>
          </div>

          {/* Right — legal links */}
          <div className="flex flex-wrap items-center gap-5">
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
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
