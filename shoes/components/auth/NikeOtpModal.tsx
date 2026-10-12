'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';

interface NikeOtpModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  // If embedded directly on /login page
  isInlinePage?: boolean;
}

export default function NikeOtpModal({
  isOpen,
  onClose,
  isInlinePage = false,
}: NikeOtpModalProps) {
  const router = useRouter();
  const { isAuthModalOpen, closeAuthModal, refreshUser, user } = useCartWishlist();

  // Active state controlled either via props or context
  const activeOpen = isInlinePage ? true : (isOpen !== undefined ? isOpen : isAuthModalOpen);
  const handleClose = onClose || closeAuthModal;

  const [step, setStep] = useState<'PHONE' | 'OTP' | 'SUCCESS'>('PHONE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown for resending OTP
  useEffect(() => {
    let timer: any;
    if (step === 'OTP' && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  // Reset modal state when opened/closed
  useEffect(() => {
    if (!activeOpen) {
      // Small delay so animation finishes
      const t = setTimeout(() => {
        setStep('PHONE');
        setPhoneNumber('');
        setOtpCode(['', '', '', '', '', '']);
        setErrorMsg(null);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [activeOpen]);

  // Clean 10 digits
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const isPhoneValid = cleanPhone.length === 10;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (raw.length <= 10) {
      setPhoneNumber(raw);
      setErrorMsg(null);
    }
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isPhoneValid) return;

    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send OTP. Please try again.');
      }

      setStep('OTP');
      setCountdown(30);
      setCanResend(false);
      setOtpCode(['', '', '', '', '', '']);

      // Auto-focus first OTP input after render
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = digit;
    setOtpCode(newOtp);
    setErrorMsg(null);

    // Auto-advance
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits entered
    if (digit && index === 5) {
      const fullCode = newOtp.join('');
      if (fullCode.length === 6) {
        verifyOtp(fullCode);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePasteOtp = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const newOtp = [...otpCode];
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i];
      }
      setOtpCode(newOtp);
      if (pasted.length === 6) {
        verifyOtp(pasted);
      } else {
        otpInputRefs.current[Math.min(pasted.length, 5)]?.focus();
      }
    }
  };

  const verifyOtp = async (codeToVerify?: string) => {
    const finalOtp = codeToVerify || otpCode.join('');
    if (finalOtp.length !== 6) {
      setErrorMsg('Please enter the full 6-digit OTP code');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          otp: finalOtp,
          name: name.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid OTP code');
      }

      await refreshUser();
      setStep('SUCCESS');

      setTimeout(() => {
        if (!isInlinePage) {
          handleClose();
        } else {
          router.push('/account');
        }
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };


  if (!activeOpen) return null;

  const modalBody = (
    <div
      className="relative w-full max-w-[440px] bg-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 shadow-2xl transition-all border border-zinc-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button '×' at top right (exact match with image) */}
      {!isInlinePage && (
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-5 top-5 sm:right-7 sm:top-7 text-zinc-500 hover:text-black transition-colors p-1.5 rounded-full hover:bg-zinc-100 cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[1.75]" />
        </button>
      )}

      {/* Back button on OTP step */}
      {step === 'OTP' && (
        <button
          onClick={() => {
            setStep('PHONE');
            setErrorMsg(null);
          }}
          className="absolute left-5 top-5 sm:left-7 sm:top-7 text-zinc-500 hover:text-black transition-colors p-1.5 rounded-full hover:bg-zinc-100 cursor-pointer flex items-center gap-1 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      )}

      {/* Nike Swoosh Vector Logo (exact silhouette) */}
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

      {/* STEP 1: Enter Phone Number (Exact Nike UI) */}
      {step === 'PHONE' && (
        <div className="mt-4">
          <h2 className="text-[22px] sm:text-[24px] font-bold text-center text-zinc-950 tracking-tight leading-tight">
            Log in to your account
          </h2>
          <p className="text-[13px] sm:text-sm text-zinc-500 text-center mt-1.5 font-normal">
            Get personalised picks & faster checkout
          </p>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSendOtp} className="mt-6 space-y-5">
            {/* Outlined Input Box (Identical to image) */}
            <div className="relative border border-zinc-300 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 focus-within:border-black transition-colors bg-white">
              <input
                type="tel"
                inputMode="numeric"
                autoFocus
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter 10-digit mobile number"
                className="w-full bg-transparent outline-none text-zinc-900 text-sm sm:text-base font-medium placeholder:text-zinc-400 placeholder:font-normal"
                maxLength={10}
              />
            </div>

            {/* "Get OTP" Button */}
            <button
              type="submit"
              disabled={!isPhoneValid || isLoading}
              className={`w-full py-3.5 sm:py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                isPhoneValid && !isLoading
                  ? 'bg-black text-white hover:bg-zinc-800 cursor-pointer shadow-md active:scale-[0.99]'
                  : 'bg-[#E5E5E5] text-[#8D8D8D] cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Sending code...' : 'Get OTP'}
            </button>
          </form>

          {/* Terms & Privacy Policy (Exact text & styling from image) */}
          <div className="mt-8 text-center text-[11px] sm:text-xs text-zinc-600 leading-relaxed font-normal">
            By entering this site, you agree to the <br />
            <a
              href="/terms"
              className="font-bold underline text-zinc-900 hover:text-black cursor-pointer"
            >
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a
              href="/privacy"
              className="font-bold underline text-zinc-900 hover:text-black cursor-pointer"
            >
              Privacy Policy
            </a>
          </div>

          {/* Optional fallback for email/password user or admin */}
          <div className="mt-6 pt-4 border-t border-zinc-100 text-center">
            <a
              href="/login?mode=password"
              className="text-xs text-zinc-500 hover:text-black transition-colors font-medium hover:underline"
            >
              Or sign in with Email & Password
            </a>
          </div>
        </div>
      )}

      {/* STEP 2: Enter OTP Code */}
      {step === 'OTP' && (
        <div className="mt-4">
          <h2 className="text-[22px] sm:text-[24px] font-bold text-center text-zinc-950 tracking-tight leading-tight">
            Enter the 6-digit code
          </h2>
          <p className="text-[13px] sm:text-sm text-zinc-500 text-center mt-1.5 font-normal">
            Code sent to <span className="font-semibold text-zinc-800">+880 {phoneNumber}</span>{' '}
            <button
              onClick={() => setStep('PHONE')}
              className="text-black underline font-bold ml-1 text-xs hover:text-zinc-700"
            >
              Edit
            </button>
          </p>

          {errorMsg && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 6 Digit Input Boxes */}
          <div className="mt-6 flex justify-between gap-2 on-paste" onPaste={handlePasteOtp}>
            {otpCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpInputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={`w-11 sm:w-12 h-13 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border transition-all outline-none ${
                  digit
                    ? 'border-black bg-zinc-50 text-black'
                    : 'border-zinc-300 text-zinc-800 focus:border-black focus:ring-1 focus:ring-black'
                }`}
              />
            ))}
          </div>

          {/* Optional Name for new user */}
          <div className="mt-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name (optional)"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 outline-none focus:border-zinc-950 text-zinc-800 placeholder:text-zinc-400"
            />
          </div>

          {/* Continue / Verify Button */}
          <button
            type="button"
            onClick={() => verifyOtp()}
            disabled={otpCode.join('').length !== 6 || isLoading}
            className={`w-full py-3.5 sm:py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 mt-5 ${
              otpCode.join('').length === 6 && !isLoading
                ? 'bg-black text-white hover:bg-zinc-800 cursor-pointer shadow-md active:scale-[0.99]'
                : 'bg-[#E5E5E5] text-[#8D8D8D] cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Verifying code...' : 'Continue'}
          </button>

          {/* Resend OTP Timer */}
          <div className="mt-5 text-center text-xs text-zinc-500 font-medium">
            {canResend ? (
              <button
                type="button"
                onClick={() => handleSendOtp()}
                className="text-black font-bold underline hover:text-zinc-700 cursor-pointer"
              >
                Resend OTP
              </button>
            ) : (
              <span>Resend code in <strong className="text-zinc-800 font-mono">{countdown}s</strong></span>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Success State */}
      {step === 'SUCCESS' && (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900">Welcome to Nike / SPORTIX!</h3>
          <p className="text-xs text-zinc-500">
            Successfully verified and logged in. Loading your personalized profile...
          </p>
        </div>
      )}
    </div>
  );

  // If used as popup modal with backdrop
  if (!isInlinePage) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleClose}
      >
        {modalBody}
      </div>
    );
  }

  // If used inline inside page
  return modalBody;
}
