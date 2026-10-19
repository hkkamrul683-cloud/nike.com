import { getCollection } from '@/lib/mongodb';
import HeroCampaign from '@/components/home/HeroCampaign';
import TrendingCarousel from '@/components/home/TrendingCarousel';
import ShopBySport from '@/components/home/ShopBySport';
import FeaturedSpotlight from '@/components/home/FeaturedSpotlight';
import MembershipBanner from '@/components/home/MembershipBanner';

export default async function HomePage() {
  let trendingProducts: any[] = [];
  let bestsellerProducts: any[] = [];

  try {
    const productsCol = await getCollection('products');
    trendingProducts = await productsCol
      .find({ isFeatured: true })
      .limit(8)
      .toArray();

    bestsellerProducts = await productsCol
      .find({ isBestseller: true })
      .limit(8)
      .toArray();
  } catch (error) {
    console.error('Error loading products for homepage:', error);
  }

  // Convert MongoDB documents to plain serializable objects for React Client Components
  const serialize = (items: any[]) =>
    items.map((item) => {
      const plain = JSON.parse(JSON.stringify(item));
      return {
        ...plain,
        _id: item._id?.toString() || plain._id,
        categoryId: item.categoryId?.toString() || plain.categoryId,
        vendorId: item.vendorId?.toString() || plain.vendorId,
      };
    });

  const trending = serialize(trendingProducts);
  const bestsellers = serialize(bestsellerProducts);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Full Width Editorial Hero Banner */}
      <HeroCampaign />

      {/* 2. Trending Products Carousel */}
      <TrendingCarousel
        products={trending}
        title="Trending Silhouettes"
        subtitle="This week's most-demanded footwear and athletic apparel"
        viewAllLink="/products?featured=true"
      />

      {/* 3. Editorial Spotlight */}
      <FeaturedSpotlight />

      {/* 4. Shop By Sport Grid */}
      <ShopBySport />

      {/* 5. Best Sellers Carousel */}
      <TrendingCarousel
        products={bestsellers}
        title="Best Sellers"
        subtitle="Time-tested athlete favorites with verified reviews"
        viewAllLink="/products?bestseller=true"
      />

      {/* 6. Membership Banner */}
      <MembershipBanner />
    </div>
  );
}
