import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { productId, rating, title, comment, userName } = body;

    if (!productId || !rating) {
      return NextResponse.json({ error: 'ProductId and rating are required' }, { status: 400 });
    }

    const reviewsCol = await getCollection('reviews');
    const newReview = {
      productId: new ObjectId(productId),
      userId: user ? new ObjectId(user.id) : null,
      userName: user ? user.name : userName || 'Verified Buyer',
      rating: parseInt(rating, 10),
      title: title || '',
      comment: comment || '',
      verifiedPurchase: true,
      createdAt: new Date(),
    };

    const res = await reviewsCol.insertOne(newReview);

    return NextResponse.json({
      success: true,
      review: {
        ...newReview,
        _id: res.insertedId,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error posting review:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
