'use client';

import React, { useState } from 'react';
import {
  Star,
  Trash2,
  CheckCircle,
  MessageSquare,
  Search,
  Filter,
  Package,
  Calendar,
  User,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import Image from 'next/image';

interface Review {
  _id: string;
  productId: string;
  productName: string;
  productImage: string | null;
  productSlug: string | null;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: string;
  createdAt: string;
}

interface AdminReviewsProps {
  reviews: Review[];
  onDeleteReview: (id: string) => Promise<void>;
  onToggleStatus?: (id: string, currentStatus: string) => Promise<void>;
}

export default function AdminReviews({ reviews, onDeleteReview, onToggleStatus }: AdminReviewsProps) {
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.productName.toLowerCase().includes(search.toLowerCase()) ||
      r.userName.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase());

    const matchesRating = filterRating === 'all' || r.rating === filterRating;

    return matchesSearch && matchesRating;
  });

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this customer review?')) return;
    setDeletingId(id);
    try {
      await onDeleteReview(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            Reviews & Social Proof Moderation
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Monitor customer feedback, ratings, and moderate verified buyer reviews.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search reviews or products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-lg pl-9 pr-3 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
      </div>

      {/* Review Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Average Rating</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xl font-bold text-white">{avgRating}</span>
              <span className="text-xs text-zinc-500">/ 5.0</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Total Verified Reviews</p>
            <p className="text-xl font-bold text-white">{reviews.length}</p>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Filter by Stars</p>
            <div className="flex items-center gap-1 mt-1">
              {['all', 5, 4, 3, 2, 1].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterRating(st as any)}
                  className={`px-2 py-0.5 text-xs rounded transition-colors ${
                    filterRating === st
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {st === 'all' ? 'All' : `${st}★`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-12 text-center text-zinc-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
            <p className="text-sm">No reviews found matching your criteria.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 sm:p-5 hover:border-zinc-700/80 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              {/* Product Info & Review Content */}
              <div className="flex items-start gap-4 flex-1">
                {/* Product Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-zinc-800 border border-zinc-700/80 overflow-hidden relative shrink-0">
                  {rev.productImage ? (
                    <Image
                      src={rev.productImage}
                      alt={rev.productName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <Package className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Review Body */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-white truncate">{rev.productName}</p>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rev.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-zinc-700'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-zinc-300 ml-1.5">{rev.rating}.0</span>
                    {rev.title && (
                      <span className="text-xs font-semibold text-zinc-200 ml-2">
                        &quot;{rev.title}&quot;
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
                    {rev.comment}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono pt-1">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {rev.userName}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(rev.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-col items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800">
                <button
                  onClick={() => handleDelete(rev._id)}
                  disabled={deletingId === rev._id}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {deletingId === rev._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
