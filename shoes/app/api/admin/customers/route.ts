import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const usersCol = await getCollection('users');
    const ordersCol = await getCollection('orders');

    // Fetch registered users (excluding sensitive password hash)
    const users = await usersCol
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    // Fetch all orders to compute customer-level telemetry
    const allOrders = await ordersCol.find({}).toArray();

    const orderStatsByUser = new Map<string, { orderCount: number; totalSpent: number; lastOrderDate: Date | null }>();
    const orderStatsByEmail = new Map<string, { orderCount: number; totalSpent: number; lastOrderDate: Date | null }>();

    for (const order of allOrders) {
      const amount = order.totalAmount || 0;
      const orderDate = order.createdAt ? new Date(order.createdAt) : null;

      if (order.userId) {
        const uId = order.userId.toString();
        const existing = orderStatsByUser.get(uId) || { orderCount: 0, totalSpent: 0, lastOrderDate: null };
        existing.orderCount += 1;
        existing.totalSpent += amount;
        if (orderDate && (!existing.lastOrderDate || orderDate > existing.lastOrderDate)) {
          existing.lastOrderDate = orderDate;
        }
        orderStatsByUser.set(uId, existing);
      }

      if (order.customerEmail) {
        const email = order.customerEmail.toLowerCase().trim();
        const existing = orderStatsByEmail.get(email) || { orderCount: 0, totalSpent: 0, lastOrderDate: null };
        existing.orderCount += 1;
        existing.totalSpent += amount;
        if (orderDate && (!existing.lastOrderDate || orderDate > existing.lastOrderDate)) {
          existing.lastOrderDate = orderDate;
        }
        orderStatsByEmail.set(email, existing);
      }
    }

    // Merge stats into user documents
    const customers = users.map((u: any) => {
      const uId = u._id.toString();
      const email = (u.email || '').toLowerCase().trim();
      const stats = orderStatsByUser.get(uId) || orderStatsByEmail.get(email) || {
        orderCount: 0,
        totalSpent: 0,
        lastOrderDate: null,
      };

      return {
        _id: uId,
        name: u.name || 'Anonymous Guest',
        email: u.email,
        role: u.role || 'USER',
        addresses: u.addresses || [],
        createdAt: u.createdAt || new Date(),
        orderCount: stats.orderCount,
        totalSpent: Math.round(stats.totalSpent * 100) / 100,
        lastOrderDate: stats.lastOrderDate,
      };
    });

    return NextResponse.json({ success: true, customers });
  } catch (error: any) {
    console.error('Fetch customers error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
