import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Helper to determine if a string is a valid 24-character hexadecimal MongoDB ObjectId
function toVendorQuery(id: string) {
  const isHexObjectId = typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id) && ObjectId.isValid(id);
  if (isHexObjectId) {
    return { $or: [{ _id: new ObjectId(id) }, { slug: id }] };
  }
  return { slug: id };
}

// Whitelisted editable vendor fields to prevent Mass Assignment vulnerabilities
const ALLOWED_UPDATE_FIELDS = [
  'name',
  'slug',
  'company',
  'contactPerson',
  'email',
  'phone',
  'address',
  'city',
  'commissionRate',
  'status',
  'notes',
  'rating',
  'logoUrl',
] as const;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || typeof id !== 'string' || !id.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vendor identifier is required' },
        { status: 400 }
      );
    }

    const vendorsCol = await getCollection('vendors');
    const query = toVendorQuery(id.trim());

    const vendor = await vendorsCol.findOne(query);
    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vendor });
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve vendor details' },
      { status: 500 }
    );
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
    // 1. Authentication & Authorization check
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

    const { id } = await paramsPromise;
    if (!id || typeof id !== 'string' || !id.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vendor identifier is required' },
        { status: 400 }
      );
    }

    // 2. Safe JSON Body Parsing
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: 'Request body must be a valid JSON object' },
        { status: 400 }
      );
    }

    const vendorsCol = await getCollection('vendors');
    const query = toVendorQuery(id.trim());

    // 3. Find existing vendor
    const existingVendor = await vendorsCol.findOne(query);
    if (!existingVendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // 4. Input Sanitization & Whitelisting (Mass Assignment Protection)
    const updateFields: Record<string, any> = {
      updatedAt: new Date(),
    };

    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (body[field] !== undefined) {
        updateFields[field] = body[field];
      }
    }

    // Validate email format and normalize to lowercase
    if (updateFields.email !== undefined) {
      const email = String(updateFields.email).trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email address format' },
          { status: 400 }
        );
      }
      updateFields.email = email;
    }

    // Validate commissionRate
    if (updateFields.commissionRate !== undefined) {
      const rate = parseFloat(String(updateFields.commissionRate));
      if (isNaN(rate) || rate < 0 || rate > 100) {
        return NextResponse.json(
          { success: false, error: 'Commission rate must be a valid number between 0 and 100' },
          { status: 400 }
        );
      }
      updateFields.commissionRate = rate;
    }

    // Validate status
    if (updateFields.status !== undefined) {
      if (!['active', 'inactive'].includes(updateFields.status)) {
        return NextResponse.json(
          { success: false, error: "Status must be either 'active' or 'inactive'" },
          { status: 400 }
        );
      }
    }

    // Validate slug if changed
    if (updateFields.slug !== undefined) {
      updateFields.slug = String(updateFields.slug)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      if (!updateFields.slug) {
        return NextResponse.json(
          { success: false, error: 'Vendor slug cannot be empty' },
          { status: 400 }
        );
      }
    }

    // 5. Duplicate Check for Slug or Email collision
    const conflictChecks: any[] = [];
    if (updateFields.slug && updateFields.slug !== existingVendor.slug) {
      conflictChecks.push({ slug: updateFields.slug });
    }
    if (updateFields.email && updateFields.email !== existingVendor.email) {
      conflictChecks.push({ email: updateFields.email });
    }

    if (conflictChecks.length > 0) {
      const conflictVendor = await vendorsCol.findOne({
        _id: { $ne: existingVendor._id },
        $or: conflictChecks,
      });

      if (conflictVendor) {
        return NextResponse.json(
          {
            success: false,
            error: 'Another vendor already exists with this slug or official email',
          },
          { status: 409 }
        );
      }
    }

    // 6. Perform safe update
    const result = await vendorsCol.findOneAndUpdate(
      { _id: existingVendor._id },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    return NextResponse.json({
      success: true,
      vendor: result,
      message: 'Vendor updated successfully',
    });
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update vendor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    if (!id || typeof id !== 'string' || !id.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vendor identifier is required' },
        { status: 400 }
      );
    }

    const vendorsCol = await getCollection('vendors');
    const query = toVendorQuery(id.trim());

    const result = await vendorsCol.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Vendor removed successfully',
    });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete vendor' },
      { status: 500 }
    );
  }
}
