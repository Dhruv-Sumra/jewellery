import { NextResponse } from 'next/server';
import { getLiveSilverPrice, getCachedPriceInfo } from '@/lib/silverPriceCache';

export const dynamic = 'force-dynamic';
export const revalidate = 900; // 15 minutes

export async function GET() {
  try {
    const price = await getLiveSilverPrice();
    const cacheInfo = getCachedPriceInfo();

    const hoursOld = cacheInfo 
      ? Math.floor((Date.now() - cacheInfo.timestamp) / (60 * 60 * 1000))
      : 0;

    return NextResponse.json({
      success: true,
      price,
      currency: 'INR',
      unit: 'gram',
      lastUpdated: cacheInfo?.lastUpdated,
      hoursOld,
      nextUpdate: cacheInfo 
        ? new Date(cacheInfo.timestamp + 24 * 60 * 60 * 1000).toISOString()
        : null,
      cached: cacheInfo !== null,
    });
  } catch (error) {
    console.error('Silver price API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch silver price',
      },
      { status: 500 }
    );
  }
}
