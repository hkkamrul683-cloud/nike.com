import Link from 'next/link';

export default function MembershipBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      {/* HypeKicks Member Banner — clean card style */}
      <div className="bg-[#f5f5f5] rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Text */}
        <div className="space-y-4 max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">HypeKicks Membership</p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 leading-tight">
            Become a HypeKicks Member.<br />Step Into the Future.
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-md">
            Sign up for free. Shop Member-exclusive drops, enjoy free delivery, get early access to new releases, and more.
          </p>

          {/* Benefits row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
            {['Free Delivery', 'Member Drops', 'Early Access', '30-Day Returns'].map((b) => (
              <div key={b} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 inline-block" />
                {b}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/register"
              className="px-7 py-3.5 bg-zinc-950 text-white rounded-full text-sm font-bold hover:bg-zinc-700 transition-colors"
            >
              Join Us for Free
            </Link>
            <Link
              href="/login"
              className="px-7 py-3.5 border border-zinc-400 text-zinc-900 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right — HypeKicks dynamic icon decoration */}
        <div className="hidden lg:flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 h-auto opacity-10 text-zinc-950"
          >
            <path
              d="M4 22C7 22 9.5 21 12 19.5L18.5 15.2C21 13.8 24 13.2 26.5 14.2L28.8 15.3C29.4 15.6 29.6 16.2 29.4 16.8C28.9 18.2 27.5 19.7 25 20.6C21.2 21.9 15.8 22.8 10 22.8C6.8 22.8 4.8 22.4 4 22Z"
              fill="currentColor"
            />
            <path
              d="M9 18.5L12.8 9.5C13.2 8.5 14.2 8 15.3 8H19.5C20.3 8 21 8.5 21.3 9.2L23.8 14.2C21.2 13.2 18.2 13.8 15.8 15.2L9 18.5Z"
              fill="currentColor"
              fillOpacity="0.8"
            />
            <circle cx="26" cy="8.5" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
