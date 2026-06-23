import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { getLiveSilverPrice, calculateProductPrice } from '@/lib/silverPriceCache';
import { getMockProductsWithPricing } from '@/lib/mockProducts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get live silver price first (works without DB)
    const silverPrice = await getLiveSilverPrice();

    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Check if MongoDB is configured
    const isMongoConfigured = process.env.MONGODB_URI && 
      !process.env.MONGODB_URI.includes('localhost:27017') &&
      !process.env.MONGODB_URI.includes('placeholder');

    // If MongoDB not configured, immediately use mock data
    if (!isMongoConfigured) {
      console.log('⚡ Using mock data (MongoDB not configured)');
      const mockProducts = getMockProductsWithPricing(silverPrice);
      
      let filteredMock = mockProducts;
      if (category) {
        filteredMock = mockProducts.filter(p => p.category === category);
      }
      if (featured === 'true') {
        filteredMock = filteredMock.filter(p => p.featured);
      }
      
      return NextResponse.json({
        success: true,
        products: filteredMock.slice(0, limit),
        silverPrice,
        usingMockData: true,
        message: 'Using demo products. Connect MongoDB and run seed script to see real data.',
      });
    }

    // Try to connect to MongoDB with timeout
    let products;
    let usingMockData = false;
    
    try {
      // Quick timeout for MongoDB connection (2 seconds max)
      const dbPromise = connectDB();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DB timeout')), 2000)
      );
      
      await Promise.race([dbPromise, timeoutPromise]);
      
      const searchParams = req.nextUrl.searchParams;
      const category = searchParams.get('category');
      const featured = searchParams.get('featured');
      const limit = parseInt(searchParams.get('limit') || '50');

      const query: any = { inStock: true };
      if (category) query.category = category;
      if (featured === 'true') query.featured = true;

      products = await Product.find(query)
        .sort({ featured: -1, createdAt: -1 })
        .limit(limit)
        .lean();

      // If no products in database, use mock data
      if (products.length === 0) {
        console.log('⚠️ No products in database, using mock data');
        usingMockData = true;
        const mockProducts = getMockProductsWithPricing(silverPrice);
        
        // Apply filters to mock data
        let filteredMock = mockProducts;
        if (category) {
          filteredMock = mockProducts.filter(p => p.category === category);
        }
        if (featured === 'true') {
          filteredMock = filteredMock.filter(p => p.featured);
        }
        
        return NextResponse.json({
          success: true,
          products: filteredMock.slice(0, limit),
          silverPrice,
          usingMockData: true,
          message: 'Using demo products. Connect MongoDB and run seed script to see real data.',
        });
      }

      // Calculate dynamic prices for database products
      const productsWithPrices = products.map((product) => {
        const pricing = calculateProductPrice(
          product.weightInGrams,
          product.makingCharges,
          silverPrice
        );

        return {
          ...product,
          _id: product._id.toString(),
          pricing,
          silverPricePerGram: silverPrice,
        };
      });

      return NextResponse.json({
        success: true,
        products: productsWithPrices,
        silverPrice,
        usingMockData: false,
      });

    } catch (dbError) {
      // Database connection failed, use mock data
      console.log('⚠️ Database not connected, using mock data');
      console.log('💡 To see real products: Set up MongoDB and run: node scripts/seed-products.js');
      
      const searchParams = req.nextUrl.searchParams;
      const category = searchParams.get('category');
      const featured = searchParams.get('featured');
      const limit = parseInt(searchParams.get('limit') || '50');
      
      const mockProducts = getMockProductsWithPricing(silverPrice);
      
      // Apply filters to mock data
      let filteredMock = mockProducts;
      if (category) {
        filteredMock = mockProducts.filter(p => p.category === category);
      }
      if (featured === 'true') {
        filteredMock = filteredMock.filter(p => p.featured);
      }
      
      return NextResponse.json({
        success: true,
        products: filteredMock.slice(0, limit),
        silverPrice,
        usingMockData: true,
        message: 'Using demo products. Connect MongoDB and run seed script to see real data.',
      });
    }
  } catch (error) {
    console.error('Products API error:', error);
    
    // Even if everything fails, return mock data
    const mockProducts = getMockProductsWithPricing(75);
    return NextResponse.json({
      success: true,
      products: mockProducts.slice(0, 16),
      silverPrice: 75,
      usingMockData: true,
      message: 'Using fallback demo products.',
    });
  }
}
