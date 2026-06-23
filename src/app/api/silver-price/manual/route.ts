import { NextRequest, NextResponse } from 'next/server';
import { setManualSilverPrice } from '@/lib/silverPriceCache';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

/**
 * Manually set silver price (admin only)
 * POST /api/silver-price/manual
 * Body: { price: number }
 */
export async function POST(req: NextRequest) {
  try {
    // Optional: Add authentication check
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { price } = await req.json();

    if (!price || typeof price !== 'number' || price <= 0) {
      return NextResponse.json(
        { error: 'Invalid price. Must be a positive number.' },
        { status: 400 }
      );
    }

    setManualSilverPrice(price);

    return NextResponse.json({
      success: true,
      price,
      currency: 'INR',
      unit: 'gram',
      message: 'Silver price updated manually',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Manual price update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update price',
      },
      { status: 500 }
    );
  }
}
