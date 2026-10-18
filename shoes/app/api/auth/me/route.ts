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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, addresses } = body;

    const updateData: any = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (addresses !== undefined) updateData.addresses = addresses;

    const usersCol = await getCollection('users');
    await usersCol.updateOne(
      { _id: new ObjectId(user.id) },
      { $set: updateData }
    );

    const updatedUser = await usersCol.findOne({ _id: new ObjectId(user.id) });
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser!._id.toString(),
        name: updatedUser!.name,
        email: updatedUser!.email,
        role: updatedUser!.role || 'USER',
        image: updatedUser!.image,
        phone: updatedUser!.phone,
        addresses: updatedUser!.addresses || [],
        createdAt: updatedUser!.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
