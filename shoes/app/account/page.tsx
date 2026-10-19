'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  ShieldCheck,
  LogOut,
  Settings,
  QrCode,
  Award,
  Truck,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  ExternalLink,
  ShoppingBag,
  Check,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  CreditCard,
} from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

type AccountTab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'pass' | 'settings';

function AccountPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as AccountTab) || 'overview';

  const { user, logout, wishlist, removeFromWishlist, addToCart, refreshUser } = useCartWishlist();
  const [activeTab, setActiveTab] = useState<AccountTab>(initialTab);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  // Address form modal / toggle
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
    isDefault: false,
  });

  // Settings form
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sync profile fields with user
  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfilePhone(user.phone || '');
    }
  }, [user]);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoadingOrders(true);
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          if (data.orders) setOrders(data.orders);
        }
      } catch (e) {
        console.error('Failed to fetch orders:', e);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  // Update tab in URL without reloading
  const handleTabChange = (tab: AccountTab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tab);
    router.replace(`/account?${params.toString()}`);
  };

  // Save profile changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileName,
          phone: profilePhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      await refreshUser();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Add new address
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.addressLine1 || !newAddress.city) {
      alert('Please fill in all required address fields.');
      return;
    }

    try {
      const existingAddresses = user?.addresses || [];
      const updatedList = [
        ...existingAddresses,
        {
          ...newAddress,
          id: `addr-${Date.now()}`,
          isDefault: existingAddresses.length === 0 ? true : newAddress.isDefault,
        },
      ];

      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresses: updatedList }),
      });

      if (res.ok) {
        await refreshUser();
        setIsAddingAddress(false);
        setNewAddress({
          fullName: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'United States',
          phone: '',
          isDefault: false,
        });
      }
    } catch (err) {
      console.error('Failed to add address:', err);
    }
  };

  // Delete address
  const handleDeleteAddress = async (addrId: string) => {
    if (!confirm('Are you sure you want to remove this address?')) return;
    try {
      const updatedList = (user?.addresses || []).filter((a: any) => a.id !== addrId);
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresses: updatedList }),
      });
      if (res.ok) await refreshUser();
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  // If not logged in
  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#FAFAFA]">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-zinc-200/80 shadow-lg text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-900">
            <Award className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">
              HypeKicks Member Account
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Sign in to view your orders, saved favourites, HypeKicks Member Pass, and personalized rewards.
            </p>
          </div>
          <div className="pt-2 space-y-3">
            <Link
              href="/login"
              className="block w-full py-3.5 bg-zinc-950 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-md"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block w-full py-3 border border-zinc-300 text-zinc-900 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userInitial = user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'N';
  const memberSince = user.createdAt ? new Date(user.createdAt).getFullYear() : 2026;

  // Sidebar navigation menu items
  const NAV_ITEMS = [
    {
      id: 'overview',
      label: 'Member Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'orders',
      label: 'Orders & Tracking',
      icon: Package,
      badge: orders.length > 0 ? orders.length : null,
    },
    {
      id: 'wishlist',
      label: 'Saved Favourites',
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null,
    },
    {
      id: 'addresses',
      label: 'Delivery Addresses',
      icon: MapPin,
      badge: (user.addresses?.length || 0) > 0 ? (user.addresses?.length ?? null) : null,
    },
    {
      id: 'pass',
      label: 'HypeKicks Member Pass',
      icon: QrCode,
      badge: 'VIP',
    },
    {
      id: 'settings',
      label: 'Profile & Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F8] text-zinc-950 font-sans pb-24">
      {/* Top Banner / Breadcrumb Bar */}
      <div className="bg-white border-b border-zinc-200/80">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold text-sm tracking-wide">
              {userInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
                  {user.name || 'HypeKicks Member'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> HypeKicks Member
                </span>
              </div>
              <p className="text-xs text-zinc-500">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" /> Admin Console
              </Link>
            )}
            <button
              onClick={() => logout()}
              className="px-4 py-2 border border-zinc-200 hover:border-zinc-400 bg-white hover:bg-zinc-50 text-zinc-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-zinc-500" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT SIDEBAR SYSTEM ================= */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-3 space-y-1 sticky top-24">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Account Navigation
              </div>

              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id as AccountTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[14px] font-medium transition-all ${
                      isSelected
                        ? 'bg-zinc-950 text-white font-semibold shadow-xs'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isSelected ? 'text-white' : 'text-zinc-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : item.badge === 'VIP'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-zinc-100 text-zinc-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Extra Admin link inside sidebar if admin */}
              {user.role === 'ADMIN' && (
                <div className="pt-2 border-t border-zinc-100 mt-2">
                  <Link
                    href="/admin"
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] text-red-600 font-semibold hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-red-600" />
                      <span>Admin Management</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                  </Link>
                </div>
              )}

              {/* Quick Sign Out inside sidebar */}
              <div className="pt-2 border-t border-zinc-100">
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT PANEL ================= */}
          <main className="lg:col-span-9 space-y-6">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 1. Nike Member Card (Apple Wallet / Nike Pass Aesthetics) */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-white p-8 sm:p-10 shadow-xl border border-zinc-800">
                  {/* Subtle Nike Swoosh Background Silhouette */}
                  <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
                    <svg width="340" height="150" viewBox="0 0 120 46" fill="white">
                      <path d="M14.967 43.378c-3.97.9-7.624-.05-9.742-2.584C2.9 38.03 2.9 33.51 5.17 28.7c1.9-4.07 5.014-7.99 8.623-11.09C8.05 23.668 5.68 30.97 8.03 35.98c.87 1.87 2.58 3.1 4.7 3.56l86.17-32.71c2.18-.826 3.57-2.37 3.86-4.16.23-1.43-.24-2.9-1.34-4.16-.016-.02-.033-.038-.05-.058C115.39 2.23 120 8.16 120 8.16L14.967 43.378Z" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        HypeKicks Member Pass
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        {user.name || 'HypeKicks Member'}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                        <span>Member Since {memberSince}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Free Standard Delivery Active
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <button
                        onClick={() => handleTabChange('pass')}
                        className="px-5 py-2.5 bg-white hover:bg-zinc-100 text-zinc-950 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                      >
                        <QrCode className="w-4 h-4" /> View Digital Pass
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Key Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Metric 1 */}
                  <div
                    onClick={() => handleTabChange('orders')}
                    className="p-5 bg-white border border-zinc-200/90 rounded-2xl hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Total Orders
                      </span>
                      <Package className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-3xl font-black text-zinc-950">
                        {orders.length}
                      </span>
                      <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-950 group-hover:underline flex items-center gap-0.5">
                        Track <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div
                    onClick={() => handleTabChange('wishlist')}
                    className="p-5 bg-white border border-zinc-200/90 rounded-2xl hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Saved Favourites
                      </span>
                      <Heart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-3xl font-black text-zinc-950">
                        {wishlist.length}
                      </span>
                      <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-950 group-hover:underline flex items-center gap-0.5">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div
                    onClick={() => handleTabChange('addresses')}
                    className="p-5 bg-white border border-zinc-200/90 rounded-2xl hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Delivery Addresses
                      </span>
                      <MapPin className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-3xl font-black text-zinc-950">
                        {user.addresses?.length || 1}
                      </span>
                      <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-950 group-hover:underline flex items-center gap-0.5">
                        Manage <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Recent Orders Widget */}
                <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900">Recent Purchases</h3>
                      <p className="text-xs text-zinc-500">Track shipments and print receipts</p>
                    </div>
                    <button
                      onClick={() => handleTabChange('orders')}
                      className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                    >
                      View All ({orders.length}) <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {isLoadingOrders ? (
                    <div className="py-8 text-center">
                      <div className="w-6 h-6 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="py-10 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-zinc-800">No purchases yet</p>
                      <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                        Once you place an order, live shipping status and itemized receipts will show up here.
                      </p>
                      <Link
                        href="/products"
                        className="inline-block mt-2 px-6 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                      >
                        Shop New Releases
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 3).map((ord) => (
                        <div
                          key={ord._id}
                          className="p-4 rounded-xl border border-zinc-200/80 hover:border-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">
                              <Package className="w-6 h-6 text-zinc-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-zinc-950">
                                  {ord.orderNumber}
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {ord.status}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                {ord.items?.length || 1} items • Total: ${ord.totalAmount?.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <Link
                              href={`/order-confirmation/${ord._id || ord.orderNumber}`}
                              className="px-4 py-2 border border-zinc-200 hover:border-zinc-950 text-zinc-900 rounded-full text-xs font-semibold transition-colors"
                            >
                              View Invoice
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Nike Member Exclusive Benefits Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-white border border-zinc-200/90 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">Free Standard Delivery</h4>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                        Automatic free shipping on every HypeKicks Member order without minimum purchase.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-zinc-200/90 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">Exclusive SNKRS Drops</h4>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                        Early access to high-demand HypeKicks silhouettes, collaborations, and member-only colorways.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS & TRACKING */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                      Orders & Tracking
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Check live shipping updates, tracking codes, and itemized receipts.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    className="px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors w-fit"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {isLoadingOrders ? (
                  <div className="py-16 text-center">
                    <div className="w-8 h-8 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <Package className="w-12 h-12 text-zinc-300 mx-auto" />
                    <h3 className="text-base font-bold text-zinc-900">No Orders Placed Yet</h3>
                    <p className="text-xs text-zinc-500 max-w-md mx-auto">
                      All your purchases, tracking numbers, and digital tax receipts will appear here once you place an order.
                    </p>
                    <Link
                      href="/products"
                      className="inline-block mt-2 px-6 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800"
                    >
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors"
                      >
                        {/* Order Header */}
                        <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-4">
                            <div>
                              <span className="text-zinc-500 text-[10px] uppercase font-semibold block">Order</span>
                              <span className="font-bold text-zinc-950">{order.orderNumber}</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 text-[10px] uppercase font-semibold block">Date</span>
                              <span className="font-medium text-zinc-900">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-zinc-500 text-[10px] uppercase font-semibold block">Total</span>
                              <span className="font-bold text-zinc-950">
                                ${order.totalAmount?.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {order.status}
                            </span>
                            <Link
                              href={`/order-confirmation/${order._id || order.orderNumber}`}
                              className="px-3 py-1 bg-white border border-zinc-300 hover:border-zinc-950 rounded-full text-[11px] font-semibold text-zinc-900 transition-colors"
                            >
                              Receipt
                            </Link>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-2 text-xs text-zinc-600">
                            <Truck className="w-3.5 h-3.5 text-zinc-500" />
                            <span>
                              Tracking Number:{' '}
                              <strong className="font-mono text-zinc-900 font-bold">
                                {order.trackingNumber || 'Pending Courier Assignment'}
                              </strong>
                            </span>
                          </div>

                          <div className="divide-y divide-zinc-100">
                            {order.items?.map((item: any, idx: number) => (
                              <div key={idx} className="py-2.5 first:pt-0 flex items-center gap-4">
                                <div className="relative w-14 h-14 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                                  <Image
                                    src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80'}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0 text-xs">
                                  <h4 className="font-semibold text-zinc-900 truncate">{item.name}</h4>
                                  <p className="text-zinc-500 mt-0.5">
                                    Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                                  </p>
                                </div>
                                <div className="font-bold text-xs text-zinc-950">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SAVED FAVOURITES */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                      Saved Favourites ({wishlist.length})
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Items you’ve saved for later. Quick add to bag whenever you’re ready.
                    </p>
                  </div>
                  {wishlist.length > 0 && (
                    <Link
                      href="/products"
                      className="text-xs font-semibold text-zinc-900 hover:underline"
                    >
                      Browse More
                    </Link>
                  )}
                </div>

                {wishlist.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <Heart className="w-12 h-12 text-zinc-300 mx-auto" />
                    <h3 className="text-base font-bold text-zinc-900">Your Favourites list is empty</h3>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      Click the heart icon on any product to save it here for quick access later.
                    </p>
                    <Link
                      href="/products"
                      className="inline-block mt-2 px-6 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800"
                    >
                      Shop Sneakers
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {wishlist.map((item) => (
                      <div
                        key={item.productId}
                        className="border border-zinc-200 rounded-2xl p-3 flex flex-col justify-between group hover:border-zinc-300 transition-all"
                      >
                        <div className="relative aspect-square w-full bg-[#f6f6f6] rounded-xl overflow-hidden mb-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          />
                          <button
                            onClick={() => removeFromWishlist(item.productId)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-400 hover:text-red-600 shadow-xs transition-colors"
                            title="Remove from favourites"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1">
                          <Link
                            href={`/products/${item.slug}`}
                            className="text-xs font-bold text-zinc-900 hover:underline line-clamp-1 block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-[11px] text-zinc-500 capitalize">{item.category || 'Footwear'}</p>
                          <p className="text-xs font-bold text-zinc-950">
                            ${(item.salePrice || item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-zinc-100 flex gap-2">
                          <button
                            onClick={() => {
                              addToCart({
                                productId: item.productId,
                                name: item.name,
                                slug: item.slug,
                                price: item.price,
                                salePrice: item.salePrice,
                                image: item.image,
                                color: 'Default',
                                size: 'US 9',
                                quantity: 1,
                              });
                            }}
                            className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: DELIVERY ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                      Saved Delivery Addresses
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Manage your delivery locations for faster one-click checkout.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Address
                  </button>
                </div>

                {/* Add Address Form Accordion */}
                {isAddingAddress && (
                  <form onSubmit={handleAddAddress} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase">New Address Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-zinc-600 font-semibold mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                          placeholder="e.g. Kamrul Islam"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-zinc-600 font-semibold mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-zinc-600 font-semibold mb-1">Street Address *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.addressLine1}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                          placeholder="123 Marathon Way, Apt 4"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-600 font-semibold mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                          placeholder="Portland"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-600 font-semibold mb-1">State / Province</label>
                        <input
                          type="text"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                          placeholder="OR"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-600 font-semibold mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={newAddress.postalCode}
                          onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                          placeholder="97005"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-600 font-semibold mb-1">Country</label>
                        <input
                          type="text"
                          value={newAddress.country}
                          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-full text-xs font-semibold hover:bg-zinc-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid */}
                {(!user.addresses || user.addresses.length === 0) ? (
                  <div className="p-8 bg-zinc-50 rounded-2xl text-center space-y-2">
                    <p className="text-sm font-bold text-zinc-800">No saved addresses</p>
                    <p className="text-xs text-zinc-500">
                      Add your default shipping address to accelerate checkout.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.addresses.map((addr: any, idx: number) => (
                      <div
                        key={addr.id || idx}
                        className="p-5 rounded-2xl border border-zinc-200 bg-white relative flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-zinc-950">{addr.fullName}</span>
                            {addr.isDefault && (
                              <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] font-bold uppercase">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-600 leading-relaxed">{addr.addressLine1}</p>
                          {addr.addressLine2 && <p className="text-xs text-zinc-600">{addr.addressLine2}</p>}
                          <p className="text-xs text-zinc-600">
                            {addr.city}, {addr.state} {addr.postalCode}
                          </p>
                          <p className="text-xs text-zinc-500">{addr.country}</p>
                          {addr.phone && <p className="text-xs text-zinc-500 mt-1">📞 {addr.phone}</p>}
                        </div>

                        <div className="pt-2 border-t border-zinc-100 flex items-center justify-end">
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: DIGITAL MEMBER PASS */}
            {activeTab === 'pass' && (
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                    HypeKicks Digital Member Pass
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Scan in-store at any HypeKicks store or use online for member-exclusive benefits.
                  </p>
                </div>

                {/* Authentic Member Pass Card */}
                <div className="max-w-md mx-auto bg-zinc-950 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-zinc-800 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm tracking-tighter uppercase">HypeKicks</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                      HypeKicks Member
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                      {user.name || 'HypeKicks Member'}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      MBR-{user.id?.slice(-8).toUpperCase() || '2026-PASS'}
                    </p>
                  </div>

                  {/* QR Graphic Mockup */}
                  <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center space-y-2">
                    <div className="w-36 h-36 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900 border border-zinc-200">
                      <QrCode className="w-28 h-28" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                      Scan In-Store
                    </span>
                  </div>

                  <div className="text-[11px] text-zinc-400 text-center">
                    Valid across all HypeKicks Stores & Official Online Drops
                  </div>
                </div>

                {/* Perks Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100 text-xs">
                  <div className="flex items-center gap-2 text-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Free standard delivery on all orders</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Receipt-less returns for 30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>First access to high-demand SNKRS drops</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>HypeKicks VIP Club app premium unlocks</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8 space-y-6">
                <div className="pb-4 border-b border-zinc-100">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                    Profile & Account Settings
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Update your personal profile details, contact information, and account preferences.
                  </p>
                </div>

                {saveSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Profile changes saved successfully!
                  </div>
                )}

                {saveError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    {saveError}
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-5 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm font-medium text-zinc-900 outline-none focus:border-zinc-950 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Email Address (Account Identifier)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-100 text-sm text-zinc-500 cursor-not-allowed"
                    />
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      Email cannot be changed directly as it is bound to your HypeKicks ID.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm font-medium text-zinc-900 outline-none focus:border-zinc-950 transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AccountPageContent />
    </Suspense>
  );
}

