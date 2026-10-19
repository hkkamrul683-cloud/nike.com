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
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Authentication required' },
        { status: 401 }
      );
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin privileges required' },
        { status: 403 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

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

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vendor name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vendor email is required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    const rawRate = commissionRate !== undefined && commissionRate !== '' ? parseFloat(String(commissionRate)) : 10;
    const cleanRate = isNaN(rawRate) || rawRate < 0 || rawRate > 100 ? 10 : rawRate;

    const slug =
      body.slug ||
      name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const vendorsCol = await getCollection('vendors');

    // Check if slug or email exists
    const existing = await vendorsCol.findOne({
      $or: [{ slug }, { email: cleanEmail }],
    });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'A vendor with this name or email already exists',
        },
        { status: 409 }
      );
    }

    const newVendor: Vendor = {
      name: name.trim(),
      slug,
      company: (company || name).trim(),
      contactPerson: (contactPerson || 'Operations Lead').trim(),
      email: cleanEmail,
      phone: (phone || '+880 1700-000000').trim(),
      address: (address || 'Dhaka, Bangladesh').trim(),
      city: (city || 'Dhaka').trim(),
      commissionRate: cleanRate,
      status: body.status === 'inactive' ? 'inactive' : 'active',
      rating: 5.0,
      joinedDate: new Date().toISOString().split('T')[0],
      notes: (notes || '').trim(),
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
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create vendor' },
      { status: 500 }
    );
  }
}
