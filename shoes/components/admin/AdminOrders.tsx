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
  Package,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';
import AdminInvoiceModal from './AdminInvoiceModal';

interface AdminOrdersProps {
  orders: any[];
  onUpdateStatus: (orderId: string, status: string) => Promise<void>;
  onOrderUpdated?: (order: any) => void;
  searchQuery: string;
}

export default function AdminOrders({
  orders,
  onUpdateStatus,
  onOrderUpdated,
  searchQuery,
}: AdminOrdersProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<any | null>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<any | null>(null);
  const [dispatchAlert, setDispatchAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const statuses = [
    { id: 'all', label: 'All Orders' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'SHIPPED', label: 'Shipped' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'RETURN_REQUESTED', label: 'Returns' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  const handleDispatchCourier = async (orderId: string) => {
    setDispatchingId(orderId);
    setDispatchAlert(null);
    try {
      const res = await fetch('/api/courier/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch order to courier');
      }

      setDispatchAlert({
        type: 'success',
        message: `Order dispatched to Steadfast Courier! Consignment ID: #${data.consignment?.consignment_id} (Tracking: ${data.consignment?.tracking_code})`,
      });

      if (onOrderUpdated && data.order) {
        onOrderUpdated(data.order);
      }
    } catch (err: any) {
      setDispatchAlert({
        type: 'error',
        message: err.message || 'Error communicating with courier service.',
      });
    } finally {
      setDispatchingId(null);
      setTimeout(() => setDispatchAlert(null), 6000);
    }
  };

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

      {/* Courier Dispatch Alert */}
      {dispatchAlert && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 animate-in fade-in ${
            dispatchAlert.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/80 border-red-500/40 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {dispatchAlert.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span className="font-medium">{dispatchAlert.message}</span>
          </div>
          <button
            onClick={() => setDispatchAlert(null)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
                <th className="py-3 px-4">Courier Dispatch</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-zinc-400 text-xs">
                    No orders matching active filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const currentStatus = (o.status || 'PROCESSING').toUpperCase();
                  const isUpdating = updatingId === o._id;
                  const isDispatching = dispatchingId === o._id;
                  const hasCourier = Boolean(o.courier?.consignmentId);

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
                        {o.customerPhone && (
                          <p className="text-[10px] text-zinc-500 font-mono">{o.customerPhone}</p>
                        )}
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

                      {/* Total Amount & Payment Badge */}
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-white text-xs">
                          ${o.totalAmount?.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                            o.paymentMethod === 'SSLCOMMERZ' ? 'bg-pink-950/40 border-pink-500/30 text-pink-300' :
                            o.paymentMethod === 'STRIPE' ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300' :
                            'bg-zinc-800 border-zinc-700 text-zinc-300'
                          }`}>
                            {o.paymentMethod === 'SSLCOMMERZ' ? 'bKash/SSL' : o.paymentMethod === 'STRIPE' ? 'Stripe' : 'COD'}
                          </span>
                          <span className={`text-[9px] font-mono font-semibold ${o.paymentStatus === 'PAID' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {o.paymentStatus || 'PENDING'}
                          </span>
                        </div>
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

                      {/* Courier Dispatch & Tracking */}
                      <td className="py-3 px-4">
                        {hasCourier ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                                <Truck className="w-3 h-3 text-emerald-400" />
                                {o.courier.provider || 'Steadfast'} #{o.courier.consignmentId}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px]">
                              <span className="text-zinc-400 uppercase font-mono font-semibold">
                                {o.courier.deliveryStatus || 'in_review'}
                              </span>
                              <button
                                onClick={() => setTrackingModalOrder(o)}
                                className="text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
                              >
                                Details
                              </button>
                              <a
                                href={o.courier.trackingUrl || `https://steadfast.com.bd/t/${o.courier.trackingCode || o.trackingNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white flex items-center gap-0.5"
                              >
                                Live <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDispatchCourier(o._id)}
                            disabled={isDispatching || o.status === 'CANCELLED'}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold transition-colors disabled:opacity-40 cursor-pointer shadow-sm shadow-emerald-950/30"
                            title="Send order parcel to Steadfast Courier"
                          >
                            <Truck className={`w-3.5 h-3.5 ${isDispatching ? 'animate-bounce text-emerald-400' : 'text-emerald-400'}`} />
                            <span>{isDispatching ? 'Dispatching...' : 'Send to Steadfast'}</span>
                          </button>
                        )}
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

      {/* Courier Tracking Details Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Steadfast Courier Tracking</h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Order: {trackingModalOrder.orderNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-mono block">Consignment ID</span>
                  <span className="font-mono font-bold text-white text-sm">
                    #{trackingModalOrder.courier?.consignmentId || 'Pending'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-mono block">Tracking Code</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {trackingModalOrder.courier?.trackingCode || trackingModalOrder.trackingNumber}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-mono block">Delivery Status</span>
                  <span className="font-mono font-bold text-white uppercase text-xs">
                    {trackingModalOrder.courier?.deliveryStatus || 'in_review'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-mono block">COD to Collect</span>
                  <span className="font-mono font-bold text-amber-400 text-xs">
                    ৳{(trackingModalOrder.courier?.codAmountBDT ?? 0).toLocaleString()} BDT
                  </span>
                </div>
              </div>

              <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase font-mono block">Recipient Details</span>
                <p className="font-semibold text-zinc-200">{trackingModalOrder.customerName}</p>
                <p className="text-zinc-400">{trackingModalOrder.customerPhone || trackingModalOrder.shippingAddress?.phone}</p>
                <p className="text-zinc-400 text-[11px]">
                  {trackingModalOrder.shippingAddress?.addressLine1}, {trackingModalOrder.shippingAddress?.city}
                </p>
              </div>

              {trackingModalOrder.courier?.isDemo && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Sandbox Mode: This is a simulated consignment. Real consignments will be booked when live API keys are saved.</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
              >
                Close
              </button>
              <a
                href={trackingModalOrder.courier?.trackingUrl || `https://steadfast.com.bd/t/${trackingModalOrder.courier?.trackingCode || trackingModalOrder.trackingNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-lg shadow-emerald-950/40"
              >
                <span>Track on Steadfast</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {invoiceOrder && (
        <AdminInvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
      )}
    </div>
  );
}
