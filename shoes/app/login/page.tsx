'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, User } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { useCartWishlist } from '@/context/CartWishlistContext';

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useCartWishlist();

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

  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <Logo size="lg" className="justify-center mb-2" />
          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">
            Sign In to SPORTIX
          </h1>
          <p className="text-xs text-zinc-500 font-medium">
            Enter your credentials to access your member profile, bag, and orders.
          </p>
        </div>

        {/* Quick Demo Credentials */}
        <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs space-y-2">
          <p className="font-bold text-zinc-800 uppercase tracking-wider text-[11px]">
            ⚡ Quick Demo Sign-in:
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => fillDemo('admin@sportix.com', 'Admin123!')}
              className="flex-1 py-1.5 px-3 bg-zinc-900 text-white rounded-lg font-semibold hover:bg-zinc-800 text-[11px] flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Account
            </button>
            <button
              type="button"
              onClick={() => fillDemo('member@sportix.com', 'Member123!')}
              className="flex-1 py-1.5 px-3 bg-zinc-200 text-zinc-900 rounded-lg font-semibold hover:bg-zinc-300 text-[11px] flex items-center justify-center gap-1"
            >
              <User className="w-3.5 h-3.5" /> Member Account
            </button>
          </div>
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
                className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950 font-medium"
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
                className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-zinc-950 font-medium"
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

        <div className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-100">
          Not a member yet?{' '}
          <Link href="/register" className="font-bold text-zinc-950 hover:underline">
            Join SPORTIX Club
          </Link>
        </div>
      </div>
    </div>
  );
}
