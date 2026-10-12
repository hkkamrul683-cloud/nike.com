import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const usersCol = await getCollection('users');
    const existing = await usersCol.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      name: name || '',
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'USER',
      addresses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await usersCol.insertOne(newUser);
    const userId = res.insertedId.toString();

    const token = signToken({
      userId,
      email: newUser.email,
      role: 'USER',
      name: newUser.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

    response.cookies.set('sportix_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
