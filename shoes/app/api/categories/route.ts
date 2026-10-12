import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const categoriesCol = await getCollection('categories');
    const productsCol = await getCollection('products');

    const categories = await categoriesCol.find({}).toArray();

    // Attach product count to each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await productsCol.countDocuments({ categorySlug: cat.slug });
        return {
          ...cat,
          productCount: count,
        };
      })
    );

    return NextResponse.json({ categories: categoriesWithCount });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
