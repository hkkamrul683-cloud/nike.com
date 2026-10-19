'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Globe,
  Sparkles,
} from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';
import { trackBeginCheckout } from '@/lib/analytics';
import { convertUsdToBdt } from '@/lib/payment';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');

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
  const [paymentMethod, setPaymentMethod] = useState<'SSLCOMMERZ' | 'STRIPE' | 'CASH_ON_DELIVERY'>('SSLCOMMERZ');

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
    country: 'Bangladesh',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Catch errors returned from payment gateway redirects
  useEffect(() => {
    if (urlError) {
      setErrorMessage(decodeURIComponent(urlError));
    }
  }, [urlError]);

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
        country: user.addresses?.[0]?.country || prev.country,
      }));
    }
  }, [user]);

  // Track Begin Checkout event for GTM & Meta Pixel
  useEffect(() => {
    if (cart && cart.length > 0) {
      trackBeginCheckout(
        cart.map((item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          salePrice: item.salePrice,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        subtotal
      );
    }
  }, []);

  // Shipping calculation based on choice
  const standardShipping = subtotal > 150 ? 0 : 12.00;
  const shippingFee = shippingMethod === 'express' ? standardShipping + 15.00 : standardShipping;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const finalTotalBDT = convertUsdToBdt(finalTotal);

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

      // 1. Create order in Database
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order.');
      }

      const orderId = data.orderId || data.orderNumber;

      // 2. Route based on selected payment gateway
      if (paymentMethod === 'SSLCOMMERZ') {
        const sslRes = await fetch('/api/payment/sslcommerz/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });

        const sslData = await sslRes.json();
        if (!sslRes.ok || !sslData.success || !sslData.gatewayUrl) {
          throw new Error(sslData.error || 'Failed to connect to SSLCommerz gateway.');
        }

        clearCart();
        window.location.href = sslData.gatewayUrl;
        return;
      }

      if (paymentMethod === 'STRIPE') {
        const stripeRes = await fetch('/api/payment/stripe/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });

        const stripeData = await stripeRes.json();
        if (!stripeRes.ok || !stripeData.success || !stripeData.url) {
          throw new Error(stripeData.error || 'Failed to initialize Stripe checkout session.');
        }

        clearCart();
        window.location.href = stripeData.url;
        return;
      }

      // Cash on Delivery
      clearCart();
      router.push(`/order-confirmation/${orderId}`);
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
          <p className="text-xs text-zinc-500 mt-1">
            Official SPORTIX encrypted checkout. Dual Bangladeshi & International Gateways.
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden sm:inline">256-Bit SSL Encrypted Payment</span>
          <span className="sm:hidden">Secure</span>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <div className="flex-1 font-semibold">{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Columns */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Shipping Destination */}
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
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950 bg-white"
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
                  placeholder="tanvir@example.com"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950 bg-white"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="017XXXXXXXX"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950 bg-white"
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
                  placeholder="House 12, Road 4, Sector 7, Uttara"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950 bg-white"
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
                  placeholder="Flat 4B, Building Green"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950 bg-white"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  City / District *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Dhaka"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950 bg-white"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="1230"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950 bg-white"
                >
                  <option value="Bangladesh">Bangladesh (বাংলাদেশ)</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Speed */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-zinc-950 pb-2 border-b border-zinc-200">
              <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>Delivery Option</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-md'
                    : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="hidden"
                  />
                  <Truck className="w-5 h-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs uppercase">Standard Delivery</h4>
                    <p className={`text-[11px] ${shippingMethod === 'standard' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      2-4 business days
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black">
                  {standardShipping === 0 ? 'FREE' : `$${standardShipping.toFixed(2)}`}
                </span>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  shippingMethod === 'express'
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-md'
                    : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="hidden"
                  />
                  <Truck className="w-5 h-5 shrink-0 text-red-500" />
                  <div>
                    <h4 className="font-bold text-xs uppercase">Express Priority</h4>
                    <p className={`text-[11px] ${shippingMethod === 'express' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      Next-day guaranteed
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black">
                  ${(standardShipping + 15.00).toFixed(2)}
                </span>
              </label>
            </div>
          </div>

          {/* Step 3: Verified Payment Gateway */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-zinc-950">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs">
                  3
                </span>
                <span>Payment Gateway</span>
              </div>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                Select Payment Option
              </span>
            </div>

            {/* Payment Method Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Bangladesh Gateway (SSLCommerz) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('SSLCOMMERZ')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer relative overflow-hidden ${
                  paymentMethod === 'SSLCOMMERZ'
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-md ring-2 ring-zinc-950 ring-offset-2'
                    : 'border-zinc-200 text-zinc-700 bg-white hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇧🇩</span>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    paymentMethod === 'SSLCOMMERZ' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700'
                  }`}>
                    bKash / Nagad
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-tight">Bangladesh Local</h4>
                  <p className={`text-[11px] mt-0.5 ${paymentMethod === 'SSLCOMMERZ' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    bKash, Nagad, Rocket & Cards
                  </p>
                </div>
              </button>

              {/* Option 2: International Gateway (Stripe) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('STRIPE')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer relative overflow-hidden ${
                  paymentMethod === 'STRIPE'
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-md ring-2 ring-zinc-950 ring-offset-2'
                    : 'border-zinc-200 text-zinc-700 bg-white hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    paymentMethod === 'STRIPE' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    Global
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-tight">International</h4>
                  <p className={`text-[11px] mt-0.5 ${paymentMethod === 'STRIPE' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    Visa, MasterCard, Amex
                  </p>
                </div>
              </button>

              {/* Option 3: Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer relative overflow-hidden ${
                  paymentMethod === 'CASH_ON_DELIVERY'
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-md ring-2 ring-zinc-950 ring-offset-2'
                    : 'border-zinc-200 text-zinc-700 bg-white hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Banknote className="w-5 h-5 text-emerald-500" />
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    paymentMethod === 'CASH_ON_DELIVERY' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    Handover
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-tight">Cash on Delivery</h4>
                  <p className={`text-[11px] mt-0.5 ${paymentMethod === 'CASH_ON_DELIVERY' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    Pay when shoes arrive
                  </p>
                </div>
              </button>
            </div>

            {/* Dynamic Gateway Details Panel */}
            {paymentMethod === 'SSLCOMMERZ' && (
              <div className="p-5 bg-gradient-to-br from-pink-50/50 via-zinc-50 to-orange-50/40 border border-pink-200/80 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pink-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                    <span className="text-xs font-black uppercase text-zinc-950">
                      SSLCommerz Bangladesh Payment Gateway
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-500 block">Total in BDT</span>
                    <span className="text-sm font-black text-pink-600">
                      ৳{finalTotalBDT.toLocaleString()} BDT
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    You will be redirected to the official SSLCommerz payment page to complete your payment with any of the supported services below:
                  </p>
                  
                  {/* Supported badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 bg-white border border-pink-300 rounded-lg text-[11px] font-bold text-pink-600 shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-pink-600" /> bKash (বিকাশ)
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-orange-300 rounded-lg text-[11px] font-bold text-orange-600 shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-600" /> Nagad (নগদ)
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-purple-300 rounded-lg text-[11px] font-bold text-purple-600 shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-purple-600" /> Rocket (রকেট)
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-blue-300 rounded-lg text-[11px] font-bold text-blue-700 shadow-sm flex items-center gap-1">
                      <CreditCard className="w-3 h-3" /> Visa / Mastercard / DBBL Nexus
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-700 shadow-sm">
                      🏦 Internet Banking
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 bg-white/60 p-2.5 rounded-xl border border-zinc-200/60">
                  <span>Exchange Rate: <strong>1 USD = ৳120 BDT</strong></span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Instant Verification
                  </span>
                </div>
              </div>
            )}

            {paymentMethod === 'STRIPE' && (
              <div className="p-5 bg-gradient-to-br from-indigo-50/40 via-zinc-50 to-blue-50/40 border border-indigo-200/80 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-xs font-black uppercase text-zinc-950">
                      Stripe Global Hosted Checkout
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-500 block">Total in USD</span>
                    <span className="text-sm font-black text-indigo-600">
                      ${finalTotal.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    You will be redirected to Stripe&apos;s bank-grade hosted checkout session. Supports international debit & credit cards from any country worldwide.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-800 shadow-sm">
                      💳 Visa
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-800 shadow-sm">
                      💳 MasterCard
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-800 shadow-sm">
                      💳 American Express
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-800 shadow-sm">
                       Apple Pay
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-800 shadow-sm">
                      🌐 Google Pay
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 bg-white/60 p-2.5 rounded-xl border border-zinc-200/60">
                  <span>Zero international transaction fee on eligible cards</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> PCI-DSS Level 1 Certified
                  </span>
                </div>
              </div>
            )}

            {paymentMethod === 'CASH_ON_DELIVERY' && (
              <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-zinc-600 space-y-2">
                <div className="flex items-center gap-2 text-zinc-950 font-black uppercase text-xs">
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span>Pay Upon Courier Handover</span>
                </div>
                <p>
                  Your order will be packaged and dispatched immediately. Please prepare exact cash ({`$${finalTotal.toFixed(2)}`} or approximately {`৳${finalTotalBDT.toLocaleString()} BDT`}) when our delivery agent reaches your address.
                </p>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Our delivery team will make a verification phone call prior to dispatch.</span>
                </div>
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

              {/* Total Row */}
              <div className="pt-3 border-t border-zinc-200 space-y-1">
                <div className="flex justify-between text-base font-black text-zinc-950">
                  <span>Total Amount</span>
                  <span>${finalTotal.toFixed(2)} USD</span>
                </div>
                {paymentMethod === 'SSLCOMMERZ' && (
                  <div className="flex justify-between text-xs font-bold text-pink-600">
                    <span>Payable in BDT</span>
                    <span>৳{finalTotalBDT.toLocaleString()} BDT</span>
                  </div>
                )}
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
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting to Payment Gateway...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    {paymentMethod === 'SSLCOMMERZ' && `Pay with bKash / Cards (৳${finalTotalBDT.toLocaleString()} BDT)`}
                    {paymentMethod === 'STRIPE' && `Pay with Stripe ($${finalTotal.toFixed(2)} USD)`}
                    {paymentMethod === 'CASH_ON_DELIVERY' && `Confirm Order ($${finalTotal.toFixed(2)})`}
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

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="w-10 h-10 border-3 border-zinc-950 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-xs font-bold uppercase text-zinc-500">Loading Checkout...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
