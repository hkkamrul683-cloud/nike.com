import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartWishlistProvider } from '@/context/CartWishlistContext';
import PromoBar from '@/components/layout/PromoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import NikeOtpModal from '@/components/auth/NikeOtpModal';
import AnalyticsScripts from '@/components/analytics/AnalyticsScripts';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HypeKicks — Step Into the Future',
  description:
    'Find your perfect pair. Shop HypeKicks sneakers, running shoes, clothing, and streetwear drops. Free delivery and returns for HypeKicks Members.',
  keywords: [
    'HypeKicks',
    'Step Into the Future',
    'sneakers',
    'running shoes',
    'basketball sneakers',
    'streetwear',
    'Air Infinity',
    'Flight Retro',
    'footwear',
  ],
  openGraph: {
    title: 'HypeKicks — Step Into the Future',
    description: 'Shop HypeKicks sneakers, clothing and accessories. Free delivery for HypeKicks Members.',
    url: 'https://www.hypekicks.com',
    siteName: 'HypeKicks',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'HypeKicks — Step Into the Future',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <AnalyticsScripts />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-950 font-sans selection:bg-zinc-900 selection:text-white">
        {gtmId && gtmId.startsWith('GTM-') && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <CartWishlistProvider>
          <PromoBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <NikeOtpModal />
        </CartWishlistProvider>
      </body>
    </html>
  );
}
