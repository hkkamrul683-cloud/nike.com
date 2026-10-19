'use client';

import React, { useState, useEffect } from 'react';
import { useCartWishlist } from '@/context/CartWishlistContext';
import AdminSidebar, { AdminTab } from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminCustomers from '@/components/admin/AdminCustomers';
import AdminReviews from '@/components/admin/AdminReviews';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminCoupons from '@/components/admin/AdminCoupons';
import AdminVendors from '@/components/admin/AdminVendors';
import AdminSystem from '@/components/admin/AdminSystem';
import AdminProductSheet from '@/components/admin/AdminProductSheet';
import AdminLoginGate from '@/components/admin/AdminLoginGate';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, refreshUser, logout } = useCartWishlist();

  // Navigation State
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Data State
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReseeding, setIsReseeding] = useState(false);

  // Fetch all admin data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, ordRes, cpnRes, custRes, revRes, setRes, vendRes] = await Promise.all([
        fetch('/api/products?limit=100'),
        fetch('/api/orders?all=true'),
        fetch('/api/coupons'),
        fetch('/api/admin/customers'),
        fetch('/api/admin/reviews'),
        fetch('/api/admin/settings'),
        fetch('/api/vendors'),
      ]);

      if (prodRes.ok) {
        const d = await prodRes.json();
        if (d.products) setProducts(d.products);
      }
      if (ordRes.ok) {
        const d = await ordRes.json();
        if (d.orders) setOrders(d.orders);
      }
      if (cpnRes.ok) {
        const d = await cpnRes.json();
        if (d.coupons) setCoupons(d.coupons);
      }
      if (custRes.ok) {
        const d = await custRes.json();
        if (d.customers) setCustomers(d.customers);
      }
      if (revRes.ok) {
        const d = await revRes.json();
        if (d.reviews) setReviews(d.reviews);
      }
      if (setRes.ok) {
        const d = await setRes.json();
        if (d.settings) setSettings(d.settings);
      }
      if (vendRes.ok) {
        const d = await vendRes.json();
        if (d.vendors) setVendors(d.vendors);
      }
    } catch (e) {
      console.error('Failed to load admin telemetry:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  // Auth Handler
  const handleAdminLogin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }
      if (data.user?.role !== 'ADMIN') {
        throw new Error('This account does not have administrator privileges.');
      }
      await refreshUser();
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      return false;
    }
  };

  // Create Product Handler
  const handleCreateProduct = async (payload: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        await loadData();
        return true;
      } else {
        alert(data.error || 'Failed to create product');
        return false;
      }
    } catch (err: any) {
      alert(err.message);
      return false;
    }
  };

  // Delete Product Handler
  const handleDeleteProduct = async (slug: string) => {
    try {
      const res = await fetch(`/api/products/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Update Order Status Handler
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status } : o))
        );
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Create Coupon Handler
  const handleCreateCoupon = async (payload: {
    code: string;
    discountValue: string;
    discountType: string;
    minOrder: string;
  }) => {
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        await loadData();
      } else {
        alert(data.error || 'Failed to create promo code');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Review Handler
  const handleDeleteReview = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete review');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Store Settings Handler
  const handleSaveSettings = async (newSettings: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(newSettings);
        return true;
      } else {
        alert(data.error || 'Failed to save settings');
        return false;
      }
    } catch (err: any) {
      alert(err.message);
      return false;
    }
  };

  // Re-seed Database
  const handleReseed = async () => {
    if (
      !confirm(
        'Confirm Database Re-Seed: Reset catalog to default 24 verified products and starter promo codes?'
      )
    )
      return;

    setIsReseeding(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      alert(data.message || 'Catalog seeded successfully');
      await loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsReseeding(false);
    }
  };

  // If not logged in or not admin, show sleek Vercel login gate
  if (!user || user.role !== 'ADMIN') {
    return <AdminLoginGate onLogin={handleAdminLogin} currentUser={user} />;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex font-sans selection:bg-zinc-800 selection:text-white">
      {/* Vercel Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productCount={products.length}
        orderCount={orders.length}
        couponCount={coupons.length}
        vendorCount={vendors.length}
        customerCount={customers.length}
        reviewCount={reviews.length}
        user={user}
        onLogout={logout}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onOpenAddProduct={() => setIsAddSheetOpen(true)}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          onOpenAddProduct={() => setIsAddSheetOpen(true)}
          onReseed={handleReseed}
          isReseeding={isReseeding}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          orderCount={orders.length}
        />

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-3 text-zinc-400">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-300" />
              <p className="text-xs font-mono">Syncing telemetry data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <AdminOverview
                  products={products}
                  orders={orders}
                  coupons={coupons}
                  customersCount={customers.length}
                  settings={settings}
                  setActiveTab={setActiveTab}
                  onOpenAddProduct={() => setIsAddSheetOpen(true)}
                />
              )}

              {activeTab === 'products' && (
                <AdminProducts
                  products={products}
                  vendors={vendors}
                  onDeleteProduct={handleDeleteProduct}
                  onOpenAddProduct={() => setIsAddSheetOpen(true)}
                  searchQuery={globalSearch}
                  setSearchQuery={setGlobalSearch}
                />
              )}

              {activeTab === 'orders' && (
                <AdminOrders
                  orders={orders}
                  onUpdateStatus={handleUpdateOrderStatus}
                  onOrderUpdated={(updated) =>
                    setOrders((prev) =>
                      prev.map((o) =>
                        o._id === updated._id || o.orderNumber === updated.orderNumber ? updated : o
                      )
                    )
                  }
                  searchQuery={globalSearch}
                />
              )}

              {activeTab === 'vendors' && (
                <AdminVendors
                  vendors={vendors}
                  onRefresh={loadData}
                />
              )}

              {activeTab === 'customers' && (
                <AdminCustomers
                  customers={customers}
                  orders={orders}
                />
              )}

              {activeTab === 'reviews' && (
                <AdminReviews
                  reviews={reviews}
                  onDeleteReview={handleDeleteReview}
                />
              )}

              {activeTab === 'coupons' && (
                <AdminCoupons
                  coupons={coupons}
                  onCreateCoupon={handleCreateCoupon}
                />
              )}

              {activeTab === 'settings' && (
                <AdminSettings
                  initialSettings={settings}
                  onSaveSettings={handleSaveSettings}
                />
              )}

              {activeTab === 'system' && (
                <AdminSystem
                  onReseed={handleReseed}
                  isReseeding={isReseeding}
                  productCount={products.length}
                  orderCount={orders.length}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Slide-over Drawer for Add Product */}
      <AdminProductSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
        onSubmit={handleCreateProduct}
        vendors={vendors}
      />
    </div>
  );
}
