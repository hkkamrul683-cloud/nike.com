'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, MapPin, ShoppingCart, Check } from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

export interface ProductCardProps {
  product: {
    _id?: string;
    id?: string;
    name: string;
    slug: string;
    subtitle?: string;
    price: number;
    salePrice?: number | null;
    images: string[];
    colors?: string[];
    colorway?: string;
    badge?: string;
    categorySlug?: string;
    gender?: string;
    sport?: string;
    isNew?: boolean;
    isBestseller?: boolean;
    rating?: number;
    reviewsCount?: number;
    storeName?: string;
    storeLocation?: string;
    soldCount?: number;
  };
  priority?: boolean;
  currency?: 'IDR' | 'USD';
}

export default function ProductCard({
  product,
  priority = false,
  currency = 'IDR',
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart } = useCartWishlist();
  const [added, setAdded] = useState(false);

  const productId = product._id?.toString() || product.id || product.slug;
  const isFavorite = isInWishlist(productId);

  // Deterministic hash helper for consistent mock data if not in DB
  const strHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const seed = strHash(productId);
  const reviewsCount = product.reviewsCount ?? (50 + (seed % 450));
  const soldCount = product.soldCount ?? (120 + (seed % 980));
  const storeLocation = product.storeLocation || (seed % 2 === 0 ? 'Jakarta Center' : 'South Jakarta');
  const storeName = product.storeName || (seed % 3 === 0 ? 'SPORTIX Store' : 'Official Store');

  const discountPercent =
    product.salePrice && product.salePrice < product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : (seed % 4 === 0 ? 15 : seed % 5 === 0 ? 25 : 0);

  // Formatting price to match mockup (e.g. Rp 2.799.999 or $129.99)
  const formatPrice = (val: number) => {
    if (currency === 'IDR') {
      const idrVal = val < 1000 ? Math.round(val * 19500) : val;
      return `Rp ${idrVal.toLocaleString('id-ID')}`;
    }
    return `$${val.toFixed(2)}`;
  };

  const displayPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const originalPrice = product.salePrice && product.salePrice > 0
    ? product.price
    : discountPercent > 0
    ? Math.round(product.price * (1 + discountPercent / 100))
    : null;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      subtitle: product.subtitle,
      category: product.categorySlug,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      color: product.colors?.[0] || 'Default',
      size: 'US 9',
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-2xl p-3 border border-zinc-100 hover:border-zinc-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Box */}
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="relative aspect-4/3 w-full bg-[#f9fafb] rounded-xl overflow-hidden flex items-center justify-center p-3 block"
        >
          <Image
            src={
              product.images?.[0] ||
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
            }
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Wishlist Heart Icon */}
          <button
            onClick={handleFavoriteClick}
            aria-label="Add to wishlist"
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-red-500 transition-all shadow-xs z-10"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-zinc-600'
              }`}
            />
          </button>
        </Link>
      </div>

      {/* Product Information */}
      <div className="pt-2.5 flex flex-col flex-1">
        {/* Title */}
        <Link
          href={`/products/${product.slug}`}
          className="text-xs sm:text-[13px] font-semibold text-zinc-900 group-hover:text-[#FF4A22] transition-colors line-clamp-2 leading-snug min-h-[2.4rem]"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Rating Stars & Reviews */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-zinc-500 font-medium">
            {reviewsCount} Reviews
          </span>
        </div>

        {/* Store Location */}
        <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-1">
          <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
          <span className="truncate">
            {storeName} | {storeLocation}
          </span>
        </div>

        {/* Price & Discounts Row */}
        <div className="mt-2.5 pt-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            {/* Active Price in vibrant Red/Orange */}
            <span className="text-sm sm:text-[15px] font-bold text-[#FF4A22]">
              {formatPrice(displayPrice)}
            </span>

            {/* Discount Badge */}
            {discountPercent > 0 && (
              <span className="bg-zinc-100 text-zinc-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                {discountPercent}%
              </span>
            )}

            {/* Strikethrough Original Price */}
            {originalPrice && (
              <span className="text-[11px] text-zinc-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Sold Count */}
          <div className="text-[11px] text-zinc-400 mt-0.5">
            {soldCount} sold
          </div>
        </div>

        {/* Action Button: Orange Add to Cart */}
        <div className="mt-3">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FF4A22] hover:bg-[#E03E19] text-white shadow-orange-500/20'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
