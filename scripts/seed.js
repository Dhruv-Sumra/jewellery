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

const sampleProducts = [
  // Rings
  {
    name: 'Celestial Moon Ring',
    description: 'Minimalist crescent moon ring in pure 925 silver with delicate detailing. Perfect for everyday elegance.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
    ],
    weightInGrams: 3.5,
    makingCharges: 500,
    purity: 925,
    category: 'ring',
    inStock: true,
    featured: true,
  },
  {
    name: 'Statement Cuff Ring',
    description: 'Bold and contemporary adjustable cuff ring with geometric patterns. Makes a powerful fashion statement.',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    ],
    weightInGrams: 7.2,
    makingCharges: 1100,
    purity: 925,
    category: 'ring',
    inStock: true,
    featured: false,
  },
  {
    name: 'Twisted Band Ring',
    description: 'Elegant twisted silver band that catches light beautifully. Comfortable fit for daily wear.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
    ],
    weightInGrams: 4.8,
    makingCharges: 650,
    purity: 925,
    category: 'ring',
    inStock: true,
    featured: true,
  },
  {
    name: 'Stackable Ring Set',
    description: 'Set of three delicate stackable rings. Mix and match for endless styling options.',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    ],
    weightInGrams: 5.1,
    makingCharges: 900,
    purity: 925,
    category: 'ring',
    inStock: true,
    featured: false,
  },
  {
    name: 'Vintage Rose Ring',
    description: 'Intricate rose design with detailed petals. Romantic and timeless.',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
    ],
    weightInGrams: 6.5,
    makingCharges: 950,
    purity: 925,
    category: 'ring',
    inStock: true,
    featured: true,
  },
