'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Header() {
  const { getTotalItems, openCart } = useCartStore();
  const [silverPrice, setSilverPrice] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSilverPrice();
    const interval = setInterval(fetchSilverPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchSilverPrice = async () => {
    try {
      const res = await fetch('/api/silver-price');
      const data = await res.json();
      if (data.success) {
        setSilverPrice(data.price);
      }
    } catch (error) {
      console.error('Failed to fetch silver price:', error);
    }
  };

  const itemCount = mounted ? getTotalItems() : 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-light tracking-widest text-onyx"
            >
              ARGENTUM
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-onyx transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-onyx transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-onyx transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-onyx transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">

            {/* Live Silver Price Ticker */}
            {silverPrice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-market-green/10 to-market-green/5 rounded-full"
            >
              <div className="w-2 h-2 bg-market-green rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-600">
                Live Silver
              </span>
              <span className="text-sm font-semibold text-onyx">
                ₹{silverPrice.toFixed(2)}/g
              </span>
            </motion.div>
            )}

            {/* Cart Icon */}
            <button
            onClick={openCart}
            className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ShoppingBag className="w-6 h-6 text-onyx" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-market-green text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
