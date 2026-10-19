'use client';

import React, { useState } from 'react';
import {
  Building2,
  Store,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Percent,
  Star,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Package,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  X,
  Loader2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { Vendor } from '@/lib/vendors-data';

interface AdminVendorsProps {
  vendors: any[];
  onRefresh: () => Promise<void>;
  onViewVendorProducts?: (vendorSlug: string) => void;
}

export default function AdminVendors({
  vendors,
  onRefresh,
  onViewVendorProducts,
}: AdminVendorsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Form State
  const initialFormState = {
    name: '',
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    commissionRate: '10',
    status: 'active',
    notes: '',
  };
  const [form, setForm] = useState(initialFormState);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingVendor(null);
    setForm(initialFormState);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (v: any) => {
    setEditingVendor(v);
    setForm({
      name: v.name || '',
      company: v.company || '',
      contactPerson: v.contactPerson || '',
      email: v.email || '',
      phone: v.phone || '',
      address: v.address || '',
      city: v.city || 'Dhaka',
      commissionRate: v.commissionRate !== undefined ? String(v.commissionRate) : '10',
      status: v.status || 'active',
      notes: v.notes || '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      const url = editingVendor
        ? `/api/vendors/${editingVendor._id || editingVendor.slug}`
        : '/api/vendors';
      const method = editingVendor ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save vendor details');
      }

      setIsModalOpen(false);
      await onRefresh();
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Vendor Active / Inactive Status
  const handleToggleStatus = async (vendor: any) => {
    const newStatus = vendor.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(`/api/vendors/${vendor._id || vendor.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await onRefresh();
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  // Delete Vendor Handler
  const handleDelete = async (vendor: any) => {
    if (
      !confirm(
        `Are you sure you want to delete vendor "${vendor.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/vendors/${vendor._id || vendor.slug}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        await onRefresh();
      } else {
        alert(data.error || 'Failed to delete vendor');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  // Filtered vendors
  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      !searchQuery ||
      v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === 'active').length;
  const totalAssignedProducts = vendors.reduce(
    (acc, v) => acc + (v.productCount || 0),
    0
  );
  const avgCommission =
    totalVendors > 0
      ? (
          vendors.reduce((acc, v) => acc + (v.commissionRate || 10), 0) /
          totalVendors
        ).toFixed(1)
      : '0';

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
              <Store className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Vendor & Supplier Hub</span>
                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono text-xs border border-zinc-700/60">
                  {vendors.length} Verified
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Centralized shoe suppliers, commission contracts, stock attribution, and brand partners.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            title="Refresh Vendors"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Vendor</span>
          </button>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Vendors */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Suppliers</span>
            <Building2 className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">{totalVendors}</span>
            <span className="text-[11px] text-emerald-400 font-medium">10 Initial Brands</span>
          </div>
        </div>

        {/* Active Suppliers */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Active Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">
              {activeVendors}
            </span>
            <span className="text-[11px] text-zinc-400">/ {totalVendors} operational</span>
          </div>
        </div>

        {/* Assigned Catalog Products */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Catalog Products</span>
            <Package className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">
              {totalAssignedProducts}
            </span>
            <span className="text-[11px] text-zinc-400">linked shoes</span>
          </div>
        </div>

        {/* Avg Commission */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Avg Store Cut</span>
            <Percent className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-purple-400">
              {avgCommission}%
            </span>
            <span className="text-[11px] text-zinc-400">standard commission</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
              statusFilter === 'all'
                ? 'bg-zinc-800 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            All Vendors ({vendors.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
              statusFilter === 'active'
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            Active ({activeVendors})
          </button>
          <button
            onClick={() => setStatusFilter('inactive')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
              statusFilter === 'inactive'
                ? 'bg-red-950/80 text-red-400 border border-red-800/40 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            Inactive ({vendors.length - activeVendors})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendor, city, contact..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-zinc-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Vendors Table / Cards View */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                <th className="py-3 px-4">Vendor & Company</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">City / Location</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4">Inventory</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    <Store className="w-8 h-8 mx-auto mb-2 text-zinc-600 opacity-60" />
                    <p className="font-medium text-sm text-zinc-300">No vendors found</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Try adjusting your search query or add a new vendor supplier.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredVendors.map((v) => {
                  const isActive = v.status === 'active';
                  // Brand initials
                  const initials = v.name
                    ?.split(' ')
                    .slice(0, 2)
                    .map((word: string) => word[0])
                    .join('')
                    .toUpperCase() || 'VN';

                  return (
                    <tr
                      key={v._id || v.slug}
                      className="hover:bg-zinc-800/30 transition-colors group"
                    >
                      {/* Name & Company */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-zinc-800 to-zinc-950 border border-zinc-700/70 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 shrink-0 shadow-xs">
                            {initials}
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <div className="font-bold text-white text-sm truncate flex items-center gap-1.5">
                              <span>{v.name}</span>
                              {v.rating >= 4.8 && (
                                <span className="inline-flex items-center text-[10px] text-amber-400 font-mono" title={`Rating: ${v.rating}`}>
                                  <Star className="w-3 h-3 fill-amber-400" />
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-400 truncate">
                              {v.company || v.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 text-[11px]">
                          <div className="font-medium text-zinc-200">
                            {v.contactPerson || 'Direct Representative'}
                          </div>
                          <div className="text-zinc-400 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-zinc-500 shrink-0" />
                            <a
                              href={`mailto:${v.email}`}
                              className="hover:text-zinc-200 transition-colors truncate max-w-[160px]"
                            >
                              {v.email}
                            </a>
                          </div>
                          {v.phone && (
                            <div className="text-zinc-500 font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3 text-zinc-500 shrink-0" />
                              <span>{v.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* City & Address */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-1.5 text-zinc-300">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-zinc-200 text-xs">
                              {v.city || 'Dhaka'}
                            </div>
                            <p className="text-[10px] text-zinc-400 line-clamp-1 max-w-[150px]">
                              {v.address || 'Bangladesh'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Commission Rate */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-950/70 border border-purple-800/40 text-purple-300 font-bold text-xs">
                          <Percent className="w-3 h-3 text-purple-400" />
                          <span>{v.commissionRate || 10}%</span>
                        </span>
                      </td>

                      {/* Inventory Count */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700/60 text-zinc-200 font-mono text-xs">
                          <Package className="w-3 h-3 text-zinc-400" />
                          <span>{v.productCount || 0} Shoes</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(v)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40 hover:bg-emerald-900/60'
                              : 'bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:bg-zinc-700'
                          }`}
                          title="Click to toggle status"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-emerald-400' : 'bg-zinc-500'
                            }`}
                          />
                          <span className="capitalize">{v.status || 'active'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(v)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            title="Edit Vendor"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(v)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                            title="Delete Vendor"
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

      {/* Add / Edit Vendor Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-4 sm:p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  {editingVendor ? 'Edit Vendor Supplier' : 'Register New Vendor Supplier'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-lg bg-red-950/80 border border-red-800/60 text-red-400 flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Vendor Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Apex Footwear Ltd."
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Company Registered Legal Name
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Apex Footwear Limited"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    placeholder="e.g. Md. Rafiqul Islam"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="supply@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+880 1711-000000"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 font-mono focus:outline-hidden focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    City / Division
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Dhaka"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-hidden focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Commission (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    value={form.commissionRate}
                    onChange={(e) => setForm({ ...form, commissionRate: e.target.value })}
                    placeholder="10"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono font-bold focus:outline-hidden focus:border-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Warehouse / Physical Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="e.g. Gulshan-1, Dhaka"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Supplier Contract Notes / Brand Scope
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Authorized distributor for premium leather and sports lines..."
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-zinc-700 resize-none"
                />
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Operational Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={form.status === 'active'}
                      onChange={() => setForm({ ...form, status: 'active' })}
                      className="accent-emerald-500"
                    />
                    <span>Active (Can assign shoes)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={form.status === 'inactive'}
                      onChange={() => setForm({ ...form, status: 'inactive' })}
                      className="accent-red-500"
                    />
                    <span>Inactive (Paused)</span>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingVendor ? 'Save Changes' : 'Create Vendor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
