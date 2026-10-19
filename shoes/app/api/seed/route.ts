import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { SEED_CATEGORIES, SEED_PRODUCTS, SEED_COUPONS } from '@/lib/seed-data';
import { INITIAL_VENDORS } from '@/lib/vendors-data';
import { hashPassword } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET() {
  return runSeed();
}

export async function POST() {
  return runSeed();
}

export async function runSeed() {
  try {
    const categoriesCol = await getCollection('categories');
    const productsCol = await getCollection('products');
    const usersCol = await getCollection('users');
    const couponsCol = await getCollection('coupons');
    const reviewsCol = await getCollection('reviews');
    const vendorsCol = await getCollection('vendors');

    // 0. Seed Vendors
    const vendorMap = new Map<string, ObjectId>();
    for (const v of INITIAL_VENDORS) {
      const existing = await vendorsCol.findOne({ slug: v.slug });
      let vId: ObjectId;
      if (existing) {
        vId = existing._id;
        await vendorsCol.updateOne(
          { _id: vId },
          { $set: { ...v, updatedAt: new Date() } }
        );
      } else {
        const res = await vendorsCol.insertOne({
          ...v,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any);
        vId = res.insertedId;
      }
      vendorMap.set(v.slug, vId);
    }

    // 1. Seed Categories
    const categoryMap = new Map<string, ObjectId>();
    for (const cat of SEED_CATEGORIES) {
      const existing = await categoriesCol.findOne({ slug: cat.slug });
      let catId: ObjectId;
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

    // 2. Seed Default Users
    const hashedAdminPass = await hashPassword('Admin123!');
    const hashedMemberPass = await hashPassword('Member123!');

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

    // 3. Seed Products
    let seededCount = 0;
    for (const prod of SEED_PRODUCTS) {
      const catId = categoryMap.get(prod.categorySlug) || Array.from(categoryMap.values())[0];
      const assignedVendor = INITIAL_VENDORS[seededCount % INITIAL_VENDORS.length];
      const assignedVendorId = vendorMap.get(assignedVendor.slug);
      
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
        vendorId: assignedVendorId || null,
        vendorName: assignedVendor.name,
        vendorSlug: assignedVendor.slug,
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

      // Seed Reviews for featured products
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

    // 4. Seed Coupons
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

    return NextResponse.json({
      success: true,
      message: `SPORTIX database seeded successfully! Added/updated ${seededCount} products, ${SEED_CATEGORIES.length} categories, coupons, and demo accounts.`,
      credentials: {
        admin: 'admin@sportix.com / Admin123!',
        member: 'member@sportix.com / Member123!',
      },
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
