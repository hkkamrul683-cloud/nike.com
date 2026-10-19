import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
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

    const { name, phone, addresses } = body;

    const updateData: any = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = typeof name === 'string' ? name.trim() : name;
    if (phone !== undefined) updateData.phone = typeof phone === 'string' ? phone.trim() : phone;
    if (addresses !== undefined && Array.isArray(addresses)) updateData.addresses = addresses;

    const usersCol = await getCollection('users');
    await usersCol.updateOne(
      { _id: new ObjectId(user.id) },
      { $set: updateData }
    );

    const updatedUser = await usersCol.findOne({ _id: new ObjectId(user.id) });
    if (!updatedUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role || 'USER',
        image: updatedUser.image,
        phone: updatedUser.phone,
        addresses: updatedUser.addresses || [],
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
