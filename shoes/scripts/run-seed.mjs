import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
if (!uri) {
  console.error('Missing MONGODB_URI or DATABASE_URL');
  process.exit(1);
}

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas...');
    const db = client.db(process.env.MONGODB_DB || 'shoes');

    const categoriesCol = db.collection('categories');
    const productsCol = db.collection('products');
    const usersCol = db.collection('users');
    const couponsCol = db.collection('coupons');
    const reviewsCol = db.collection('reviews');

    // Import seed data dynamically
    const { SEED_CATEGORIES, SEED_PRODUCTS, SEED_COUPONS } = await import('../lib/seed-data.ts');

    console.log(`Seeding ${SEED_CATEGORIES.length} categories...`);
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

    console.log('Seeding users...');
    const hashedAdminPass = await bcrypt.hash('Admin123!', 10);
    const hashedMemberPass = await bcrypt.hash('Member123!', 10);

    await usersCol.updateOne(
      { email: 'admin@sportix.com' },
      {
        $set: {
          name: 'SPORTIX Admin',
          email: 'admin@sportix.com',
          password: hashedAdminPass,
          role: 'ADMIN',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    const memberResult = await usersCol.findOneAndUpdate(
      { email: 'member@sportix.com' },
      {
        $set: {
          name: 'Alex Rivera',
          email: 'member@sportix.com',
          password: hashedMemberPass,
          role: 'USER',
          phone: '+1 (555) 234-5678',
          addresses: [
            {
              id: 'addr-1',
              fullName: 'Alex Rivera',
              addressLine1: '742 Evergreen Terrace',
              addressLine2: 'Apt 4B',
              city: 'Springfield',
              state: 'OR',
              postalCode: '97477',
              country: 'United States',
              isDefault: true,
            },
          ],
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, returnDocument: 'after' }
    );

    const demoUserId = memberResult?._id || new ObjectId();

    console.log(`Seeding ${SEED_PRODUCTS.length} products...`);
    let seededCount = 0;
    for (const prod of SEED_PRODUCTS) {
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

      const existingProd = await productsCol.findOneAndUpdate(
        { slug: prod.slug },
        {
          $set: productDoc,
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true, returnDocument: 'after' }
      );

      const prodId = existingProd?._id;

      if (prod.isFeatured && prodId) {
        const reviewExists = await reviewsCol.findOne({ productId: prodId });
        if (!reviewExists) {
          await reviewsCol.insertMany([
            {
              productId: prodId,
              userId: demoUserId,
              userName: 'Marcus Sterling',
              rating: 5,
              title: 'Unbelievable energy return and comfort',
              comment: 'Wore these for an 18-mile marathon training run straight out of the box. Zero hotspots, super springy rebound, and looks incredible on foot.',
              verifiedPurchase: true,
              createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            },
            {
              productId: prodId,
              userId: demoUserId,
              userName: 'Jordan Blake',
              rating: 5,
              title: 'Top tier athletic footwear',
              comment: 'SPORTIX hit a home run with this silhouette. Lockdown is 10/10 and the materials feel exceptionally premium. Will be buying a second colorway.',
              verifiedPurchase: true,
              createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
            },
            {
              productId: prodId,
              userId: demoUserId,
              userName: 'Elena Rostova',
              rating: 4,
              title: 'Great fit, true to size',
              comment: 'Great traction and stylish design. Slightly snug around the midfoot on first wear, but molded perfectly after my second gym session.',
              verifiedPurchase: true,
              createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            },
          ]);
        }
      }

      seededCount++;
    }

    console.log(`Seeding ${SEED_COUPONS.length} coupons...`);
    for (const cpn of SEED_COUPONS) {
      await couponsCol.updateOne(
        { code: cpn.code },
        {
          $set: {
            ...cpn,
            updatedAt: new Date(),
          },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true }
      );
    }

    console.log('✅ Seeding completed successfully!');
    console.log(`Products: ${seededCount}`);
    console.log('Admin login: admin@sportix.com / Admin123!');
    console.log('Member login: member@sportix.com / Member123!');

    await client.close();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

main();
