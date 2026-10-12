'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCartWishlist();

  const handleMoveToBag = (item: any) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      salePrice: item.salePrice,
      image: item.image,
      color: 'Standard',
      size: 'US 9',
      quantity: 1,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
            Favorites ({wishlist.length})
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Items saved for your next training session or footwear upgrade.
          </p>
        </div>

        {wishlist.length > 0 && (
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline"
          >
            Continue Browsing
          </Link>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-24 bg-zinc-50 rounded-3xl p-8 space-y-4">
          <Heart className="w-12 h-12 text-zinc-400 mx-auto" />
          <h2 className="text-xl font-black uppercase text-zinc-950">
            You don&apos;t have any favorites yet.
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Browse our footwear, apparel, and athletic collections and tap the heart icon on any product to save it here.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.productId}
              className="group relative flex flex-col bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400 transition-all shadow-xs"
            >
              {/* Product Image */}
              <Link
                href={`/products/${item.slug}`}
                className="relative aspect-square w-full bg-zinc-100 overflow-hidden block"
              >
                <Image
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(item);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-red-600 transition-colors shadow-xs"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </Link>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-xs sm:text-sm font-bold text-zinc-950 hover:underline line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{item.subtitle}</p>
                  <div className="mt-2">
                    {item.salePrice && item.salePrice > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-red-600">
                          ${item.salePrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-zinc-400 line-through">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-black text-zinc-950">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-zinc-100">
                  <button
                    onClick={() => handleMoveToBag(item)}
                    className="w-full py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
