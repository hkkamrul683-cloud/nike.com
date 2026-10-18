'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check } from 'lucide-react';
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
  };
  priority?: boolean;
  currency?: 'USD' | 'IDR';
}

export default function ProductCard({
  product,
  priority = false,
  currency = 'USD',
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart } = useCartWishlist();
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const productId = product._id?.toString() || product.id || product.slug;
  const isFavorite = isInWishlist(productId);

  const displayPrice =
    product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const originalPrice =
    product.salePrice && product.salePrice > 0 ? product.price : null;

  const formatPrice = (val: number) => {
    if (currency === 'IDR') {
      const idrVal = val < 1000 ? Math.round(val * 19500) : val;
      return `Rp ${idrVal.toLocaleString('id-ID')}`;
    }
    // Nike USD format: integers without .00, decimals with .99
    return Number.isInteger(val) ? `$${val}` : `$${val.toFixed(2)}`;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice,
      image:
        product.images?.[0] ||
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
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
      image:
        product.images?.[0] ||
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      color: product.colors?.[0] || 'Default',
      size: 'US 9',
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const colorsCount = product.colors?.length || 1;
  const colorCountText = colorsCount === 1 ? '1 Colour' : `${colorsCount} Colours`;

  // Determine badge text
  const badgeText =
    product.badge ||
    (product.salePrice && product.salePrice < product.price
      ? 'Sale'
      : product.isBestseller
      ? 'Best Seller'
      : product.isNew
      ? 'Just In'
      : null);

  return (
    <div
      className="group relative flex flex-col justify-between w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#f6f6f6] overflow-hidden rounded-md">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={
              (isHovered && product.images?.[1]) ||
              product.images?.[0] ||
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
            }
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Wishlist Button (Nike Minimalist Pill) */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-900 transition-all shadow-xs z-10 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-600 text-red-600' : 'text-zinc-900'
            }`}
          />
        </button>

        {/* Quick Add To Bag Pill on Hover */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-3 right-3 p-2.5 rounded-full shadow-md transition-all duration-300 z-10 flex items-center gap-1.5 ${
            added
              ? 'bg-emerald-600 text-white opacity-100 scale-100'
              : 'bg-zinc-950 text-white hover:bg-zinc-800 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
          }`}
          title="Add to Bag"
        >
          {added ? (
            <Check className="w-4 h-4" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Product Details (Nike Authentic Layout) */}
      <div className="pt-3 pb-1 flex flex-col">
        {/* Badge / Tagline */}
        {badgeText && (
          <span
            className={`text-[13px] font-bold tracking-tight mb-0.5 ${
              badgeText === 'Sale'
                ? 'text-red-600'
                : badgeText === 'Best Seller'
                ? 'text-[#9e3500]'
                : 'text-zinc-900'
            }`}
          >
            {badgeText}
          </span>
        )}

        {/* Product Title */}
        <Link
          href={`/products/${product.slug}`}
          className="text-[15px] font-medium text-zinc-900 hover:text-zinc-600 transition-colors line-clamp-1"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Subtitle / Category */}
        <p className="text-[14px] text-zinc-500 font-normal line-clamp-1 mt-0.5">
          {product.subtitle ||
            `${product.gender ? product.gender.charAt(0).toUpperCase() + product.gender.slice(1) + "'s " : ''}${
              product.sport ? product.sport.charAt(0).toUpperCase() + product.sport.slice(1) + ' ' : ''
            }Shoes`}
        </p>

        {/* Color count */}
        <p className="text-[14px] text-zinc-500 font-normal mt-0.5">
          {colorCountText}
        </p>

        {/* Price Row */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[15px] font-medium text-zinc-900">
            {formatPrice(displayPrice)}
          </span>
          {originalPrice && (
            <span className="text-[14px] text-zinc-400 line-through font-normal">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
