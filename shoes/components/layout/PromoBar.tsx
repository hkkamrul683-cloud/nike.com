'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PromoBar() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState('Free Delivery & Returns on All HypeKicks Member Orders. Step Into the Future →');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) {
          if (data.settings.heroAnnouncement) {
            setAnnouncement(data.settings.heroAnnouncement);
          }
          if (typeof data.settings.heroAnnouncementActive === 'boolean') {
            setIsActive(data.settings.heroAnnouncementActive);
          }
        }
      })
      .catch(() => {});
  }, []);

  if (pathname?.startsWith('/admin') || !isActive) {
    return null;
  }

  return (
    <aside
      aria-label="Promotional banner"
      className="bg-[#f5f5f5] border-b border-zinc-200 py-2.5 px-4 text-center transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <p className="text-xs sm:text-[13px] font-medium text-zinc-900 tracking-tight">
          {announcement}
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-zinc-900">
          <Link
            href="/register"
            className="underline underline-offset-2 hover:text-zinc-500 transition-colors"
          >
            Join Us
          </Link>
          <Link
            href="/help"
            className="underline underline-offset-2 hover:text-zinc-500 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </aside>
  );
}
