import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { checkSteadfastBalance, getCourierConfig } from '@/lib/courier';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 403 });
    }

    const result = await checkSteadfastBalance();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Courier balance check error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 403 });
    }

    const body = await req.json();
    const { apiKey, secretKey } = body;

    const result = await checkSteadfastBalance(apiKey, secretKey);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Test courier connection error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
