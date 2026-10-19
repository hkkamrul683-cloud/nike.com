'use client';

import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Truck,
  Percent,
  Megaphone,
  CreditCard,
  Building,
  Save,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Activity,
  ExternalLink,
  Target,
  BarChart,
  Eye,
  Check,
  Globe,
  Package,
  EyeOff,
  Wallet,
  Send,
  RefreshCw,
} from 'lucide-react';

export interface StoreSettings {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  storeAddress: string;
  currency: string;
  currencySymbol: string;
  insideCityShippingFee: number;
  outsideCityShippingFee: number;
  freeShippingThreshold: number;
  taxRate: number;
  heroAnnouncement: string;
  heroAnnouncementActive: boolean;
  enableCashOnDelivery: boolean;
  enableOnlinePayment: boolean;
  returnPolicyDays: number;
  // Courier Logistics
  courierProvider?: string;
  steadfastApiKey?: string;
  steadfastSecretKey?: string;
  steadfastSandbox?: boolean;
  steadfastAutoDispatch?: boolean;
  // Marketing & Pixels
  metaPixelId?: string;
  metaPixelActive?: boolean;
  gaId?: string;
  gaActive?: boolean;
  gtmId?: string;
  gtmActive?: boolean;
  clarityId?: string;
  clarityActive?: boolean;
  googleSiteVerification?: string;
}

interface AdminSettingsProps {
  initialSettings?: Partial<StoreSettings>;
  onSaveSettings: (settings: StoreSettings) => Promise<boolean>;
}

