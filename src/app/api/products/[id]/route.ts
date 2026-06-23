import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { getLiveSilverPrice, calculateProductPrice } from '@/lib/silverPriceCache';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const product = await Product.findById(params.id).lean();

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const silverPrice = await getLiveSilverPrice();
    const pricing = calculateProductPrice(
      product.weightInGrams,
      product.makingCharges,
      silverPrice
    );

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        _id: product._id.toString(),
        pricing,
        silverPricePerGram: silverPrice,
      },
    });
  } catch (error) {
    console.error('Product API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
