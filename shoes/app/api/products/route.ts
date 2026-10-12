import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const sport = searchParams.get('sport');
    const sale = searchParams.get('sale');
    const featured = searchParams.get('featured');
    const bestseller = searchParams.get('bestseller');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const color = searchParams.get('color');
    const size = searchParams.get('size');
    const sort = searchParams.get('sort') || 'featured';
    const limit = parseInt(searchParams.get('limit') || '40', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sport: { $regex: search, $options: 'i' } },
        { colorway: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.categorySlug = category.toLowerCase();
    }

    if (gender) {
      query.gender = { $in: [gender.toLowerCase(), 'unisex'] };
    }

    if (sport) {
      query.sport = sport.toLowerCase();
    }

    if (sale === 'true') {
      query.salePrice = { $gt: 0 };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (bestseller === 'true') {
      query.isBestseller = true;
    }

    if (color) {
      query.colors = { $regex: color, $options: 'i' };
    }

    if (size) {
      query.sizes = size;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    let sortOption: any = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else if (sort === 'featured') sortOption = { isFeatured: -1, isBestseller: -1 };

    const productsCol = await getCollection('products');
    const total = await productsCol.countDocuments(query);
    const products = await productsCol
      .find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 403 });
    }

    const body = await req.json();
    const { name, subtitle, description, details, price, salePrice, stock, categorySlug, gender, sport, colors, colorway, sizes, images, sku, badge, isFeatured, isNew, isBestseller } = body;

    if (!name || !price || !categorySlug) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 });
    }

    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const productsCol = await getCollection('products');
    const existing = await productsCol.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 400 });
    }

    const categoriesCol = await getCollection('categories');
    const catDoc = await categoriesCol.findOne({ slug: categorySlug });

    const newProduct = {
      name,
      slug,
      subtitle: subtitle || '',
      description: description || '',
      details: Array.isArray(details) ? details : [],
      price: parseFloat(price),
      salePrice: salePrice ? parseFloat(salePrice) : null,
      stock: parseInt(stock || '10', 10),
      categoryId: catDoc?._id || null,
      categorySlug,
      gender: gender || 'unisex',
      sport: sport || 'lifestyle',
      badge: badge || null,
      isFeatured: !!isFeatured,
      isNew: isNew !== undefined ? !!isNew : true,
      isBestseller: !!isBestseller,
      colors: Array.isArray(colors) ? colors : [colorway || 'Standard'],
      colorway: colorway || 'Standard',
      sizes: Array.isArray(sizes) ? sizes : ['US 8', 'US 9', 'US 10', 'US 11'],
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
      sku: sku || `SPX-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await productsCol.insertOne(newProduct);

    return NextResponse.json({ success: true, product: { ...newProduct, _id: res.insertedId } }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
