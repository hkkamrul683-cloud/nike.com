'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, Heart, Plus, Minus, ArrowRight, Tag, Check, ShoppingBag } from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    wishlist,
    toggleWishlist,
    isInWishlist,
  } = useCartWishlist();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    setIsApplying(true);
    setPromoMsg(null);
    const result = await applyCoupon(promoCodeInput.trim());
    setPromoMsg({ text: result.message, success: result.success });
    setIsApplying(false);
    if (result.success) setPromoCodeInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Free Shipping Alert Banner */}
      <div className="bg-zinc-100 p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          {amountToFreeShipping > 0 ? (
            <p className="text-zinc-700 font-medium">
              Add <strong className="text-zinc-950 font-bold">${amountToFreeShipping.toFixed(2)}</strong> more to unlock <strong className="text-red-600 font-bold">Free Standard Delivery</strong>.
            </p>
          ) : (
            <p className="font-bold text-emerald-700 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Congratulations! You unlocked Free Standard Shipping.
            </p>
          )}
        </div>
        <div className="w-full sm:w-48 h-2 bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-950 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Bag Items */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
              Bag
            </h1>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-zinc-50 rounded-3xl p-8">
              <ShoppingBag className="w-12 h-12 text-zinc-400 mx-auto" />
              <h2 className="text-xl font-black uppercase text-zinc-950">There are no items in your bag.</h2>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Explore our latest footwear drops, training apparel, and athletic essentials.
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => {
                const itemUnitPrice =
                  item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
                const isFavorite = isInWishlist(item.productId);

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-5 pb-6 border-b border-zinc-200"
                  >
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-zinc-100 rounded-2xl overflow-hidden shrink-0">
                      <Image
                        src={item.image || '/placeholder.png'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/products/${item.slug}`}
                              className="text-base font-bold text-zinc-950 hover:underline"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-zinc-500 mt-1">
                              Size: <strong className="text-zinc-800 font-semibold">{item.size}</strong> | Color:{' '}
                              <strong className="text-zinc-800 font-semibold">{item.color}</strong>
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-black text-zinc-950">
                              ${(itemUnitPrice * item.quantity).toFixed(2)}
                            </span>
                            {item.quantity > 1 && (
                              <p className="text-[11px] text-zinc-400">
                                (${itemUnitPrice.toFixed(2)} each)
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Actions Bar */}
                      <div className="flex items-center justify-between pt-4 mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-zinc-200 rounded-full overflow-hidden bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-zinc-100 text-zinc-600 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-xs font-bold text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-zinc-100 text-zinc-600 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove / Move to Wishlist */}
                        <div className="flex items-center gap-4 text-xs">
                          <button
                            onClick={() =>
                              toggleWishlist({
                                productId: item.productId,
                                name: item.name,
                                slug: item.slug,
                                price: item.price,
                                salePrice: item.salePrice,
                                image: item.image,
                              })
                            }
                            className={`flex items-center gap-1.5 transition-colors ${
                              isFavorite ? 'text-red-600 font-bold' : 'text-zinc-500 hover:text-zinc-950'
                            }`}
                          >
                            <Heart className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              {isFavorite ? 'Saved' : 'Move to Favorites'}
                            </span>
                          </button>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Summary Order Card */}
        <div className="lg:col-span-4">
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
            <h2 className="text-xl font-black uppercase tracking-tight text-zinc-950">
              Summary
            </h2>

            {/* Promo Code Form */}
            <div>
              {coupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Tag className="w-4 h-4" />
                    <span>{coupon.code} Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-950 font-bold underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Do you have a promo code?"
                    className="flex-1 px-4 py-2.5 text-xs border border-zinc-300 rounded-xl outline-none uppercase font-semibold focus:border-zinc-950 bg-white"
                  />
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-50"
                  >
                    {isApplying ? '...' : 'Apply'}
                  </button>
                </form>
              )}
              {promoMsg && (
                <p className={`text-xs mt-1.5 ${promoMsg.success ? 'text-emerald-600' : 'text-red-500'}`}>
                  {promoMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-zinc-600 border-t border-zinc-200 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-zinc-950">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({coupon?.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery & Handling</span>
                <span className="font-bold text-zinc-950">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-zinc-950 pt-3 border-t border-zinc-200">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => router.push('/checkout')}
                disabled={cart.length === 0}
                className="w-full py-4 bg-zinc-950 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
                By checking out, you agree to SPORTIX Terms of Sale and 30-Day Return Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
