import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// 1. Load original seed categories, original seed products, coupons
const { SEED_CATEGORIES, SEED_PRODUCTS: initialSeedProducts, SEED_COUPONS } = await import('../lib/seed-data.ts');

// 2. Load DB dump (23 valid existing products)
const dbDump = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'existing-db-products.json'), 'utf8'));
const validDbProducts = dbDump.filter(p => p.slug !== 'zdthsttsfc');

// 3. Load 83 new products
const { NEW_PRODUCTS } = await import('./new-products-data.mjs');

// 4. Merge all products uniquely by slug
const productMap = new Map();

// Helper to normalize product document to match SeedProduct interface
function normalizeProduct(prod) {
  return {
    name: prod.name,
    slug: prod.slug,
    subtitle: prod.subtitle || `${prod.gender.toUpperCase()} ${prod.sport} Sportswear`,
    description: prod.description || '',
    details: Array.isArray(prod.details) && prod.details.length > 0 ? prod.details : [
      'Engineered with premium performance materials',
      'Ergonomic athletic fit for maximum range of motion',
      'Breathable, lightweight construction built to endure',
      'Iconic SPORTIX branding and durable detailing'
    ],
    price: Number(prod.price) || 99,
    ...(prod.salePrice ? { salePrice: Number(prod.salePrice) } : {}),
    stock: Number(prod.stock) || 50,
    categorySlug: prod.categorySlug,
    gender: prod.gender,
    sport: prod.sport,
    ...(prod.badge ? { badge: prod.badge } : {}),
    isFeatured: Boolean(prod.isFeatured),
    isNew: Boolean(prod.isNew),
    isBestseller: Boolean(prod.isBestseller),
    colors: Array.isArray(prod.colors) && prod.colors.length > 0 ? prod.colors : ['Black / White', 'Triple Black'],
    colorway: prod.colorway || (prod.colors && prod.colors[0]) || 'Standard Edition',
    sizes: Array.isArray(prod.sizes) && prod.sizes.length > 0 ? prod.sizes : (
      prod.categorySlug === 'shoes' || prod.categorySlug === 'flight'
        ? ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12']
        : ['S', 'M', 'L', 'XL', '2XL']
    ),
    images: Array.isArray(prod.images) && prod.images.length > 0 ? prod.images : [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85'
    ],
    sku: prod.sku || `SPX-${prod.slug.substring(0, 10).toUpperCase()}-01`,
  };
}

// Add original seed products first
for (const p of initialSeedProducts) {
  productMap.set(p.slug, normalizeProduct(p));
}

// Add valid DB dump products
for (const p of validDbProducts) {
  if (!productMap.has(p.slug)) {
    productMap.set(p.slug, normalizeProduct(p));
  }
}

// Add newly designed products
for (const p of NEW_PRODUCTS) {
  if (!productMap.has(p.slug)) {
    productMap.set(p.slug, normalizeProduct(p));
  }
}

const allProducts = Array.from(productMap.values());
console.log(`Total unique merged products: ${allProducts.length}`);

