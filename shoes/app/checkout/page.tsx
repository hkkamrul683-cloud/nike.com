'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  CreditCard,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Smartphone,
  Banknote,
} from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discountAmount,
    coupon,
    clearCart,
    user,
  } = useCartWishlist();

  // Multi-step form state
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'DIGITAL_WALLET' | 'CASH_ON_DELIVERY'>('CREDIT_CARD');

  // Address fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  // Card fields
  const [cardData, setCardData] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardHolder: '',
    expiry: '12/28',
    cvv: '123',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        addressLine1: user.addresses?.[0]?.addressLine1 || prev.addressLine1,
        addressLine2: user.addresses?.[0]?.addressLine2 || prev.addressLine2,
        city: user.addresses?.[0]?.city || prev.city,
        state: user.addresses?.[0]?.state || prev.state,
        postalCode: user.addresses?.[0]?.postalCode || prev.postalCode,
      }));
    }
  }, [user]);

  // Shipping calculation based on choice
  const standardShipping = subtotal > 150 ? 0 : 12.00;
  const shippingFee = shippingMethod === 'express' ? standardShipping + 15.00 : standardShipping;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cart.length === 0) {
      setErrorMessage('Your shopping bag is empty.');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.addressLine1 || !formData.city || !formData.postalCode) {
      setErrorMessage('Please complete all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        items: cart,
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod,
        couponCode: coupon?.code,
        customerEmail: formData.email,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        shippingMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order.');
      }

      // Clear the local shopping bag
      clearCart();

      // Redirect to confirmation page
      router.push(`/order-confirmation/${data.orderId || data.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Checkout Security Bar */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
            Secure Checkout
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            256-Bit SSL Encrypted Payment & Guaranteed Fulfillment
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Encrypted Checkout</span>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Checkout Multi-Steps */}
        <div className="lg:col-span-7 space-y-10">
          {/* Step 1: Delivery Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-zinc-950 pb-2 border-b border-zinc-200">
              <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>Delivery Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Michael Jordan"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Mobile Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="123 Performance Way"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Apt 4B"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Portland"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="OR"
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="97205"
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-zinc-950 pb-2 border-b border-zinc-200">
              <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>Delivery Method</span>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-zinc-950 bg-zinc-50 shadow-xs'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="w-4 h-4 text-zinc-950"
                  />
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Standard Ground Delivery</p>
                    <p className="text-[11px] text-zinc-500">Delivers in 2-4 business days</p>
                  </div>
                </div>
                <span className="text-xs font-black text-zinc-900">
                  {standardShipping === 0 ? 'FREE' : `$${standardShipping.toFixed(2)}`}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-zinc-950 bg-zinc-50 shadow-xs'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="w-4 h-4 text-zinc-950"
                  />
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Express Priority Air</p>
                    <p className="text-[11px] text-zinc-500">Guaranteed next-day dispatch & priority courier</p>
                  </div>
                </div>
                <span className="text-xs font-black text-zinc-900">
                  ${(standardShipping + 15.00).toFixed(2)}
                </span>
              </label>
            </div>
          </div>

          {/* Step 3: Verified Payment Gateway */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-zinc-950 pb-2 border-b border-zinc-200">
              <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs">
                3
              </span>
              <span>Payment Method</span>
            </div>

            {/* Payment Method Selectors */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('CREDIT_CARD')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'CREDIT_CARD'
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('DIGITAL_WALLET')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'DIGITAL_WALLET'
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase">Apple / Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'CASH_ON_DELIVERY'
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase">Pay on Delivery</span>
              </button>
            </div>

            {/* Credit Card Form Inputs */}
            {paymentMethod === 'CREDIT_CARD' && (
              <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-4 text-xs">
                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950 bg-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold uppercase text-zinc-700 block mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      required
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold uppercase text-zinc-700 block mb-1">
                      CVV Security Code
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'DIGITAL_WALLET' && (
              <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-zinc-600 text-center space-y-1">
                <p className="font-bold text-zinc-900">Instant Express Checkout</p>
                <p>Your connected biometric device wallet will authorize upon placing order.</p>
              </div>
            )}

            {paymentMethod === 'CASH_ON_DELIVERY' && (
              <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-zinc-600 text-center space-y-1">
                <p className="font-bold text-zinc-900">Pay Upon Courier Handover</p>
                <p>Ensure correct cash or mobile contactless card is ready upon delivery.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Authoritative Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
            <h2 className="text-xl font-black uppercase tracking-tight text-zinc-950">
              Order Summary ({cart.length})
            </h2>

            {/* Items Mini List */}
            <div className="space-y-4 max-h-72 overflow-y-auto no-scrollbar pr-1 divide-y divide-zinc-200/60">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative w-16 h-16 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-zinc-950 truncate">{item.name}</h4>
                    <p className="text-zinc-500">
                      Qty: {item.quantity} | Size: {item.size}
                    </p>
                    <p className="font-bold text-zinc-900 mt-0.5">
                      ${((item.salePrice && item.salePrice > 0 ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs text-zinc-600 border-t border-zinc-200 pt-4">
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
                <span>Shipping ({shippingMethod})</span>
                <span className="font-bold text-zinc-950">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-zinc-950 pt-3 border-t border-zinc-200">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 bg-zinc-950 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Place Order & Pay ${finalTotal.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
