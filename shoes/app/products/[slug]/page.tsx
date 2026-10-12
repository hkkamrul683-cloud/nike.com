'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  X,
  Check,
  Ruler,
  AlertCircle,
} from 'lucide-react';
import { useCartWishlist } from '@/context/CartWishlistContext';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart, isInWishlist, toggleWishlist } = useCartWishlist();

  const [productData, setProductData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals & accordions
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    shipping: false,
    care: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) {
          setErrorMsg('Product not found');
          return;
        }
        const data = await res.json();
        setProductData(data);
        if (data.product) {
          setSelectedImage(data.product.images?.[0] || '');
          setSelectedColor(data.product.colorway || data.product.colors?.[0] || 'Standard');
          if (data.product.sizes?.length > 0) {
            setSelectedSize(data.product.sizes[0]);
          }
        }
      } catch (e: any) {
        setErrorMsg(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-zinc-950 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!productData || !productData.product) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-black uppercase">Product Not Found</h1>
        <p className="text-sm text-zinc-500">
          The item you are looking for may have been retired or moved.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const { product, reviews = [], avgRating = 5.0, relatedProducts = [] } = productData;
  const productId = product._id?.toString() || product.slug;
  const isFavorite = isInWishlist(productId);

  const discountPercent =
    product.salePrice && product.salePrice < product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }

    addToCart({
      productId,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice,
      image: selectedImage || product.images?.[0],
      color: selectedColor,
      size: selectedSize,
      quantity,
      stock: product.stock,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    handleAddToCart();
    router.push('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          rating: newReviewRating,
          title: newReviewTitle,
          comment: newReviewComment,
        }),
      });
      if (res.ok) {
        setReviewSuccess(true);
        setTimeout(() => {
          setIsReviewModalOpen(false);
          setReviewSuccess(false);
          setNewReviewTitle('');
          setNewReviewComment('');
          // Refresh product details to show new review
          window.location.reload();
        }, 1200);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 font-medium">
        <Link href="/" className="hover:text-zinc-950">Home</Link>
        <span>/</span>
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-zinc-950 capitalize">
          {product.categorySlug || 'Products'}
        </Link>
        <span>/</span>
        <span className="text-zinc-950 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Two-Column Product Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery (Thumbnails + Primary Zoom View) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto no-scrollbar max-h-[600px] shrink-0">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-100 border-2 transition-all shrink-0 ${
                    selectedImage === img
                      ? 'border-zinc-950 shadow-sm'
                      : 'border-transparent hover:border-zinc-300'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Display Image */}
          <div className="relative flex-1 aspect-square bg-zinc-100 rounded-3xl overflow-hidden group">
            <Image
              src={selectedImage || product.images?.[0]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Buying Controls & Details */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div>
            {product.badge && (
              <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 mb-1">
                {product.badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
              {product.name}
            </h1>
            <p className="text-sm text-zinc-500 font-semibold mt-1">{product.subtitle}</p>

            {/* Price Row */}
            <div className="flex items-center gap-3 mt-3">
              {product.salePrice && product.salePrice > 0 ? (
                <>
                  <span className="text-2xl font-black text-red-600">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-zinc-400 line-through font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-black text-zinc-950">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Reviews Summary */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(avgRating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-zinc-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-zinc-800">{avgRating}</span>
              <span className="text-zinc-400">({reviews.length} reviews)</span>
            </div>
          </div>

          {/* Colorway Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex justify-between">
                <span>Color: <strong className="text-zinc-950">{selectedColor}</strong></span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      selectedColor === color
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 text-zinc-800 hover:border-zinc-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Select Size
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-bold text-zinc-600 hover:text-zinc-950 flex items-center gap-1 underline"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                    selectedSize === size
                      ? 'border-zinc-950 bg-zinc-950 text-white shadow-xs'
                      : 'border-zinc-200 hover:border-zinc-950 text-zinc-800 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Stock alert */}
            <div className="pt-1">
              {product.stock > 0 ? (
                <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock — Ready to ship
                </p>
              ) : (
                <p className="text-xs text-red-600 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Currently Out of Stock
                </p>
              )}
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-4 bg-zinc-950 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full py-3.5 bg-red-600 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              Buy It Now
            </button>

            <button
              onClick={() =>
                toggleWishlist({
                  productId,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  salePrice: product.salePrice,
                  image: selectedImage || product.images?.[0],
                  subtitle: product.subtitle,
                })
              }
              className="w-full py-3 border border-zinc-300 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-800 hover:border-zinc-950 transition-colors flex items-center justify-center gap-2"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-red-600 text-red-600' : 'text-zinc-600'
                }`}
              />
              {isFavorite ? 'Saved to Wishlist' : 'Add to Favorite'}
            </button>
          </div>

          {/* Description Snippet */}
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pt-2">
            {product.description}
          </p>

          {/* Expandable Accordions */}
          <div className="border-t border-zinc-200 pt-4 space-y-3">
            {/* Details & Specs */}
            <div className="border-b border-zinc-200 pb-3">
              <button
                onClick={() => toggleAccordion('details')}
                className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-zinc-950 text-left py-1"
              >
                <span>Product Specifications & Details</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 transition-transform ${
                    openAccordions.details ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordions.details && (
                <ul className="mt-3 space-y-2 text-xs text-zinc-600 list-disc list-inside">
                  {product.details?.map((detail: string, i: number) => (
                    <li key={i}>{detail}</li>
                  ))}
                  <li>Style SKU: {product.sku || 'SPX-2026-CORE'}</li>
                  <li>Origin: Designed for athlete performance</li>
                </ul>
              )}
            </div>

            {/* Shipping & 30-Day Returns */}
            <div className="border-b border-zinc-200 pb-3">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-zinc-950 text-left py-1"
              >
                <span>Free Delivery & 30-Day Wear Trial</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 transition-transform ${
                    openAccordions.shipping ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordions.shipping && (
                <div className="mt-3 text-xs text-zinc-600 space-y-2 leading-relaxed">
                  <p>
                    <strong>Standard Delivery:</strong> Free on orders over $150. Arrives in 2-4 business days.
                  </p>
                  <p>
                    <strong>SPORTIX 30-Day Guarantee:</strong> Wear test your shoes outside on track or trail. If you aren&apos;t 100% satisfied, return them for a full refund within 30 days.
                  </p>
                </div>
              )}
            </div>

            {/* Materials & Care */}
            <div className="border-b border-zinc-200 pb-3">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-zinc-950 text-left py-1"
              >
                <span>Materials & Maintenance</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 transition-transform ${
                    openAccordions.care ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordions.care && (
                <div className="mt-3 text-xs text-zinc-600 space-y-1.5">
                  <p>Upper: Breathable engineered performance textile & synthetic leather</p>
                  <p>Midsole: High-rebound dual-density cushioning foam</p>
                  <p>Care: Spot clean with damp cloth and gentle detergent. Air dry away from direct heat.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-20 pt-12 border-t border-zinc-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(avgRating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-zinc-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-zinc-900">{avgRating} out of 5 stars</span>
            </div>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-6 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-xs text-zinc-500 py-6">
            Be the first athlete to review this product!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev: any, idx: number) => (
              <div
                key={rev._id || idx}
                className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-zinc-300'
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="text-xs font-bold text-zinc-950">{rev.title}</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-200/60 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-semibold text-zinc-700">{rev.userName}</span>
                  {rev.verifiedPurchase && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recommended "You Might Also Like" Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-zinc-200">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">SPORTIX Sizing Chart</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Find your exact fit with standard athlete measurements.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-100 uppercase font-bold text-zinc-700">
                  <tr>
                    <th className="p-2.5">US</th>
                    <th className="p-2.5">UK</th>
                    <th className="p-2.5">EU</th>
                    <th className="p-2.5">CM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-600">
                  <tr><td className="p-2.5 font-bold">7.0</td><td className="p-2.5">6.0</td><td className="p-2.5">40.0</td><td className="p-2.5">25.0</td></tr>
                  <tr><td className="p-2.5 font-bold">7.5</td><td className="p-2.5">6.5</td><td className="p-2.5">40.5</td><td className="p-2.5">25.5</td></tr>
                  <tr><td className="p-2.5 font-bold">8.0</td><td className="p-2.5">7.0</td><td className="p-2.5">41.0</td><td className="p-2.5">26.0</td></tr>
                  <tr><td className="p-2.5 font-bold">8.5</td><td className="p-2.5">7.5</td><td className="p-2.5">42.0</td><td className="p-2.5">26.5</td></tr>
                  <tr><td className="p-2.5 font-bold">9.0</td><td className="p-2.5">8.0</td><td className="p-2.5">42.5</td><td className="p-2.5">27.0</td></tr>
                  <tr><td className="p-2.5 font-bold">9.5</td><td className="p-2.5">8.5</td><td className="p-2.5">43.0</td><td className="p-2.5">27.5</td></tr>
                  <tr><td className="p-2.5 font-bold">10.0</td><td className="p-2.5">9.0</td><td className="p-2.5">44.0</td><td className="p-2.5">28.0</td></tr>
                  <tr><td className="p-2.5 font-bold">10.5</td><td className="p-2.5">9.5</td><td className="p-2.5">44.5</td><td className="p-2.5">28.5</td></tr>
                  <tr><td className="p-2.5 font-bold">11.0</td><td className="p-2.5">10.0</td><td className="p-2.5">45.0</td><td className="p-2.5">29.0</td></tr>
                  <tr><td className="p-2.5 font-bold">12.0</td><td className="p-2.5">11.0</td><td className="p-2.5">46.0</td><td className="p-2.5">30.0</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-zinc-500 italic">
              Tip: For road marathon shoes, we recommend selecting a half size up to account for natural foot swell during long runs.
            </p>
          </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">Review this Product</h3>
              <p className="text-xs text-zinc-500 mt-1">Share your experience with the SPORTIX community.</p>
            </div>

            {reviewSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-emerald-900">Thank you for your review!</p>
                <p className="text-xs text-emerald-700">Your feedback has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReviewRating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-zinc-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Best marathon shoes I have ever owned"
                    className="w-full px-4 py-2.5 text-xs border border-zinc-300 rounded-xl outline-none focus:border-zinc-950"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Detail the fit, durability, cushioning, and performance..."
                    className="w-full px-4 py-2.5 text-xs border border-zinc-300 rounded-xl outline-none focus:border-zinc-950 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full py-3.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
