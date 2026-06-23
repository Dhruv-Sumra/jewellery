'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    weightInGrams: number;
    makingCharges: number;
    purity: number;
    category: string;
    pricing: {
      silverCost: number;
      makingCharges: number;
      subtotal: number;
      gst: number;
      finalPrice: number;
    };
  };
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      image: product.images[0],
      weightInGrams: product.weightInGrams,
      makingCharges: product.makingCharges,
      quantity: 1,
      pricing: product.pricing,
    });
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Container with Dual-Layer Crossfade */}
      <div
        className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
        onMouseEnter={() => setCurrentImage(1)}
        onMouseLeave={() => setCurrentImage(0)}
      >
        {product.images.map((image, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{
              opacity: currentImage === idx ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={`${product.name} - View ${idx + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}

        {/* Purity Badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-onyx">
          {product.purity} Silver
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-onyx mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          {product.weightInGrams}g • {product.category}
        </p>

        {/* Price Breakdown */}
        <div className="space-y-1 mb-4 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Silver Cost</span>
            <span>₹{product.pricing.silverCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Making Charges</span>
            <span>₹{product.pricing.makingCharges.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (3%)</span>
            <span>₹{product.pricing.gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-1 text-sm font-semibold text-onyx">
            <span>Total</span>
            <motion.span
              key={product.pricing.finalPrice}
              initial={{ scale: 1.2, color: '#10B981' }}
              animate={{ scale: 1, color: '#0F0F0F' }}
              transition={{ duration: 0.3 }}
            >
              ₹{product.pricing.finalPrice.toLocaleString('en-IN')}
            </motion.span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full bg-onyx text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
