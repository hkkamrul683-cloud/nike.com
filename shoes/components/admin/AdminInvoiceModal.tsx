'use client';

import React from 'react';
import {
  Printer,
  X,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Truck,
} from 'lucide-react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: {
    fullName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string | null;
  totalAmount: number;
  trackingNumber?: string;
}

interface AdminInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function AdminInvoiceModal({ order, onClose }: AdminInvoiceModalProps) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-zinc-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8 print:m-0 print:p-0 print:shadow-none print:w-full print:max-w-none print:rounded-none">
        {/* Modal Controls (Hidden when printed) */}
        <div className="bg-zinc-900 text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Invoice & Packing Slip — {order.orderNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Invoice
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area */}
        <div id="printable-invoice" className="p-8 sm:p-12 space-y-8 bg-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 pb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black flex items-center gap-1.5">
                SPORTIX<span className="text-zinc-400 font-normal text-lg">.com</span>
              </h1>
              <p className="text-xs text-zinc-500 mt-1">Premium Performance Footwear & Athletics</p>
              <p className="text-xs text-zinc-500 font-mono">Tax / VAT ID: BD-84920491-01</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-900 rounded font-mono text-xs font-bold uppercase tracking-wider mb-2">
                Official Receipt / Invoice
              </span>
              <p className="font-mono text-base font-bold text-zinc-900">
                Invoice #: {order.orderNumber}
              </p>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">Date: {formattedDate}</p>
              <p className="text-xs text-zinc-500 font-mono">
                Tracking: {order.trackingNumber || 'PENDING'}
              </p>
            </div>
          </div>

          {/* Billing & Shipping Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
            <div className="space-y-1.5 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <p className="font-bold uppercase tracking-wider text-zinc-400 text-[10px] font-mono">
                Deliver To (Customer)
              </p>
              <p className="font-bold text-sm text-zinc-900">
                {order.customerName || order.shippingAddress?.fullName}
              </p>
              <p className="text-zinc-600">
                {order.shippingAddress?.addressLine1}
                {order.shippingAddress?.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}
              </p>
              <p className="text-zinc-600">
                {order.shippingAddress?.city}{' '}
                {order.shippingAddress?.postalCode ? `- ${order.shippingAddress.postalCode}` : ''}
              </p>
              <p className="text-zinc-600 font-mono pt-1">
                Phone: {order.customerPhone || order.shippingAddress?.phone || 'N/A'}
              </p>
              <p className="text-zinc-600 font-mono">Email: {order.customerEmail}</p>
            </div>

            <div className="space-y-1.5 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <p className="font-bold uppercase tracking-wider text-zinc-400 text-[10px] font-mono">
                Order & Payment Info
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-zinc-500 block text-[11px]">Payment Method:</span>
                  <span className="font-semibold text-zinc-900 uppercase font-mono">
                    {order.paymentMethod?.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Payment Status:</span>
                  <span className="font-semibold text-emerald-700 font-mono">
                    {order.paymentStatus || 'PAID'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Fulfillment:</span>
                  <span className="font-semibold text-zinc-900 uppercase font-mono">
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Courier:</span>
                  <span className="font-semibold text-zinc-900 font-mono">Steadfast Express</span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-100 border-b border-zinc-200 text-zinc-600 font-mono uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Item Description</th>
                  <th className="py-3 px-4 text-center">Size / Spec</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {order.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">
                      {item.name}
                      {item.color && (
                        <span className="block text-[11px] font-normal text-zinc-500">
                          Colorway: {item.color}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className="px-2 py-0.5 bg-zinc-100 rounded text-zinc-800 font-bold">
                        {item.size || 'Standard'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold">{item.quantity}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-600">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-zinc-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4">
            <div className="text-xs text-zinc-500 max-w-sm space-y-1">
              <p className="font-bold text-zinc-700">Thank you for your order!</p>
              <p>
                Eligible for hassle-free 7-day size exchange. Original box & unworn condition
                required. For assistance contact support@sportix.com.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs border-t sm:border-t-0 pt-4 sm:pt-0">
              <div className="flex justify-between text-zinc-600 font-mono">
                <span>Subtotal:</span>
                <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-mono font-semibold">
                  <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}:</span>
                  <span>-${order.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600 font-mono">
                <span>Shipping & Handling:</span>
                <span>
                  {order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee?.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-zinc-900 font-mono pt-2 border-t border-zinc-200">
                <span>Grand Total:</span>
                <span>${order.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Barcode Placeholder */}
          <div className="border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>Authorized by SPORTIX Operations Team</span>
            <span className="tracking-widest font-bold text-zinc-600 mt-2 sm:mt-0">
              * {order.orderNumber} *
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
