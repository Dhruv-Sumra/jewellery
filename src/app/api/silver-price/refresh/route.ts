import { NextResponse } from 'next/server';
import { forceRefreshSilverPrice } from '@/lib/silverPriceCache';

export const dynamic = 'force-dynamic';

/**
 * Force refresh the silver price
 * GET /api/silver-price/refresh
 */
export async function GET() {
  try {
    console.log('🔄 Manual silver price refresh requested');
    const price = await forceRefreshSilverPrice();

    return NextResponse.json({
      success: true,
      price,
      currency: 'INR',
      unit: 'gram',
      message: 'Silver price refreshed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Force refresh error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to refresh silver price',
      },
      { status: 500 }
    );
  }
}
