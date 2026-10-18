'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  ExternalLink,
  Trash2,
  Plus,
  Filter,
  Package,
  AlertCircle,
  Tag,
  CheckCircle,
  Layers,
  X,
} from 'lucide-react';

interface AdminProductsProps {
  products: any[];
  onDeleteProduct: (slug: string) => Promise<void>;
  onOpenAddProduct: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function AdminProducts({
  products,
  onDeleteProduct,
  onOpenAddProduct,
  searchQuery,
  setSearchQuery,
}: AdminProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'instock'>('all');
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [viewingSizeProduct, setViewingSizeProduct] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'clothing', label: 'Apparel' },
    { id: 'flight', label: 'Flight' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const filteredProducts = products.filter((p) => {
    // Search filter
    const matchesSearch =
      !searchQuery ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === 'all' ||
      p.categorySlug?.toLowerCase() === selectedCategory.toLowerCase();

    // Stock filter
    let matchesStock = true;
    if (stockFilter === 'low') {
      matchesStock = (p.stock || 0) <= 5;
    } else if (stockFilter === 'instock') {
      matchesStock = (p.stock || 0) > 5;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    setDeletingSlug(slug);
    try {
      await onDeleteProduct(slug);
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
                selectedCategory === cat.id
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Stock & Count Indicators */}
        <div className="flex items-center gap-2 self-end md:self-auto text-xs">
          <select
            value={stockFilter}
            onChange={(e: any) => setStockFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 outline-none text-xs font-medium cursor-pointer"
          >
            <option value="all">Stock: All</option>
            <option value="low">Low Stock (≤ 5)</option>
            <option value="instock">In Stock (&gt; 5)</option>
          </select>

          <span className="text-[11px] font-mono text-zinc-400 px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
            {filteredProducts.length} / {products.length}
          </span>
        </div>
      </div>

      {/* High-Density Data Table */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950/70 border-b border-zinc-800/80 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Item Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock Level</th>
                <th className="py-3 px-4">Shoe Sizes</th>
                <th className="py-3 px-4">Badge</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-xs mx-auto space-y-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mx-auto">
                        <Package className="w-5 h-5" />
                      </div>
                      <p className="text-zinc-300 font-semibold text-xs">No products found</p>
                      <p className="text-[11px] text-zinc-400">
                        Try clearing active filters or add a new shoe to the catalog.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLow = (p.stock || 0) <= 5;
                  const isDeleting = deletingSlug === p.slug;

                  return (
                    <tr
                      key={p._id || p.slug}
                      className="hover:bg-zinc-800/30 transition-colors group"
                    >
                      {/* Item Details */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/60 overflow-hidden relative shrink-0">
                            <Image
                              src={p.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <Link
                              href={`/products/${p.slug}`}
                              target="_blank"
                              className="font-semibold text-white hover:text-zinc-300 transition-colors inline-flex items-center gap-1 truncate max-w-full"
                            >
                              <span className="truncate">{p.name}</span>
                              <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0 group-hover:text-zinc-300 transition-colors" />
                            </Link>
                            <p className="text-[11px] text-zinc-400 truncate">{p.subtitle || 'Sportswear'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-400 uppercase">
                        {p.categorySlug || 'shoes'}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-white">
                          ${p.price?.toFixed(2)}
                        </div>
                        {p.salePrice && (
                          <div className="text-red-400 text-[10px] font-mono">
                            Sale: ${p.salePrice.toFixed(2)}
                          </div>
                        )}
                      </td>

                      {/* Stock Level Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                            isLow
                              ? 'bg-red-950/80 text-red-400 border-red-800/40'
                              : 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isLow ? 'bg-red-400' : 'bg-emerald-400'
                            }`}
                          />
                          <span>{p.stock} units</span>
                        </span>
                      </td>

                      {/* Sizes Button */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setViewingSizeProduct(p)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono font-semibold transition-colors"
                          title="View Shoe Size Inventory"
                        >
                          <Layers className="w-3 h-3 text-zinc-400" />
                          <span>{p.sizes?.length || 0} Sizes</span>
                        </button>
                      </td>

                      {/* Badges */}
                      <td className="py-3 px-4">
                        {p.badge ? (
                          <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-semibold text-zinc-300 border border-zinc-700/60">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            title="Preview on Store"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleDelete(p.slug, p.name)}
                            disabled={isDeleting}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer disabled:opacity-50"
                            title="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shoe Sizes Breakdown Modal */}
      {viewingSizeProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 relative overflow-hidden border border-zinc-700">
                  <Image
                    src={viewingSizeProduct.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'}
                    alt={viewingSizeProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{viewingSizeProduct.name}</h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Total In Stock: {viewingSizeProduct.stock} units
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingSizeProduct(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-zinc-800 pt-3">
              <p className="text-xs font-semibold text-zinc-300 mb-2">Available Size Matrix:</p>
              <div className="grid grid-cols-3 gap-2">
                {viewingSizeProduct.sizes?.map((sz: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800 text-center"
                  >
                    <p className="text-xs font-bold text-white font-mono">{sz}</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">In Stock</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingSizeProduct(null)}
                className="px-4 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
