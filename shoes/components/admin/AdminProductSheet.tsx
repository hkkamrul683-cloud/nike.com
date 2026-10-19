'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Upload,
  Check,
  Sparkles,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminProductSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => Promise<boolean>;
  vendors?: any[];
}

export default function AdminProductSheet({
  isOpen,
  onClose,
  onSubmit,
  vendors = [],
}: AdminProductSheetProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialForm = {
    name: '',
    subtitle: '',
    description: '',
    categorySlug: 'shoes',
    vendorSlug: vendors[0]?.slug || 'apex-footwear',
    vendorName: vendors[0]?.name || 'Apex Footwear Limited',
    vendorId: vendors[0]?._id || '',
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
  };

  const [form, setForm] = useState(initialForm);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Cloudinary Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);
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
        setError(data.error || 'Failed to upload to Cloudinary');
      }
    } catch (err: any) {
      setError(err.message || 'Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        images: uploadedImageUrl
          ? [uploadedImageUrl]
          : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
        colors: form.colors.split(',').map((c) => c.trim()),
        sizes: form.sizes.split(',').map((s) => s.trim()),
        details: [
          'Engineered lightweight cushioning',
          'Breathable mesh and reinforced structure',
          'Original SPORTIX athletic silhouette',
        ],
      };

      const success = await onSubmit(payload);
      if (success) {
        setForm(initialForm);
        setUploadedImageUrl('');
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Slide-over Panel (Vercel Sheet Style) */}
      <div className="fixed inset-y-0 right-0 max-w-xl w-full bg-zinc-950 border-l border-zinc-800 text-zinc-100 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Create Catalog Product
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Add a new shoe model with direct Cloudinary CDN synchronization.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/80 border border-red-800/60 text-red-400 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Image Upload Dropzone */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Product Photography (Cloudinary CDN)
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
              <div className="relative w-20 h-20 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
                {uploadedImageUrl ? (
                  <Image
                    src={uploadedImageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-zinc-600" />
                )}
              </div>

              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold cursor-pointer text-xs transition-colors border border-zinc-700">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingImage ? 'Uploading Image...' : 'Choose Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>

                {uploadedImageUrl ? (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <Check className="w-3 h-3" /> Image uploaded & optimized
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-400">
                    PNG, JPG, or WebP. Defaults to verified hero shoe if empty.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Product Title */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. SPORTIX Velocity Elite Pro"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700 font-medium"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Subtitle / Category Hook
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="e.g. Men's Road Running Shoes"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700 font-medium"
            />
          </div>

          {/* Vendor / Supplier Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Vendor / Supplier *
              </label>
              <span className="text-[10px] text-emerald-400 font-mono">
                {vendors && vendors.length > 0 ? `${vendors.length} Verified Suppliers` : '10 Default Vendors'}
              </span>
            </div>
            <select
              value={form.vendorSlug}
              onChange={(e) => {
                const selectedSlug = e.target.value;
                const found = vendors?.find((v) => v.slug === selectedSlug);
                setForm({
                  ...form,
                  vendorSlug: selectedSlug,
                  vendorName: found ? found.name : selectedSlug,
                  vendorId: found?._id || '',
                });
              }}
              className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-medium outline-none cursor-pointer focus:border-zinc-700 text-xs"
            >
              {vendors && vendors.length > 0 ? (
                vendors.map((v) => (
                  <option key={v._id || v.slug} value={v.slug}>
                    {v.name} &bull; {v.city} ({v.commissionRate}% fee)
                  </option>
                ))
              ) : (
                <>
                  <option value="apex-footwear">Apex Footwear Limited &bull; Dhaka (10% fee)</option>
                  <option value="bata-bangladesh">Bata Bangladesh &bull; Gazipur (12% fee)</option>
                  <option value="lotto-sports-bd">Lotto Sports BD &bull; Dhaka (15% fee)</option>
                  <option value="bay-footwear">Bay Footwear Group &bull; Dhaka (10% fee)</option>
                  <option value="nike-authorized-bd">Sportix / Nike Authorized Hub &bull; Dhaka (15% fee)</option>
                  <option value="adidas-originals-bd">Adidas Originals BD &bull; Dhaka (14% fee)</option>
                  <option value="puma-sports-hub">Puma Sports Hub &bull; Dhaka (12% fee)</option>
                  <option value="step-footwear">Step Footwear Ltd. &bull; Dhaka (8% fee)</option>
                  <option value="orion-footwear">Orion Footwear Limited &bull; Dhaka (10% fee)</option>
                  <option value="vans-converse-outlet">Vans & Converse BD Outlet &bull; Dhaka (12% fee)</option>
                </>
              )}
            </select>
          </div>

          {/* Category & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Category
              </label>
              <select
                value={form.categorySlug}
                onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 outline-none cursor-pointer"
              >
                <option value="shoes">Shoes</option>
                <option value="clothing">Apparel / Clothing</option>
                <option value="flight">SPORTIX Flight</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Target Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 outline-none cursor-pointer"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="160.00"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono font-bold focus:outline-hidden focus:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Sale ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.salePrice}
                onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono focus:outline-hidden focus:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Initial Units
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono focus:outline-hidden focus:border-zinc-700"
              />
            </div>
          </div>

          {/* Badge & Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Marketing Badge
              </label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="New Release / Best Seller"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-hidden focus:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Available Sizes
              </label>
              <input
                type="text"
                value={form.sizes}
                onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                placeholder="US 8, US 9, US 10"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-hidden focus:border-zinc-700"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Technical Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe materials, cushioning, and intended sport performance..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700 resize-none font-medium"
            />
          </div>

          {/* Actions Bottom Bar */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || uploadingImage}
              className="px-5 py-2 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Deploy to Catalog</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
