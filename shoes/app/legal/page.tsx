export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 pb-4 border-b border-zinc-200">
        Terms of Sale & Privacy Policy
      </h1>

      <div className="space-y-6 text-xs text-zinc-600 leading-relaxed">
        <h2 className="text-sm font-bold uppercase text-zinc-950">1. Orders & Pricing</h2>
        <p>
          All prices displayed are in United States Dollars (USD). SPORTIX verifies inventory availability and payment authorizations in real time. We reserve the right to decline or cancel orders if fraud is suspected or inventory has been exhausted.
        </p>

        <h2 className="text-sm font-bold uppercase text-zinc-950">2. Free 30-Day Returns</h2>
        <p>
          Products purchased through sportix.com may be returned within 30 days of delivery. Shoes may be wear-tested outside. Items must be returned in their original box with all included accessories.
        </p>

        <h2 className="text-sm font-bold uppercase text-zinc-950">3. Privacy & Data Security</h2>
        <p>
          Your customer information, addresses, and payment transactions are secured using industry-standard TLS encryption. We never sell or distribute your private contact details to third-party marketing companies.
        </p>
      </div>
    </div>
  );
}
