import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const vendorsCol = await getCollection('vendors');

    let query: any = { slug: id };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { slug: id }] };
    }

    const vendor = await vendorsCol.findOne(query);
    if (!vendor) {
      return NextResponse.json({ success: false, error: 'Vendor not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, vendor });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, params);
}

async function handleUpdate(
  req: NextRequest,
  paramsPromise: Promise<{ id: string }>
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin privileges required' },
        { status: 403 }
      );
    }

    const { id } = await paramsPromise;
    const body = await req.json();
    const vendorsCol = await getCollection('vendors');

    let query: any = { slug: id };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { slug: id }] };
    }

    const updateFields: any = {
      ...body,
      updatedAt: new Date(),
    };
    delete updateFields._id;
    if (updateFields.commissionRate !== undefined) {
      updateFields.commissionRate = parseFloat(updateFields.commissionRate);
    }

    const result = await vendorsCol.findOneAndUpdate(
      query,
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ success: false, error: 'Vendor not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, vendor: result });
  } catch (error: any) {
    console.error('Error updating vendor:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin privileges required' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const vendorsCol = await getCollection('vendors');

    let query: any = { slug: id };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { slug: id }] };
    }

    const result = await vendorsCol.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Vendor not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Vendor removed successfully' });
  } catch (error: any) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