// Generate TypeScript seed-data.ts content
const tsContent = `export interface SeedCategory {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface SeedProduct {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  details: string[];
  price: number;
  salePrice?: number;
  stock: number;
  categorySlug: string;
  gender: 'men' | 'women' | 'kids' | 'unisex';
  sport: 'running' | 'basketball' | 'football' | 'training' | 'lifestyle';
  badge?: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  colors: string[];
  colorway: string;
  sizes: string[];
  images: string[];
  sku: string;
}

export const SEED_CATEGORIES: SeedCategory[] = ${JSON.stringify(SEED_CATEGORIES, null, 2)};

export const SEED_PRODUCTS: SeedProduct[] = ${JSON.stringify(allProducts, null, 2)};

export const SEED_COUPONS = ${JSON.stringify(SEED_COUPONS, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../lib/seed-data.ts'), tsContent, 'utf8');
console.log(`Successfully updated ../lib/seed-data.ts with ${allProducts.length} products!`);

// Now Seed to MongoDB Atlas directly
const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
if (!uri) {
  console.error('Missing MONGODB_URI');
  process.exit(1);
}

const client = new MongoClient(uri);

async function runDatabaseSeed() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas...');
    const db = client.db(process.env.MONGODB_DB || 'shoes');

    const categoriesCol = db.collection('categories');
    const productsCol = db.collection('products');
    const reviewsCol = db.collection('reviews');

    // Clean up any rogue junk document like 'zdthsttsfc'
    await productsCol.deleteOne({ slug: 'zdthsttsfc' });

    // Category mapping
    const categoryMap = new Map();
    for (const cat of SEED_CATEGORIES) {
      const existing = await categoriesCol.findOne({ slug: cat.slug });
      let catId;
      if (existing) {
        catId = existing._id;
        await categoriesCol.updateOne(
          { _id: catId },
          { $set: { name: cat.name, description: cat.description, image: cat.image, updatedAt: new Date() } }
        );
      } else {
        const res = await categoriesCol.insertOne({
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          image: cat.image,
          createdAt: new Date(),
        });
        catId = res.insertedId;
      }
      categoryMap.set(cat.slug, catId);
    }

    // Upsert all products
    let count = 0;
    const athletePersonas = [
      { name: 'Marcus Sterling', title: 'Unbelievable comfort and propulsion', text: 'Trained for my fall marathon in these. Zero hotspots, super springy rebound, and looks incredible on foot.' },
      { name: 'Jordan Blake', title: 'Top tier athletic footwear', text: 'SPORTIX hit a home run with this silhouette. Lockdown is 10/10 and the materials feel exceptionally premium.' },
      { name: 'Elena Rostova', title: 'Great fit, true to size', text: 'Outstanding traction and stylish design. Molded perfectly to my foot after the second training session.' },
      { name: 'Sophia Chen', title: 'Best purchase of the season', text: 'Super lightweight and high-energy return. Wore them for both track intervals and street runs.' },
      { name: 'Liam O\'Connor', title: 'Elite quality and durable materials', text: 'High-wear areas hold up remarkably well. The aesthetics and grip are unmatched on any surface.' },
      { name: 'Maya Patel', title: 'Extremely versatile and breathable', text: 'Keeps feet cool even during high-humidity workouts. True to size and gorgeous colorway in person.' }
    ];

    for (const prod of allProducts) {
      const catId = categoryMap.get(prod.categorySlug) || Array.from(categoryMap.values())[0];

      const productDoc = {
        name: prod.name,
        slug: prod.slug,
        subtitle: prod.subtitle,
        description: prod.description,
        details: prod.details,
        price: prod.price,
        salePrice: prod.salePrice || null,
        stock: prod.stock,
        categoryId: catId,
        categorySlug: prod.categorySlug,
        gender: prod.gender,
        sport: prod.sport,
        badge: prod.badge || null,
        isFeatured: prod.isFeatured,
        isNew: prod.isNew,
        isBestseller: prod.isBestseller,
        colors: prod.colors,
        colorway: prod.colorway,
        sizes: prod.sizes,
        images: prod.images,
        sku: prod.sku,
        updatedAt: new Date(),
      };

      const res = await productsCol.findOneAndUpdate(
        { slug: prod.slug },
        {
          $set: productDoc,
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true, returnDocument: 'after' }
      );

      const prodId = res?._id;

      // Seed reviews for featured or bestseller products if no reviews exist
      if ((prod.isFeatured || prod.isBestseller) && prodId) {
        const reviewExists = await reviewsCol.findOne({ productId: prodId });
        if (!reviewExists) {
          const sampleReviews = [
            athletePersonas[count % athletePersonas.length],
            athletePersonas[(count + 1) % athletePersonas.length],
            athletePersonas[(count + 2) % athletePersonas.length],
          ];

          await reviewsCol.insertMany(sampleReviews.map((rev, i) => ({
            productId: prodId,
            userName: rev.name,
            rating: i === 2 ? 4 : 5,
            title: rev.title,
            comment: rev.text,
            verifiedPurchase: true,
            createdAt: new Date(Date.now() - (i * 4 + 2) * 24 * 60 * 60 * 1000),
          })));
        }
      }

      count++;
    }

    const totalInDb = await productsCol.countDocuments();
    const totalReviews = await reviewsCol.countDocuments();
    console.log(`✅ Database seeding finished successfully!`);
    console.log(`Total products in MongoDB Atlas: ${totalInDb}`);
    console.log(`Total reviews in MongoDB Atlas: ${totalReviews}`);

  } finally {
    await client.close();
  }
}

runDatabaseSeed().catch(err => {
  console.error('Database seeding error:', err);
  process.exit(1);
});
