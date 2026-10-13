'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  Plus,
  Trash2,
  Edit,
  Upload,
  Check,
  AlertCircle,
  Tag,
  Search,
  X,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

export default function AdminDashboardPage() {
  const { user, refreshUser } = useCartWishlist();

  // Admin direct login form state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons'>('products');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search in admin products
  const [productSearch, setProductSearch] = useState('');

  // Add Product Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const [newProductForm, setNewProductForm] = useState({
    name: '',
    subtitle: '',
    description: '',
    categorySlug: 'shoes',
    gender: 'men',
    sport: 'running',
    price: '',
    salePrice: '',
    stock: '25',
    colors: 'Triple Black, Pure Platinum',
    colorway: 'Triple Black',
    sizes: 'US 8, US 8.5, US 9, US 9.5, US 10, US 10.5, US 11, US 12',
    badge: 'New Release',
    isFeatured: true,
  });

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState('15');
  const [newCouponType, setNewCouponType] = useState('PERCENTAGE');
  const [newCouponMin, setNewCouponMin] = useState('75');

  // Load Admin Data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, ordRes, cpnRes] = await Promise.all([
        fetch('/api/products?limit=100'),
        fetch('/api/orders?all=true'),
        fetch('/api/coupons'),
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
    } catch (e) {
      console.error(e);
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

  // Handle Cloudinary Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setUploadedImageUrl(data.url);
      } else {
        alert(data.error || 'Failed to upload to Cloudinary');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Create Product Submit
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProductForm,
        images: uploadedImageUrl
          ? [uploadedImageUrl]
          : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
        colors: newProductForm.colors.split(',').map((c) => c.trim()),
        sizes: newProductForm.sizes.split(',').map((s) => s.trim()),
        details: [
          'Performance engineered sole technology',
          'Breathable mesh and reinforced overlays',
          'Original SPORTIX athletic fit profile',
        ],
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        setUploadedImageUrl('');
        loadData();
      } else {
        alert(data.error || 'Failed to create product');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete product "${slug}"?`)) return;
    try {
      const res = await fetch(`/api/products/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.slug !== slug));
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders(orders.map((o) => (o._id === orderId ? { ...o, status } : o)));
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Create Coupon
  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newCouponCode,
          discountValue: newCouponValue,
          discountType: newCouponType,
          minOrder: newCouponMin,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewCouponCode('');
        loadData();
      } else {
        alert(data.error || 'Failed to create coupon');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Re-seed DB trigger
  const handleReseedDatabase = async () => {
    if (!confirm('Re-seed SPORTIX catalog with 24 default products and demo accounts?')) return;
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      alert(data.message || 'Seeded successfully');
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }
      if (data.user?.role !== 'ADMIN') {
        throw new Error('This account does not have admin permissions.');
      }
      await refreshUser();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  // Role Gate check - Direct Email & Password form
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-zinc-100 via-zinc-50 to-white">
        {/* Subtle background mesh pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

        <div className="relative max-w-md w-full bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-[32px] border border-zinc-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center text-white shadow-xl shadow-zinc-950/20 ring-4 ring-zinc-100 transition-transform hover:scale-105">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Admin Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
                Administrator Sign In
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                Enter your administrative credentials to access the SPORTIX control center.
              </p>
            </div>
          </div>

          {/* Current session info if signed in with non-admin */}
          {user && user.role !== 'ADMIN' && (
            <div className="p-3.5 bg-amber-50/90 border border-amber-200/90 rounded-2xl text-amber-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <span className="font-bold">Access Restricted:</span> Currently signed in as <span className="font-semibold underline">{user.email}</span> (Customer). Please login with an administrator account.
              </div>
            </div>
          )}

          {/* Error Message */}
          {loginError && (
            <div className="p-3.5 bg-red-50/90 border border-red-200/90 rounded-2xl text-red-600 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@sportix.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50/80 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-zinc-50/80 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors"
                  tabIndex={-1}
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Helper */}
            <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-600 min-w-0">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="font-mono text-[11px] truncate">admin@sportix.com</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAdminEmail('admin@sportix.com');
                  setAdminPassword('Admin123!');
                }}
                className="shrink-0 text-[11px] font-bold text-zinc-950 hover:text-zinc-700 uppercase tracking-wider px-2.5 py-1 bg-white border border-zinc-200 rounded-lg hover:border-zinc-400 transition-all shadow-xs cursor-pointer"
              >
                Quick Fill
              </button>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-zinc-950 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-zinc-800 active:scale-[0.99] transition-all shadow-md shadow-zinc-950/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer group"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="pt-2 text-center flex flex-col items-center gap-2.5 border-t border-zinc-100">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Store
            </Link>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Lock className="w-2.5 h-2.5" />
              <span>Protected Administrator Gateway</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.categorySlug?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.slug?.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-red-600 text-white text-[10px] font-black uppercase">
              Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
              SPORTIX Command Center
            </h1>
          </div>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Cloudinary media storage &bull; MongoDB Atlas &bull; Real-time catalog & orders
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReseedDatabase}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            title="Reset or Re-seed default products"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Catalog
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-zinc-950 text-white rounded-3xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Sales</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black">${totalRevenue.toFixed(2)}</p>
          <p className="text-[11px] text-zinc-400">Across verified store orders</p>
        </div>

        <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <Package className="w-4 h-4 text-zinc-700" />
          </div>
          <p className="text-3xl font-black text-zinc-950">{orders.length}</p>
          <p className="text-[11px] text-zinc-500">Fulfillment orders logged</p>
        </div>

        <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Catalog Products</span>
            <ShoppingBag className="w-4 h-4 text-zinc-700" />
          </div>
          <p className="text-3xl font-black text-zinc-950">{products.length}</p>
          <p className="text-[11px] text-zinc-500">Active footwear & apparel</p>
        </div>

        <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Promo Codes</span>
            <Tag className="w-4 h-4 text-zinc-700" />
          </div>
          <p className="text-3xl font-black text-zinc-950">{coupons.length}</p>
          <p className="text-[11px] text-zinc-500">Active discount rules</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'products'
              ? 'bg-zinc-950 text-white'
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'orders'
              ? 'bg-zinc-950 text-white'
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          Order Fulfillment ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'coupons'
              ? 'bg-zinc-950 text-white'
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          Coupons & Discounts ({coupons.length})
        </button>
      </div>

      {/* Tab 1: Products Table */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by name or category..."
                className="w-full pl-10 pr-4 py-2 text-xs border border-zinc-300 rounded-full outline-none focus:border-zinc-950"
              />
            </div>
            <span className="text-xs font-bold text-zinc-500">
              Showing {filteredProducts.length} of {products.length}
            </span>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 uppercase font-black tracking-wider text-zinc-700">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Badges</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={p.images?.[0] || '/placeholder.png'}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/products/${p.slug}`}
                            className="font-bold text-zinc-950 hover:underline flex items-center gap-1"
                          >
                            {p.name} <ExternalLink className="w-3 h-3 text-zinc-400" />
                          </Link>
                          <p className="text-[11px] text-zinc-500">{p.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold uppercase">{p.categorySlug}</td>
                    <td className="p-4">
                      <span className="font-bold text-zinc-950">${p.price?.toFixed(2)}</span>
                      {p.salePrice && (
                        <span className="text-red-600 block text-[10px] font-bold">
                          Sale: ${p.salePrice?.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          p.stock > 10
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-4">
                      {p.badge ? (
                        <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-bold text-zinc-800">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.slug)}
                        className="p-1.5 rounded hover:bg-red-50 text-zinc-400 hover:text-red-600 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Table */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 uppercase font-black tracking-wider text-zinc-700">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-zinc-950">{o.orderNumber}</td>
                  <td className="p-4">
                    <p className="font-bold text-zinc-950">{o.customerName || 'Guest'}</p>
                    <p className="text-[11px] text-zinc-500">{o.customerEmail}</p>
                  </td>
                  <td className="p-4 font-bold text-zinc-950">${o.totalAmount?.toFixed(2)}</td>
                  <td className="p-4 text-zinc-500">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                      className="px-2.5 py-1 border border-zinc-300 rounded-lg text-xs font-bold uppercase outline-none cursor-pointer bg-white"
                    >
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/order-confirmation/${o._id || o.orderNumber}`}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Receipt
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Coupons */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-zinc-50 p-6 rounded-3xl border border-zinc-200 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-tight text-zinc-950">
              Create New Promo Coupon
            </h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FLASH30"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-xl outline-none uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Discount Type</label>
                  <select
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-xl outline-none font-semibold bg-white"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Value</label>
                  <input
                    type="number"
                    required
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-xl outline-none font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">Min Order Amount ($)</label>
                <input
                  type="number"
                  value={newCouponMin}
                  onChange={(e) => setNewCouponMin(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-xl outline-none font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
              >
                Save Coupon Rule
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 uppercase font-black text-zinc-700">
                <tr>
                  <th className="p-4">Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Min Spend</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {coupons.map((c) => (
                  <tr key={c._id}>
                    <td className="p-4 font-mono font-bold text-zinc-950">{c.code}</td>
                    <td className="p-4 font-bold text-emerald-700">
                      {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% Off` : `$${c.discountValue} Off`}
                    </td>
                    <td className="p-4 text-zinc-600">${c.minOrder?.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal with Cloudinary Upload */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Add New SPORTIX Product</h3>
                <p className="text-xs text-zinc-500">Supports direct Cloudinary image upload</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              {/* Image Upload Input */}
              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Product Image (Cloudinary Integration)
                </label>
                <div className="flex items-center gap-4">
                  <label className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl cursor-pointer text-xs font-semibold text-zinc-800 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedImageUrl && (
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                      <Check className="w-4 h-4" /> Image Uploaded to Cloudinary
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    placeholder="e.g. SPORTIX Vapor Speed 4"
                    className="w-full px-3 py-2.5 border border-zinc-300 rounded-xl outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Subtitle / Sport Category</label>
                  <input
                    type="text"
                    value={newProductForm.subtitle}
                    onChange={(e) => setNewProductForm({ ...newProductForm, subtitle: e.target.value })}
                    placeholder="e.g. Men's Road Running Shoes"
                    className="w-full px-3 py-2.5 border border-zinc-300 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Category</label>
                  <select
                    value={newProductForm.categorySlug}
                    onChange={(e) => setNewProductForm({ ...newProductForm, categorySlug: e.target.value })}
                    className="w-full px-3 py-2.5 border border-zinc-300 rounded-xl outline-none bg-white"
                  >
                    <option value="shoes">Shoes</option>
                    <option value="clothing">Clothing</option>
                    <option value="flight">SPORTIX Flight</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Gender</label>
                  <select
                    value={newProductForm.gender}
                    onChange={(e) => setNewProductForm({ ...newProductForm, gender: e.target.value })}
                    className="w-full px-3 py-2.5 border border-zinc-300 rounded-xl outline-none bg-white"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    placeholder="160.00"
                    className="w-full px-3 py-2.5 border border-zinc-300 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Sale Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProductForm.salePrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, salePrice: e.target.value })}
                    placeholder="Optional discount"
                    className="w-full px-3 py-2.5 border border-zinc-300 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Inventory Units</label>
                  <input
                    type="number"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: e.target.value })}
                    className="w-full px-3 py-2.5 border border-zinc-300 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Product Badge</label>
                  <input
                    type="text"
                    value={newProductForm.badge}
                    onChange={(e) => setNewProductForm({ ...newProductForm, badge: e.target.value })}
                    placeholder="New Release / Best Seller"
                    className="w-full px-3 py-2.5 border border-zinc-300 rounded-xl outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-bold uppercase text-zinc-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newProductForm.description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    placeholder="Full product athletic features..."
                    className="w-full px-3 py-2 border border-zinc-300 rounded-xl outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-md"
                >
                  Create & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
