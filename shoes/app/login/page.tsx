'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, ArrowRight, AlertCircle, Smartphone } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { useCartWishlist } from '@/context/CartWishlistContext';
import NikeOtpModal from '@/components/auth/NikeOtpModal';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'password' ? 'password' : 'otp';

  const { refreshUser } = useCartWishlist();
  const [authMode, setAuthMode] = useState<'otp' | 'password'>(initialMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      await refreshUser();
      if (data.user?.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center px-4 py-12 overflow-hidden bg-[#e6e6e6]">
      {/* Background Athlete Runner Image (Exactly matching the screenshot atmosphere) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2000&q=80"
          alt="Athlete background"
          fill
          priority
          className="object-cover object-center filter grayscale contrast-125 brightness-95 opacity-80"
        />
        <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-[2px]" />
      </div>

      {/* Main Centered Login Container */}
      <div className="relative z-10 w-full flex justify-center">
        {authMode === 'otp' ? (
          /* Exact Nike OTP Login Modal Card */
          <NikeOtpModal isInlinePage={true} />
        ) : (
          /* Traditional Email & Password Form for Admins / Password Users */
          <div className="max-w-[440px] w-full bg-white p-7 sm:p-10 rounded-[28px] sm:rounded-[32px] border border-zinc-100 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              {/* Nike Swoosh */}
              <div className="flex justify-center pt-1">
                <svg
                  className="w-16 h-7 text-black transition-transform hover:scale-105"
                  viewBox="0 0 64 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M58.74 3.25C42.84 12.3 27.8 17.5 15.48 17.5c-5.43 0-9.52-2.3-9.52-6.95 0-2.8 1.72-5 4.63-6.1-4.73 1.05-8.69 4.15-8.69 8.85 0 6.65 6.83 11.9 17.38 11.9 14.82 0 31.4-7.75 39.46-21.95z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-950 mt-4">
                Sign In with Password
              </h1>
              <p className="text-xs text-zinc-500 font-medium">
                Enter your credentials or switch to fast Mobile OTP sign-in.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950 font-medium text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-700 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950 font-medium text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Switch back to OTP */}
            <div className="pt-3 border-t border-zinc-100 text-center space-y-2">
              <button
                type="button"
                onClick={() => setAuthMode('otp')}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-700 hover:text-black font-semibold hover:underline cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" /> Switch to Mobile Number / OTP Login
              </button>
              <div className="text-xs text-zinc-500">
                Not a member yet?{' '}
                <button
                  onClick={() => setAuthMode('otp')}
                  className="font-bold text-zinc-950 hover:underline cursor-pointer"
                >
                  Join SPORTIX Club
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
