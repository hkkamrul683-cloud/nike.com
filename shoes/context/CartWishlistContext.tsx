'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackAddToCart, trackRemoveFromCart } from '@/lib/analytics';

export interface CartItem {
  id: string; // generated unique cart item id (e.g. productId-size-color)
  productId: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  image: string;
  color: string;
  size: string;
  quantity: number;
  stock?: number;
}

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  image: string;
  category?: string;
  subtitle?: string;
}

export interface AppliedCoupon {
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minOrder: number;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  image?: string;
  phone?: string;
  addresses?: any[];
}

interface CartWishlistContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCartItems: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  coupon: AppliedCoupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;

  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export function CartWishlistProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Initialize from localStorage and fetch current user
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sportix_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('sportix_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCoupon = localStorage.getItem('sportix_coupon');
      if (savedCoupon) setCoupon(JSON.parse(savedCoupon));
    } catch (e) {
      console.error('Failed reading from localStorage', e);
    }

    refreshUser();
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sportix_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sportix_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem('sportix_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('sportix_coupon');
      }
    } catch (e) {
      console.error(e);
    }
  }, [coupon]);

  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user) setUser(data.user);
      }
    } catch (e) {
      console.error('Error fetching session:', e);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/';
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const itemKey = `${newItem.productId}-${newItem.size}-${newItem.color}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.id === itemKey ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem, id: itemKey }];
    });
    setIsCartDrawerOpen(true);

    // Trigger Analytics Tracking for GTM, Meta Pixel & GA4
    trackAddToCart(
      {
        id: newItem.productId,
        name: newItem.name,
        price: newItem.price,
        salePrice: newItem.salePrice,
        size: newItem.size,
        color: newItem.color,
      },
      newItem.quantity
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = cart.find((i) => i.id === cartItemId);
    if (itemToRemove) {
      trackRemoveFromCart(
        {
          id: itemToRemove.productId,
          name: itemToRemove.name,
          price: itemToRemove.price,
          salePrice: itemToRemove.salePrice,
        },
        itemToRemove.quantity
      );
    }
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.productId === item.productId);
      if (exists) {
        return prev.filter((w) => w.productId !== item.productId);
      }
      return [...prev, item];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((w) => w.productId === productId);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  let discountAmount = 0;
  if (coupon && subtotal >= coupon.minOrder) {
    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = (subtotal * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }
  }

  // Free shipping above $150
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 12.00;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setCoupon(data.coupon);
        return { success: true, message: `Coupon ${data.coupon.code} applied!` };
      } else {
        return { success: false, message: data.message || 'Invalid promo code' };
      }
    } catch {
      return { success: false, message: 'Failed to apply coupon' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartItems,
        subtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        coupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        setUser,
        logout,
        refreshUser,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
}
