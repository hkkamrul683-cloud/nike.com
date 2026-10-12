import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { items, shippingAddress, paymentMethod, couponCode, customerEmail, customerName, customerPhone } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Your shopping bag is empty' }, { status: 400 });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.city) {
      return NextResponse.json({ error: 'Please provide a complete shipping address' }, { status: 400 });
    }

    const productsCol = await getCollection('products');
    const ordersCol = await getCollection('orders');
    const couponsCol = await getCollection('coupons');

    // 1. Authoritative Server-side Price and Stock Validation
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      let productDoc: any = null;
      if (item.productId && ObjectId.isValid(item.productId)) {
        productDoc = await productsCol.findOne({ _id: new ObjectId(item.productId) });
      }
      if (!productDoc && item.slug) {
        productDoc = await productsCol.findOne({ slug: item.slug });
      }

      if (!productDoc) {
        return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 400 });
      }

      if (productDoc.stock < item.quantity) {
        return NextResponse.json({
          error: `Insufficient stock for ${productDoc.name}. Available: ${productDoc.stock}`,
        }, { status: 400 });
      }

      const unitPrice =
        productDoc.salePrice && productDoc.salePrice > 0
          ? productDoc.salePrice
          : productDoc.price;

      const itemTotal = unitPrice * item.quantity;
      subtotal += itemTotal;

      validatedItems.push({
        productId: productDoc._id,
        name: productDoc.name,
        slug: productDoc.slug,
        image: item.image || productDoc.images?.[0],
        price: unitPrice,
        size: item.size || 'Standard',
        color: item.color || productDoc.colorway || 'Standard',
        quantity: item.quantity,
      });
    }

    // 2. Validate Coupon if supplied
    let discount = 0;
    let validCouponCode = null;
    if (couponCode) {
      const cpn = await couponsCol.findOne({
        code: couponCode.trim().toUpperCase(),
        isActive: true,
      });
      if (cpn && subtotal >= cpn.minOrder) {
        validCouponCode = cpn.code;
        if (cpn.discountType === 'PERCENTAGE') {
          discount = (subtotal * cpn.discountValue) / 100;
        } else {
          discount = cpn.discountValue;
        }
      }
    }

    // 3. Shipping fee calculation (Free over $150)
    const shippingFee = subtotal > 150 ? 0 : 12.00;
    const totalAmount = Math.max(0, subtotal - discount + shippingFee);

    // 4. Generate order number
    const orderNumber = `SPX-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // 5. Decrement Stock for all ordered items
    for (const item of validatedItems) {
      await productsCol.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }

    // 6. Insert Order
    const newOrder = {
      orderNumber,
      userId: user ? new ObjectId(user.id) : null,
      customerEmail: user ? user.email : customerEmail || shippingAddress.email,
      customerName: user ? user.name : customerName || shippingAddress.fullName,
      customerPhone: customerPhone || shippingAddress.phone || '',
      items: validatedItems,
      subtotal: Math.round(subtotal * 100) / 100,
      shippingFee: Math.round(shippingFee * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      couponCode: validCouponCode,
      totalAmount: Math.round(totalAmount * 100) / 100,
      status: 'PROCESSING',
      paymentMethod: paymentMethod || 'CREDIT_CARD',
      paymentStatus: 'PAID',
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await ordersCol.insertOne(newOrder);

    return NextResponse.json({
      success: true,
      orderId: res.insertedId.toString(),
      orderNumber,
      order: {
        ...newOrder,
        _id: res.insertedId,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Please sign in to view orders' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all');

    const ordersCol = await getCollection('orders');
    let query: any = {};

    if (user.role === 'ADMIN' && all === 'true') {
      // Admin viewing all orders
      query = {};
    } else {
      // User viewing their own orders
      query = {
        $or: [
          { userId: new ObjectId(user.id) },
          { customerEmail: user.email },
        ],
      };
    }

    const orders = await ordersCol.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