export default function AdminSettings({ initialSettings, onSaveSettings }: AdminSettingsProps) {
  const [formData, setFormData] = useState<StoreSettings>({
    storeName: initialSettings?.storeName || 'SPORTIX Athletic Footwear',
    contactEmail: initialSettings?.contactEmail || 'support@sportix.com',
    contactPhone: initialSettings?.contactPhone || '+880 1700-123456',
    storeAddress: initialSettings?.storeAddress || 'Level 4, Gulshan-2, Dhaka 1212, Bangladesh',
    currency: initialSettings?.currency || 'USD',
    currencySymbol: initialSettings?.currencySymbol || '$',
    insideCityShippingFee: initialSettings?.insideCityShippingFee ?? 5.00,
    outsideCityShippingFee: initialSettings?.outsideCityShippingFee ?? 12.00,
    freeShippingThreshold: initialSettings?.freeShippingThreshold ?? 150.00,
    taxRate: initialSettings?.taxRate ?? 5,
    heroAnnouncement:
      initialSettings?.heroAnnouncement ||
      'Spring 2026 Collection Live: Free Delivery on orders over $150 with code SPORTIX',
    heroAnnouncementActive: initialSettings?.heroAnnouncementActive ?? true,
    enableCashOnDelivery: initialSettings?.enableCashOnDelivery ?? true,
    enableOnlinePayment: initialSettings?.enableOnlinePayment ?? true,
    returnPolicyDays: initialSettings?.returnPolicyDays ?? 7,
    // Courier Logistics
    courierProvider: initialSettings?.courierProvider || 'steadfast',
    steadfastApiKey: initialSettings?.steadfastApiKey || '',
    steadfastSecretKey: initialSettings?.steadfastSecretKey || '',
    steadfastSandbox: initialSettings?.steadfastSandbox ?? true,
    steadfastAutoDispatch: initialSettings?.steadfastAutoDispatch ?? false,
    // Marketing & Pixels
    metaPixelId: initialSettings?.metaPixelId || '',
    metaPixelActive: initialSettings?.metaPixelActive ?? true,
    gaId: initialSettings?.gaId || '',
    gaActive: initialSettings?.gaActive ?? true,
    gtmId: initialSettings?.gtmId || '',
    gtmActive: initialSettings?.gtmActive ?? true,
    clarityId: initialSettings?.clarityId || '',
    clarityActive: initialSettings?.clarityActive ?? true,
    googleSiteVerification: initialSettings?.googleSiteVerification || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isTestingCourier, setIsTestingCourier] = useState(false);
  const [courierTestResult, setCourierTestResult] = useState<{
    success: boolean;
    message: string;
    balance?: number;
  } | null>(null);

  const handleTestCourier = async () => {
    setIsTestingCourier(true);
    setCourierTestResult(null);
    try {
      const res = await fetch('/api/courier/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: formData.steadfastApiKey,
          secretKey: formData.steadfastSecretKey,
        }),
      });
      const data = await res.json();
      setCourierTestResult({
        success: data.success,
        message: data.message || (data.success ? 'Steadfast connection verified.' : 'Connection failed.'),
        balance: data.balance,
      });
    } catch (e: any) {
      setCourierTestResult({
        success: false,
        message: e.message || 'Network error communicating with Steadfast.',
      });
    } finally {
      setIsTestingCourier(false);
    }
  };

  useEffect(() => {
    if (initialSettings) {
      setFormData((prev) => ({ ...prev, ...initialSettings }));
    }
  }, [initialSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const ok = await onSaveSettings(formData);
      if (ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-purple-400" />
            Store Configuration & Logistics
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Configure delivery charges, announcement banner, and store policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Settings Saved
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors shadow-lg shadow-white/10 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving Changes...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping & Delivery Logistics */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/80">
            <Truck className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">Shipping & Delivery Rates</h3>
          </div>

          <div className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Inside City / Standard Delivery ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.insideCityShippingFee}
                onChange={(e) =>
                  setFormData({ ...formData, insideCityShippingFee: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 font-mono"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Flat shipping fee for local/metro orders.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Outside City / Nationwide Express ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.outsideCityShippingFee}
                onChange={(e) =>
                  setFormData({ ...formData, outsideCityShippingFee: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 font-mono"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Long-distance courier charge.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Free Shipping Threshold ($)
              </label>
              <input
                type="number"
                step="1"
                value={formData.freeShippingThreshold}
                onChange={(e) =>
                  setFormData({ ...formData, freeShippingThreshold: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 font-mono"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Orders with cart subtotal higher than this amount receive free delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Marketing & Announcement Bar CMS */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/80">
            <Megaphone className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm">Banner & Announcement Bar CMS</h3>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
              <div>
                <p className="text-xs font-semibold text-white">Show Announcement Top Bar</p>
                <p className="text-[11px] text-zinc-500">
                  Displays a sleek promo ticker at the top of the storefront.
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.heroAnnouncementActive}
                onChange={(e) =>
                  setFormData({ ...formData, heroAnnouncementActive: e.target.checked })
                }
                className="w-4 h-4 accent-white rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Announcement Message / Promo Text
              </label>
              <textarea
                rows={3}
                value={formData.heroAnnouncement}
                onChange={(e) => setFormData({ ...formData, heroAnnouncement: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Size Exchange & Return Window (Days)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={formData.returnPolicyDays}
                  onChange={(e) =>
                    setFormData({ ...formData, returnPolicyDays: parseInt(e.target.value, 10) || 7 })
                  }
                  className="w-28 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 font-mono"
                />
                <span className="text-xs text-zinc-400">days from delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Store Profile & Contact */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/80">
            <Building className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Store Profile & Invoicing Info</h3>
          </div>

          <div className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Official Business / Brand Name
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Hotline Phone
                </label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Physical Warehouse / Store Address
              </label>
              <input
                type="text"
                value={formData.storeAddress}
                onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Taxes & Payments */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/80">
            <CreditCard className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-sm">Taxes & Payment Methods</h3>
          </div>

          <div className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Estimated VAT / Sales Tax Rate (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  value={formData.taxRate}
                  onChange={(e) =>
                    setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })
                  }
                  className="w-28 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 font-mono"
                />
                <span className="text-xs text-zinc-400">% applied at checkout</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                <div>
                  <p className="text-xs font-semibold text-white">Cash On Delivery (COD)</p>
                  <p className="text-[11px] text-zinc-500">Pay when receiving the shoe parcel</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableCashOnDelivery}
                  onChange={(e) =>
                    setFormData({ ...formData, enableCashOnDelivery: e.target.checked })
                  }
                  className="w-4 h-4 accent-white rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                <div>
                  <p className="text-xs font-semibold text-white">Online Cards & Mobile Wallets</p>
                  <p className="text-[11px] text-zinc-500">Visa, MasterCard, bKash, Nagad</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableOnlinePayment}
                  onChange={(e) =>
                    setFormData({ ...formData, enableOnlinePayment: e.target.checked })
                  }
                  className="w-4 h-4 accent-white rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Courier & Parcel Fulfillment Logistics (Steadfast Courier API) */}
        <div className="md:col-span-2 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 border border-emerald-500/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl shadow-emerald-950/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">Courier & Parcel Fulfillment API</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Steadfast Express
                  </span>
                  {formData.steadfastSandbox && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Sandbox Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Automate parcel booking, COD collection, consignment IDs, and live tracking with Steadfast Courier.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://portal.steadfast.com.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors border border-zinc-700"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Steadfast Portal
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Courier Provider & Mode */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Primary Delivery Courier Partner
                </label>
                <select
                  value={formData.courierProvider || 'steadfast'}
                  onChange={(e) => setFormData({ ...formData, courierProvider: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="steadfast">Steadfast Courier (Recommended - Bangladesh)</option>
                  <option value="pathao">Pathao Courier</option>
                  <option value="redx">RedX Delivery</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <div>
                    <p className="text-xs font-semibold text-white">Sandbox / Simulation Mode</p>
                    <p className="text-[11px] text-zinc-400">
                      Generate simulated consignments risk-free without deducting courier balance
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.steadfastSandbox ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, steadfastSandbox: e.target.checked })
                    }
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <div>
                    <p className="text-xs font-semibold text-white">Auto-Dispatch to Courier</p>
                    <p className="text-[11px] text-zinc-400">
                      Automatically book parcel upon new customer order creation
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.steadfastAutoDispatch ?? false}
                    onChange={(e) =>
                      setFormData({ ...formData, steadfastAutoDispatch: e.target.checked })
                    }
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* API Credentials */}
            <div className="space-y-4 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-zinc-300">
                    Steadfast API Key
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    {showApiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showApiKey ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="Paste your Steadfast API Key"
                  value={formData.steadfastApiKey || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, steadfastApiKey: e.target.value.trim() })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 placeholder:text-zinc-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-zinc-300">
                    Steadfast Secret Key
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    {showSecretKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSecretKey ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <input
                  type={showSecretKey ? 'text' : 'password'}
                  placeholder="Paste your Steadfast Secret Key"
                  value={formData.steadfastSecretKey || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, steadfastSecretKey: e.target.value.trim() })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 placeholder:text-zinc-600"
                />
              </div>

              {/* Test Connection Button & Result */}
              <div className="pt-1">
                <button
                  type="button"
                  disabled={isTestingCourier}
                  onClick={handleTestCourier}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTestingCourier ? 'animate-spin' : ''}`} />
                  <span>{isTestingCourier ? 'Testing Connection...' : 'Test Connection & Account Balance'}</span>
                </button>

                {courierTestResult && (
                  <div
                    className={`mt-2 p-2.5 rounded-lg text-xs border flex items-start gap-2 ${
                      courierTestResult.success
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                        : 'bg-red-950/60 border-red-500/40 text-red-300'
                    }`}
                  >
                    {courierTestResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{courierTestResult.message}</p>
                      {courierTestResult.balance !== undefined && (
                        <p className="text-[11px] font-mono mt-0.5 text-zinc-300">
                          Current Courier Balance: <strong>৳{courierTestResult.balance.toLocaleString()} BDT</strong>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Pixels & Conversion Tracking (Full Width) */}
        <div className="md:col-span-2 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 border border-indigo-500/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl shadow-indigo-950/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">Marketing Pixels & Conversion Tracking</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Live Telemetry
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Configure Meta Pixel, Google Analytics 4, GTM & Microsoft Clarity directly from the dashboard.
                </p>
              </div>
            </div>

            <a
              href="https://business.facebook.com/events_manager2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors border border-zinc-700 shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Meta Events Manager
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Meta (Facebook) Pixel Card */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-blue-500/30 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-xs">
                    f
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Meta (Facebook) Pixel
                      {formData.metaPixelActive && formData.metaPixelId ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <Check className="w-2.5 h-2.5" /> Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-zinc-400">Track Ads, ROAS & Dynamic Retargeting</p>
                  </div>
                </div>

                <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.metaPixelActive ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, metaPixelActive: e.target.checked })
                    }
                    className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
                  />
                  <span className="text-[11px] font-medium text-zinc-400">Enable</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Meta Pixel ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. 123456789012345"
                  value={formData.metaPixelId || ''}
                  onChange={(e) => setFormData({ ...formData, metaPixelId: e.target.value.trim() })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500 placeholder:text-zinc-600"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/30 text-[11px] text-blue-200/80 space-y-1">
                <p className="font-semibold text-blue-300">Wired E-Commerce Events:</p>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-mono">
                  PageView • ViewContent • AddToCart • InitiateCheckout • Purchase
                </p>
              </div>
            </div>

            {/* 2. Google Analytics 4 (GA4) Card */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Google Analytics 4 (GA4)
                      {formData.gaActive && formData.gaId ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <Check className="w-2.5 h-2.5" /> Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-zinc-400">Direct gtag.js Measurement Stream</p>
                  </div>
                </div>

                <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.gaActive ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, gaActive: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <span className="text-[11px] font-medium text-zinc-400">Enable</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  GA4 Measurement ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. G-XXXXXXXXXX"
                  value={formData.gaId || ''}
                  onChange={(e) => setFormData({ ...formData, gaId: e.target.value.trim() })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400">
                Pushes enhanced ecommerce data for product impressions and conversions directly to Google.
              </div>
            </div>

            {/* 3. Google Tag Manager (GTM) Card */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    T
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Google Tag Manager (GTM)
                      {formData.gtmActive && formData.gtmId ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <Check className="w-2.5 h-2.5" /> Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-zinc-400">Container & DataLayer Events</p>
                  </div>
                </div>

                <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.gtmActive ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, gtmActive: e.target.checked })
                    }
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                  <span className="text-[11px] font-medium text-zinc-400">Enable</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  GTM Container ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. GTM-XXXXXXX"
                  value={formData.gtmId || ''}
                  onChange={(e) => setFormData({ ...formData, gtmId: e.target.value.trim() })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 placeholder:text-zinc-600"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400">
                Automatically pushes <code className="text-cyan-400 font-mono text-[10px]">dataLayer</code> events for tag triggers and third-party advertising tags.
              </div>
            </div>

            {/* 4. Microsoft Clarity Card */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Microsoft Clarity
                      {formData.clarityActive && formData.clarityId ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <Check className="w-2.5 h-2.5" /> Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-zinc-400">Heatmaps & Visitor Replays</p>
                  </div>
                </div>

                <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.clarityActive ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, clarityActive: e.target.checked })
                    }
                    className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                  />
                  <span className="text-[11px] font-medium text-zinc-400">Enable</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Clarity Project ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. jf4k9s82l1"
                  value={formData.clarityId || ''}
                  onChange={(e) => setFormData({ ...formData, clarityId: e.target.value.trim() })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500 placeholder:text-zinc-600"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400">
                Records free mouse movement heatmaps, click rage metrics, and scroll depth on the store.
              </div>
            </div>

            {/* 5. Search Console Verification (Full Width Row) */}
            <div className="md:col-span-2 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white">Google Search Console Verification Token</h4>
              </div>
              <input
                type="text"
                placeholder="e.g. google-site-verification=XXXXXXXXXXXXXXXXXXXXXXX"
                value={formData.googleSiteVerification || ''}
                onChange={(e) => setFormData({ ...formData, googleSiteVerification: e.target.value.trim() })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 placeholder:text-zinc-600"
              />
              <p className="text-[11px] text-zinc-500">
                Injected into root metadata for automatic domain ownership verification in Google Search Console.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
