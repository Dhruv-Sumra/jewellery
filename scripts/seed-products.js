const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  weightInGrams: Number,
  makingCharges: Number,
  purity: Number,
  category: String,
  inStock: Boolean,
  featured: Boolean,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const products = [
  // RINGS - 8 products
  {
    name: 'Celestial Moon Ring',
    description: 'Minimalist crescent moon ring in pure 925 silver with delicate detailing. Perfect for everyday elegance.',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800'],
    weightInGrams: 3.5, makingCharges: 500, purity: 925, category: 'ring', inStock: true, featured: true,
  },
  {
    name: 'Statement Cuff Ring',
    description: 'Bold and contemporary adjustable cuff ring with geometric patterns.',
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800'],
    weightInGrams: 7.2, makingCharges: 1100, purity: 925, category: 'ring', inStock: true, featured: false,
  },
  {
    name: 'Twisted Band Ring',
    description: 'Elegant twisted silver band that catches light beautifully.',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800'],
    weightInGrams: 4.8, makingCharges: 650, purity: 925, category: 'ring', inStock: true, featured: true,
  },
  {
    name: 'Stackable Ring Set',
    description: 'Set of three delicate stackable rings. Mix and match for endless styling.',
    images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800'],
    weightInGrams: 5.1, makingCharges: 900, purity: 925, category: 'ring', inStock: true, featured: false,
  },
  {
    name: 'Vintage Rose Ring',
    description: 'Intricate rose design with detailed petals. Romantic and timeless.',
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800'],
    weightInGrams: 6.5, makingCharges: 950, purity: 925, category: 'ring', inStock: true, featured: true,
  },
  {
    name: 'Crown Ring',
    description: 'Delicate crown design ring. Feel like royalty.',
    images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800'],
    weightInGrams: 4.2, makingCharges: 700, purity: 925, category: 'ring', inStock: true, featured: false,
  },
  // NECKLACES - 6 products
  {
    name: 'Heart Locket Necklace',
    description: 'Romantic heart-shaped locket with photo storage. Classic design.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
    weightInGrams: 6.8, makingCharges: 950, purity: 925, category: 'necklace', inStock: true, featured: true,
  },
  {
    name: 'Chain Link Necklace',
    description: 'Classic silver chain necklace with secure clasp. Versatile for layering.',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
    weightInGrams: 12.5, makingCharges: 1500, purity: 925, category: 'necklace', inStock: true, featured: true,
  },
  {
    name: 'Bar Pendant Necklace',
    description: 'Modern minimalist bar pendant on delicate chain.',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
    weightInGrams: 4.2, makingCharges: 700, purity: 925, category: 'necklace', inStock: true, featured: false,
  },
  {
    name: 'Layered Chain Set',
    description: 'Three-piece layered necklace set with varying lengths.',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
    weightInGrams: 9.8, makingCharges: 1400, purity: 925, category: 'necklace', inStock: true, featured: false,
  },
  {
    name: 'Bridal Collection Set',
    description: 'Complete bridal set with necklace, earrings, and bracelet.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
    weightInGrams: 35.5, makingCharges: 5000, purity: 925, category: 'necklace', inStock: true, featured: true,
  },
  
  // BRACELETS - 6 products
  {
    name: 'Classic Chain Bracelet',
    description: 'Timeless silver bracelet with secure clasp. Elegant simplicity.',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'],
    weightInGrams: 8.0, makingCharges: 1200, purity: 925, category: 'bracelet', inStock: true, featured: true,
  },
  {
    name: 'Charm Bracelet',
    description: 'Adjustable charm bracelet with removable charms.',
    images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
    weightInGrams: 10.5, makingCharges: 1600, purity: 925, category: 'bracelet', inStock: true, featured: true,
  },
  {
    name: 'Bangle Set',
    description: 'Set of four sleek silver bangles. Perfect for stacking.',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'],
    weightInGrams: 15.2, makingCharges: 2000, purity: 925, category: 'bracelet', inStock: true, featured: false,
  },
  {
    name: 'Tennis Bracelet',
    description: 'Classic tennis bracelet design in polished silver.',
    images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
    weightInGrams: 11.8, makingCharges: 1800, purity: 925, category: 'bracelet', inStock: true, featured: true,
  },
  {
    name: 'Men\'s Chain Bracelet',
    description: 'Masculine heavy-link bracelet. Bold and sophisticated.',
    images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
    weightInGrams: 18.5, makingCharges: 2200, purity: 925, category: 'bracelet', inStock: true, featured: true,
  },
  {
    name: 'Minimalist Bar Bracelet',
    description: 'Sleek bar design on delicate chain. Modern minimalism.',
    images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
    weightInGrams: 6.8, makingCharges: 850, purity: 925, category: 'bracelet', inStock: true, featured: false,
  },
  
  // EARRINGS - 5 products
  {
    name: 'Teardrop Earrings',
    description: 'Stunning teardrop design earrings with hook closure.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
    weightInGrams: 4.5, makingCharges: 600, purity: 925, category: 'earring', inStock: true, featured: false,
  },
  {
    name: 'Hoop Earrings',
    description: 'Classic silver hoops in medium size. Essential wardrobe staple.',
    images: ['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'],
    weightInGrams: 6.2, makingCharges: 800, purity: 925, category: 'earring', inStock: true, featured: true,
  },
  {
    name: 'Stud Earring Set',
    description: 'Set of three pairs of silver studs. Everyday essentials.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
    weightInGrams: 3.8, makingCharges: 550, purity: 925, category: 'earring', inStock: true, featured: false,
  },
  {
    name: 'Chandelier Earrings',
    description: 'Elegant chandelier-style drop earrings for special occasions.',
    images: ['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'],
    weightInGrams: 7.8, makingCharges: 1100, purity: 925, category: 'earring', inStock: true, featured: true,
  },
  {
    name: 'Pearl Drop Earrings',
    description: 'Silver earrings with freshwater pearl drops. Classic elegance.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
    weightInGrams: 5.5, makingCharges: 900, purity: 925, category: 'earring', inStock: true, featured: true,
  },
  
  // PENDANTS - 5 products
  {
    name: 'Infinity Pendant',
    description: 'Elegant infinity symbol pendant with matching chain.',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'],
    weightInGrams: 5.2, makingCharges: 800, purity: 925, category: 'pendant', inStock: true, featured: true,
  },
  {
    name: 'Vintage Floral Pendant',
    description: 'Intricate floral design with oxidized finish.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'],
    weightInGrams: 5.5, makingCharges: 850, purity: 925, category: 'pendant', inStock: true, featured: true,
  },
  {
    name: 'Geometric Pendant',
    description: 'Modern geometric design pendant. Contemporary style.',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
    weightInGrams: 4.8, makingCharges: 750, purity: 925, category: 'pendant', inStock: true, featured: false,
  },
  {
    name: 'Circle of Life Pendant',
    description: 'Circular pendant symbolizing unity and wholeness.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
    weightInGrams: 6.0, makingCharges: 900, purity: 925, category: 'pendant', inStock: true, featured: false,
  },
  {
    name: 'Filigree Pendant',
    description: 'Intricate filigree work showcasing traditional craftsmanship.',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800'],
    weightInGrams: 7.2, makingCharges: 1200, purity: 925, category: 'pendant', inStock: true, featured: true,
  },
  
  // ANKLETS - 3 products
  {
    name: 'Delicate Ankle Chain',
    description: 'Feminine anklet with adjustable length. Perfect for summer.',
    images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'],
    weightInGrams: 3.2, makingCharges: 450, purity: 925, category: 'anklet', inStock: true, featured: false,
  },
  {
    name: 'Charm Anklet',
    description: 'Anklet with small dangling charms. Playful and elegant.',
    images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800', 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800'],
    weightInGrams: 4.5, makingCharges: 600, purity: 925, category: 'anklet', inStock: true, featured: false,
  },
  {
    name: 'Layered Anklet Set',
    description: 'Set of two anklets for layering. Boho-chic style.',
    images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'],
    weightInGrams: 5.8, makingCharges: 850, purity: 925, category: 'anklet', inStock: true, featured: true,
  },
];

async function seed() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('📦 Inserting products...');
    await Product.insertMany(products);
    
    console.log('✅ Database seeded successfully!');
    console.log(`📊 Added ${products.length} products`);
    console.log('\n🎨 Product Breakdown:');
    console.log('  - Rings: 6');
    console.log('  - Necklaces: 5');
    console.log('  - Bracelets: 6');
    console.log('  - Earrings: 5');
    console.log('  - Pendants: 5');
    console.log('  - Anklets: 3');
    console.log('\n🚀 Ready to view at http://localhost:3000\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
