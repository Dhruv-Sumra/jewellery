import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getLiveSilverPrice, calculateProductPrice } from '@/lib/silverPriceCache';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { cartItems, shippingAddress } = await req.json();

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get live silver price from server-side cache
    const silverPrice = await getLiveSilverPrice();

    // Verify each product and recalculate prices server-side
    let totalAmount = 0;
    let gstAmount = 0;
    const verifiedItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      
      if (!product || !product.inStock) {
        return NextResponse.json(
          { error: `Product ${item.productId} is not available` },
          { status: 400 }
        );
      }

      // SERVER-SIDE PRICE CALCULATION - Never trust client prices
      const pricing = calculateProductPrice(
        product.weightInGrams,
        product.makingCharges,
        silverPrice
      );

      verifiedItems.push({
        productId: product._id,
        name: product.name,
        image: product.images[0],
        weightInGrams: product.weightInGrams,
        makingCharges: product.makingCharges,
        silverPriceAtPurchase: silverPrice,
        finalPrice: pricing.finalPrice,
        quantity: item.quantity || 1,
      });

      totalAmount += pricing.subtotal * (item.quantity || 1);
      gstAmount += pricing.gst * (item.quantity || 1);
    }

    const grandTotal = totalAmount + gstAmount;

    // Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(grandTotal * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    // Create Order in Database
    const order = await Order.create({
      userId: session.user.id,
      items: verifiedItems,
      shippingAddress,
      totalAmount: Math.round(totalAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100,
      paymentStatus: 'pending',
      razorpayOrderId: razorpayOrder.id,
      orderStatus: 'processing',
    });

    return NextResponse.json({
      success: true,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: grandTotal,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout failed' },
      { status: 500 }
    );
  }
}
