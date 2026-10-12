import Link from 'next/link';
import { Sparkles, Truck, RefreshCw, Zap } from 'lucide-react';

export default function MembershipBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> SPORTIX Club Membership
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter leading-tight">
            BECOME A MEMBER.
            <br />
            GET YOUR ALL-ACCESS PASS.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-medium">
            Join a global community of athletes, runners, and street culture tastemakers. Members enjoy free delivery, priority release access, and 30-day wear trials.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 pb-2">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Free Delivery</h4>
                <p className="text-xs text-zinc-400 mt-0.5">On all member orders with no minimum spend.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Early Drop Access</h4>
                <p className="text-xs text-zinc-400 mt-0.5">First dibs on limited sneaker releases & collaborations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">30-Day Trial</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Test your shoes on the road. Return hassle-free if not in love.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-white text-zinc-950 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Join Us For Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-3.5 bg-transparent border border-zinc-700 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
