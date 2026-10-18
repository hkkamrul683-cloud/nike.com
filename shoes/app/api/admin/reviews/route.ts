import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const reviewsCol = await getCollection('reviews');
    const productsCol = await getCollection('products');

    const reviews = await reviewsCol.find({}).sort({ createdAt: -1 }).toArray();

    // Map product names
    const productIds = reviews
      .map((r: any) => r.productId)
      .filter((id) => id && ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    const products = await productsCol
      .find({ _id: { $in: productIds } }, { projection: { name: 1, slug: 1, images: 1 } })
      .toArray();

    const productMap = new Map();
    products.forEach((p: any) => {
      productMap.set(p._id.toString(), p);
    });

    const enriched = reviews.map((r: any) => {
      const prod = r.productId ? productMap.get(r.productId.toString()) : null;
      return {
        _id: r._id.toString(),
        productId: r.productId ? r.productId.toString() : null,
        productName: prod ? prod.name : 'Unknown Shoe',
        productImage: prod?.images?.[0] || null,
        productSlug: prod?.slug || null,
        userName: r.userName || 'Customer',
        rating: r.rating || 5,
        title: r.title || '',
        comment: r.comment || '',
        verifiedPurchase: r.verifiedPurchase ?? true,
        status: r.status || 'APPROVED',
        createdAt: r.createdAt || new Date(),
      };
    });

    return NextResponse.json({ success: true, reviews: enriched });
  } catch (error: any) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get('id');

    if (!reviewId || !ObjectId.isValid(reviewId)) {
      return NextResponse.json({ error: 'Invalid or missing review ID' }, { status: 400 });
    }

    const reviewsCol = await getCollection('reviews');
    const res = await reviewsCol.deleteOne({ _id: new ObjectId(reviewId) });

    if (res.deletedCount === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error: any) {
    console.error('Delete review error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
    }

    const reviewsCol = await getCollection('reviews');
    await reviewsCol.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status || 'APPROVED', updatedAt: new Date() } }
    );

    return NextResponse.json({ success: true, message: 'Review status updated' });
  } catch (error: any) {
    console.error('Update review error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
