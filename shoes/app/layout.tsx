import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartWishlistProvider } from '@/context/CartWishlistContext';
import PromoBar from '@/components/layout/PromoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import NikeOtpModal from '@/components/auth/NikeOtpModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SPORTIX — Official Store | High Performance Sportswear & Footwear',
  description:
    'Experience the pinnacle of athletic innovation. Shop SPORTIX road running shoes, basketball high-tops, gym essentials, and technical fleece collections.',
  keywords: [
    'SPORTIX',
    'athletic footwear',
    'running shoes',
    'basketball sneakers',
    'sportswear',
    'training shoes',
    'fleece hoodie',
  ],
  openGraph: {
    title: 'SPORTIX — Official Store | High Performance Sportswear',
    description: 'BUILT TO MOVE. Explore new footwear and technical apparel.',
    url: 'https://sportix.com',
    siteName: 'SPORTIX Global Store',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'SPORTIX Air Infinity Pro',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 font-sans selection:bg-zinc-900 selection:text-white">
        <CartWishlistProvider>
          <Navbar />
          <PromoBar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <NikeOtpModal />
        </CartWishlistProvider>
      </body>
    </html>
  );
}
