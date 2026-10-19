import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { INITIAL_VENDORS, Vendor } from '@/lib/vendors-data';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const vendorsCol = await getCollection('vendors');
    const productsCol = await getCollection('products');

    let count = await vendorsCol.countDocuments({});

    // If no vendors exist yet, auto-seed the 10 initial vendors
    if (count === 0) {
      const now = new Date();
      const docsToInsert = INITIAL_VENDORS.map((v) => ({
        ...v,
        createdAt: now,
        updatedAt: now,
      }));
      await vendorsCol.insertMany(docsToInsert);
    }

    // Fetch all vendors sorted by name
    const vendors = await vendorsCol.find({}).sort({ name: 1 }).toArray();

    // Calculate product counts per vendor
    const productCounts = await productsCol
      .aggregate([
        {
          $match: {
            $or: [
              { vendorSlug: { $exists: true, $ne: '' } },
              { vendorName: { $exists: true, $ne: '' } },
            ],
          },
        },
        {
          $group: {
            _id: { $ifNull: ['$vendorSlug', '$vendorName'] },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const countMap: Record<string, number> = {};
    for (const item of productCounts) {
      if (item._id) {
        countMap[item._id] = item.count;
      }
    }

    const vendorsWithStats = vendors.map((v) => ({
      ...v,
      productCount: countMap[v.slug] || countMap[v.name] || 0,
    }));

    return NextResponse.json({
      success: true,
      vendors: vendorsWithStats,
      total: vendors.length,
    });
  } catch (error: any) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin privileges required' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      name,
      company,
      contactPerson,
      email,
      phone,
      address,
      city,
      commissionRate,
      notes,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Vendor name and email are required' },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const vendorsCol = await getCollection('vendors');

    // Check if slug or email exists
    const existing = await vendorsCol.findOne({
      $or: [{ slug }, { email: email.toLowerCase() }],
    });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'A vendor with this name or email already exists',
        },
        { status: 400 }
      );
    }

    const newVendor: Vendor = {
      name,
      slug,
      company: company || name,
      contactPerson: contactPerson || 'Operations Lead',
      email: email.toLowerCase(),
      phone: phone || '+880 1700-000000',
      address: address || 'Dhaka, Bangladesh',
      city: city || 'Dhaka',
      commissionRate: parseFloat(commissionRate || '10'),
      status: body.status || 'active',
      rating: 5.0,
      joinedDate: new Date().toISOString().split('T')[0],
      notes: notes || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await vendorsCol.insertOne(newVendor as any);

    return NextResponse.json(
      {
        success: true,
        vendor: { ...newVendor, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
