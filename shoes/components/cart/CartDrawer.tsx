'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, Check, ShoppingBag } from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

export default function CartDrawer() {
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
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    totalCartItems,
  } = useCartWishlist();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplying(true);
    setCouponMessage(null);
    const result = await applyCoupon(couponCode.trim());
    setCouponMessage({ text: result.message, success: result.success });
    setIsApplying(false);
    if (result.success) setCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-3 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 className="text-lg font-bold uppercase tracking-tight text-zinc-900">
                Bag ({totalCartItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-100 text-xs">
            {amountToFreeShipping > 0 ? (
              <p className="text-zinc-600 mb-1.5">
                Add <span className="font-bold text-zinc-950">${amountToFreeShipping.toFixed(2)}</span> more to qualify for <span className="font-bold text-red-600">Free Delivery</span>!
              </p>
            ) : (
              <p className="font-bold text-emerald-600 flex items-center gap-1 mb-1.5">
                <Check className="w-4 h-4" /> You unlocked Free Standard Shipping!
              </p>
            )}
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-950 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-zinc-800 mb-1">Your bag is empty.</p>
                <p className="text-xs text-zinc-500 mb-6">
                  Items you add from the store will appear here.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-6 py-3 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-zinc-100">
                  <div className="relative w-20 h-20 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="text-sm font-bold text-zinc-900 hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Size: <span className="font-semibold text-zinc-800">{item.size}</span> | Color: <span className="font-semibold text-zinc-800">{item.color}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-200 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-zinc-100 text-zinc-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-100 text-zinc-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-zinc-950">
                          ${((item.salePrice && item.salePrice > 0 ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 bg-zinc-50 border-t border-zinc-200 space-y-4">
              {/* Promo code box */}
              {coupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Applied: {coupon.code} (-${discountAmount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 font-bold underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (e.g. MOVE20)"
                    className="flex-1 px-3 py-2 text-xs border border-zinc-300 rounded-lg outline-none uppercase font-semibold focus:border-zinc-950"
                  />
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 disabled:opacity-50"
                  >
                    {isApplying ? '...' : 'Apply'}
                  </button>
                </form>
              )}
              {couponMessage && (
                <p className={`text-xs ${couponMessage.success ? 'text-emerald-600' : 'text-red-500'}`}>
                  {couponMessage.text}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-zinc-900">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full block text-center py-2.5 border border-zinc-300 text-zinc-900 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors"
                >
                  View Full Bag
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
