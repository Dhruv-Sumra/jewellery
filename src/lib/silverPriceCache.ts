import axios from 'axios';

interface SilverPriceCache {
  price: number;
  timestamp: number;
  lastUpdated: Date;
}

let cachedPrice: SilverPriceCache | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Fetches live silver price with 24-hour caching
 * Returns price in INR per gram
 */
export async function getLiveSilverPrice(): Promise<number> {
  const now = Date.now();

  // Return cached price if still valid (less than 24 hours old)
  if (cachedPrice && now - cachedPrice.timestamp < CACHE_DURATION) {
    const hoursOld = Math.floor((now - cachedPrice.timestamp) / (60 * 60 * 1000));
    console.log(`🟢 Returning cached silver price: ₹${cachedPrice.price}/g (${hoursOld}h old)`);
    return cachedPrice.price;
  }

  // Use fallback price immediately to avoid delays
  const fallbackPrice = 245.0; // Realistic Indian market price for 999 purity silver

  try {
    console.log('🔄 Fetching fresh silver price from GoldAPI...');
    
    const endpoint = process.env.LIVE_SILVER_API_ENDPOINT || 'https://www.goldapi.io/api/XAG/INR';
    const apiKey = process.env.GOLDAPI_KEY;
    
    if (!apiKey) {
      throw new Error('GoldAPI key not configured');
    }

    const response = await axios.get(endpoint, {
      timeout: 5000,
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // GoldAPI returns price per troy ounce in target currency (INR)
    // We need price per gram
    let pricePerGram: number;
    
    if (response.data.price_gram) {
      // Direct gram price if available
      pricePerGram = response.data.price_gram;
    } else if (response.data.price) {
      // Price per troy ounce - convert to gram
      // 1 Troy ounce = 31.1035 grams
      pricePerGram = response.data.price / 31.1035;
    } else {
      throw new Error('Invalid GoldAPI response structure');
    }

    // Update cache
    cachedPrice = {
      price: Math.round(pricePerGram * 100) / 100, // Round to 2 decimal places
      timestamp: now,
      lastUpdated: new Date(),
    };

    console.log('✅ Fresh silver price from GoldAPI:', cachedPrice.price, 'INR/gram');
    console.log(`⏰ Next update in 24 hours at: ${new Date(now + CACHE_DURATION).toLocaleString()}`);
    return cachedPrice.price;

  } catch (error) {
    console.error('❌ Error fetching silver price from GoldAPI:', error instanceof Error ? error.message : 'Unknown error');

    // Fallback to cached price if available, even if expired
    if (cachedPrice) {
      const hoursOld = Math.floor((now - cachedPrice.timestamp) / (60 * 60 * 1000));
      console.warn(`⚠️ Using expired cached price (${hoursOld}h old)`);
      return cachedPrice.price;
    }

    // Ultimate fallback - use a reasonable default and cache it
    console.warn('⚠️ Using fallback price:', fallbackPrice);
    
    // Cache the fallback so we don't keep hitting the failing API
    cachedPrice = {
      price: fallbackPrice,
      timestamp: now,
      lastUpdated: new Date(),
    };
    
    return fallbackPrice;
  }
}

/**
 * Calculate final product price with GST
 */
export function calculateProductPrice(
  weightInGrams: number,
  makingCharges: number,
  silverPricePerGram: number
): {
  silverCost: number;
  makingCharges: number;
  subtotal: number;
  gst: number;
  finalPrice: number;
} {
  const silverCost = weightInGrams * silverPricePerGram;
  const subtotal = silverCost + makingCharges;
  const gst = subtotal * 0.03; // 3% GST
  const finalPrice = subtotal + gst;

  return {
    silverCost: Math.round(silverCost * 100) / 100,
    makingCharges,
    subtotal: Math.round(subtotal * 100) / 100,
    gst: Math.round(gst * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
  };
}

/**
 * Get cached price info (for display purposes)
 */
export function getCachedPriceInfo() {
  return cachedPrice;
}

/**
 * Force refresh the silver price (ignores cache)
 * Useful for manual updates or admin panel
 */
export async function forceRefreshSilverPrice(): Promise<number> {
  cachedPrice = null; // Clear cache
  return await getLiveSilverPrice();
}

/**
 * Set manual silver price (for admin control)
 * Price should be in INR per gram
 */
export function setManualSilverPrice(pricePerGram: number): void {
  if (pricePerGram <= 0) {
    throw new Error('Price must be greater than 0');
  }
  
  cachedPrice = {
    price: Math.round(pricePerGram * 100) / 100,
    timestamp: Date.now(),
    lastUpdated: new Date(),
  };
  
  console.log('💰 Manual silver price set:', cachedPrice.price, 'INR/gram');
}
