'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  ExternalLink,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Search,
  Download,
  Printer,
  RotateCcw,
  FileSpreadsheet,
} from 'lucide-react';
import AdminInvoiceModal from './AdminInvoiceModal';

interface AdminOrdersProps {
  orders: any[];
  onUpdateStatus: (orderId: string, status: string) => Promise<void>;
  searchQuery: string;
}

export default function AdminOrders({
  orders,
  onUpdateStatus,
  searchQuery,
}: AdminOrdersProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<any | null>(null);

  const statuses = [
    { id: 'all', label: 'All Orders' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'SHIPPED', label: 'Shipped' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'RETURN_REQUESTED', label: 'Returns' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  const filteredOrders = orders.filter((o) => {
    const current = (o.status || 'PROCESSING').toUpperCase();
    const matchesStatus =
      selectedStatus === 'all' ||
      current === selectedStatus ||
      (selectedStatus === 'RETURN_REQUESTED' && (current.includes('RETURN') || current.includes('EXCHANGE')));

    const matchesSearch =
      !searchQuery ||
      o.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await onUpdateStatus(orderId, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadgeStyle: Record<string, string> = {
    PROCESSING: 'bg-amber-950/80 text-amber-400 border-amber-800/40',
    SHIPPED: 'bg-blue-950/80 text-blue-400 border-blue-800/40',
    DELIVERED: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40',
    RETURN_REQUESTED: 'bg-purple-950/80 text-purple-400 border-purple-800/40',
    EXCHANGED: 'bg-indigo-950/80 text-indigo-400 border-indigo-800/40',
    CANCELLED: 'bg-red-950/80 text-red-400 border-red-800/40',
  };

  // Export orders to CSV
  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('No orders available to export.');
      return;
    }

    const headers = [
      'Order Number',
      'Date',
      'Customer Name',
      'Email',
      'Phone',
      'Items Count',
      'Subtotal',
      'Shipping Fee',
      'Discount',
      'Total Amount',
      'Status',
      'Payment Method',
      'Shipping Address',
    ];

    const rows = filteredOrders.map((o) => {
      const addr = o.shippingAddress
        ? `"${o.shippingAddress.addressLine1 || ''}, ${o.shippingAddress.city || ''}"`
        : '""';
      return [
        `"${o.orderNumber}"`,
        `"${new Date(o.createdAt).toLocaleDateString()}"`,
        `"${o.customerName || ''}"`,
        `"${o.customerEmail || ''}"`,
        `"${o.customerPhone || ''}"`,
        o.items?.length || 0,
        o.subtotal || 0,
        o.shippingFee || 0,
        o.discount || 0,
        o.totalAmount || 0,
        `"${o.status || 'PROCESSING'}"`,
        `"${o.paymentMethod || 'CARD'}"`,
        addr,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sportix-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {statuses.map((st) => {
            const count =
              st.id === 'all'
                ? orders.length
                : st.id === 'RETURN_REQUESTED'
                ? orders.filter(
                    (o) =>
                      (o.status || '').toUpperCase().includes('RETURN') ||
                      (o.status || '').toUpperCase().includes('EXCHANGE')
                  ).length
                : orders.filter((o) => (o.status || 'PROCESSING').toUpperCase() === st.id).length;

            return (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer font-medium ${
                  selectedStatus === st.id
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <span>{st.label}</span>
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950/80 px-1.5 py-0.2 rounded">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700/80 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <span className="text-[11px] font-mono text-zinc-400 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            {filteredOrders.length} records
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950/70 border-b border-zinc-800/80 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Order Identifier</th>
                <th className="py-3 px-4">Customer Info</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-zinc-400 text-xs">
                    No orders matching active filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const currentStatus = (o.status || 'PROCESSING').toUpperCase();
                  const isUpdating = updatingId === o._id;

                  return (
                    <tr
                      key={o._id || o.orderNumber}
                      className="hover:bg-zinc-800/30 transition-colors"
                    >
                      {/* Order Number */}
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-white text-xs">
                          {o.orderNumber}
                        </span>
                        {o.items && (
                          <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                            {o.items.length} {o.items.length === 1 ? 'item' : 'items'}
                          </p>
                        )}
                      </td>

                      {/* Customer Info */}
                      <td className="py-3 px-4">
                        <p className="font-semibold text-zinc-100">{o.customerName || 'Store Customer'}</p>
                        <p className="text-[11px] text-zinc-400">{o.customerEmail}</p>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-zinc-400 font-mono text-[11px]">
                        {o.createdAt
                          ? new Date(o.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </td>

                      {/* Total Amount */}
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-white text-xs">
                          ${o.totalAmount?.toFixed(2)}
                        </span>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3 px-4">
                        <div className="relative inline-block">
                          <select
                            value={currentStatus}
                            disabled={isUpdating}
                            onChange={(e) => handleStatusChange(o._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase border cursor-pointer outline-none bg-zinc-900 transition-colors ${
                              statusBadgeStyle[currentStatus] || statusBadgeStyle.PROCESSING
                            }`}
                          >
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="RETURN_REQUESTED">RETURN REQ</option>
                            <option value="EXCHANGED">EXCHANGED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions: Print Invoice & View Details */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setInvoiceOrder(o)}
                            title="Generate Printable Invoice & Packing Slip"
                            className="px-2 py-1 rounded-md text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/20 transition-colors inline-flex items-center gap-1"
                          >
                            <Printer className="w-3 h-3" />
                            <span>Invoice</span>
                          </button>
                          <Link
                            href={`/order-confirmation/${o._id || o.orderNumber}`}
                            target="_blank"
                            className="px-2 py-1 rounded-md text-[11px] font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors inline-flex items-center gap-1"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3 text-zinc-500" />
                          </Link>
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

      {/* Printable Invoice Modal */}
      {invoiceOrder && (
        <AdminInvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
      )}
    </div>
  );
}
