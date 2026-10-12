import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const productsCol = await getCollection('products');
    const product = await productsCol.findOne({ slug });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const reviewsCol = await getCollection('reviews');
    const reviews = await reviewsCol
      .find({ productId: product._id })
      .sort({ createdAt: -1 })
      .toArray();

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 5.0;

    // Fetch related recommended products (same category or sport, excluding current)
    const relatedProducts = await productsCol
      .find({
        _id: { $ne: product._id },
        $or: [
          { categorySlug: product.categorySlug },
          { sport: product.sport },
          { gender: product.gender },
        ],
      })
      .limit(4)
      .toArray();

    return NextResponse.json({
      product,
      reviews,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
      relatedProducts,
    });
  } catch (error: any) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { slug } = await params;
    const body = await req.json();
    const productsCol = await getCollection('products');

    const updateFields: any = {
      ...body,
      updatedAt: new Date(),
    };
    delete updateFields._id;

    if (body.price) updateFields.price = parseFloat(body.price);
    if (body.salePrice !== undefined) {
      updateFields.salePrice = body.salePrice ? parseFloat(body.salePrice) : null;
    }
    if (body.stock !== undefined) updateFields.stock = parseInt(body.stock, 10);

    const result = await productsCol.findOneAndUpdate(
      { slug },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: result });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { slug } = await params;
    const productsCol = await getCollection('products');
    const result = await productsCol.deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
