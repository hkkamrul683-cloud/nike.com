'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  DollarSign,
  ShieldCheck,
  User,
  ArrowUpRight,
  X,
  ExternalLink,
} from 'lucide-react';

interface Customer {
  _id: string;
  name: string;
  email: string;
  role: string;
  addresses: any[];
  createdAt: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string | null;
}

interface AdminCustomersProps {
  customers: Customer[];
  orders: any[];
}

export default function AdminCustomers({ customers, orders }: AdminCustomersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const totalSpentAll = customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0);
  const activeShoppers = customers.filter((c) => c.orderCount > 0).length;

  const getCustomerOrders = (email: string) => {
    return orders.filter(
      (o) => (o.customerEmail || '').toLowerCase() === email.toLowerCase()
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            Customer Relationship Management
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track registered buyers, lifetime order volume, and customer value.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-lg pl-9 pr-3 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Total Registered</p>
            <p className="text-xl font-bold text-white">{customers.length}</p>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Active Buyers</p>
            <p className="text-xl font-bold text-white">
              {activeShoppers}{' '}
              <span className="text-xs text-zinc-500 font-normal">
                ({customers.length ? Math.round((activeShoppers / customers.length) * 100) : 0}%)
              </span>
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Total Customer Spend</p>
            <p className="text-xl font-bold text-white">
              ${totalSpentAll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-400 font-mono">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No customers found matching &quot;{searchQuery}&quot;
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const initials = cust.name
                    ? cust.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)
                    : 'U';

                  return (
                    <tr key={cust._id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-zinc-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{cust.name}</p>
                            <p className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                              <Mail className="w-3 h-3 text-zinc-500" />
                              {cust.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {cust.role === 'ADMIN' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            <ShieldCheck className="w-3 h-3" />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                            <User className="w-3 h-3 text-zinc-400" />
                            Buyer
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium">
                        <span
                          className={`px-2 py-0.5 rounded-md text-xs ${
                            cust.orderCount > 0
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold'
                              : 'text-zinc-500'
                          }`}
                        >
                          {cust.orderCount} {cust.orderCount === 1 ? 'order' : 'orders'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        ${cust.totalSpent.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 text-xs text-zinc-400 font-mono">
                        {new Date(cust.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-md px-2.5 py-1 transition-colors"
                        >
                          View Details
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {selectedCustomer.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{selectedCustomer.name}</h3>
                  <p className="text-xs text-zinc-400 font-mono">{selectedCustomer.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Quick Stat Blocks */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-950/60 border border-zinc-800 p-3 rounded-lg text-center">
                  <p className="text-[11px] text-zinc-500 uppercase font-mono">Orders Placed</p>
                  <p className="text-lg font-bold text-white mt-0.5">{selectedCustomer.orderCount}</p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-800 p-3 rounded-lg text-center">
                  <p className="text-[11px] text-zinc-500 uppercase font-mono">Lifetime Value</p>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">
                    ${selectedCustomer.totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-800 p-3 rounded-lg text-center">
                  <p className="text-[11px] text-zinc-500 uppercase font-mono">Account Role</p>
                  <p className="text-sm font-bold text-purple-400 mt-1">{selectedCustomer.role}</p>
                </div>
              </div>

              {/* Order History for this Customer */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-3">
                  Recent Purchase History
                </h4>
                {getCustomerOrders(selectedCustomer.email).length === 0 ? (
                  <p className="text-xs text-zinc-500 italic bg-zinc-950/40 border border-zinc-800/80 p-4 rounded-lg text-center">
                    No orders recorded yet for this customer.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {getCustomerOrders(selectedCustomer.email).map((order) => (
                      <div
                        key={order._id}
                        className="bg-zinc-950/50 border border-zinc-800/80 p-3 rounded-lg flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-mono font-semibold text-white">{order.orderNumber}</p>
                          <p className="text-zinc-500 text-[11px]">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} item(s)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-white">${order.totalAmount?.toFixed(2)}</p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
