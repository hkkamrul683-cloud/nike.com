import Link from 'next/link';

export default function MembershipBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      {/* Nike Member Banner — clean card style */}
      <div className="bg-[#f5f5f5] rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Text */}
        <div className="space-y-4 max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Nike Membership</p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 leading-tight">
            Become a Nike Member.<br />Get the Best of Nike.
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-md">
            Sign up for free. Shop Member-exclusive styles, enjoy free delivery, get early access to new releases, and more.
          </p>

          {/* Benefits row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
            {['Free Delivery', 'Member Prices', 'Early Access', '30-Day Returns'].map((b) => (
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

        {/* Right — Nike Swoosh decoration */}
        <div className="hidden lg:flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 120 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 h-auto opacity-10"
          >
            <path
              d="M14.967 43.378c-3.97.9-7.624-.05-9.742-2.584C2.9 38.03 2.9 33.51 5.17 28.7c1.9-4.07 5.014-7.99 8.623-11.09C8.05 23.668 5.68 30.97 8.03 35.98c.87 1.87 2.58 3.1 4.7 3.56l86.17-32.71c2.18-.826 3.57-2.37 3.86-4.16.23-1.43-.24-2.9-1.34-4.16-.016-.02-.033-.038-.05-.058C115.39 2.23 120 8.16 120 8.16L14.967 43.378Z"
              fill="#111111"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
