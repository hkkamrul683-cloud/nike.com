'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
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
  };
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useCartWishlist();
  const productId = product._id?.toString() || product.id || product.slug;
  const isFavorite = isInWishlist(productId);

  const discountPercent =
    product.salePrice && product.salePrice < product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images?.[0] || '/placeholder.png',
      subtitle: product.subtitle,
      category: product.categorySlug,
    });
  };

  return (
    <div className="group relative flex flex-col">
      {/* Image Container with Zoom Effect */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full bg-zinc-100 rounded-xl overflow-hidden block"
      >
        <Image
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && !product.badge && (
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              {discountPercent}% Off
            </span>
          )}
          {product.isNew && !product.badge && discountPercent === 0 && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              Just In
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs text-zinc-700 hover:text-red-600 transition-all shadow-xs z-10"
          title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-red-600 text-red-600' : 'text-zinc-700'
            }`}
          />
        </button>
      </Link>

      {/* Product Details */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Colors count */}
        {product.colors && product.colors.length > 0 && (
          <p className="text-[11px] font-semibold text-zinc-500 mb-0.5">
            {product.colors.length} {product.colors.length === 1 ? 'Colour' : 'Colours'}
          </p>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-bold text-zinc-950 hover:underline line-clamp-1"
        >
          {product.name}
        </Link>

        {product.subtitle && (
          <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-2">
          {product.salePrice && product.salePrice > 0 ? (
            <>
              <span className="text-sm font-bold text-red-600">
                ${product.salePrice.toFixed(2)}
              </span>
              <span className="text-xs text-zinc-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-zinc-950">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
