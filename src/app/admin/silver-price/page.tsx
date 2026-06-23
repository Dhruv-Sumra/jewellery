'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, Check, AlertCircle } from 'lucide-react';

export default function SilverPriceAdmin() {
  const [price, setPrice] = useState('245');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentPrice();
  }, []);

  const fetchCurrentPrice = async () => {
    try {
      const res = await fetch('/api/silver-price');
      const data = await res.json();
      if (data.success) {
        setCurrentPrice(data.price);
        setLastUpdated(data.lastUpdated);
        setPrice(data.price.toString());
      }
    } catch (error) {
      console.error('Failed to fetch current price');
    }
  };

  const handleManualUpdate = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/silver-price/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: parseFloat(price) }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage(`✅ Success! Price updated to ₹${data.price}/gram`);
        setCurrentPrice(data.price);
        setLastUpdated(new Date().toISOString());
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to update price');
    } finally {
      setLoading(false);
    }
  };

  const handleForceRefresh = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/silver-price/refresh');
      const data = await res.json();
      
      if (data.success) {
        setMessage(`✅ Refreshed! New price: ₹${data.price}/gram`);
        setCurrentPrice(data.price);
        setPrice(data.price.toString());
        setLastUpdated(new Date().toISOString());
      } else {
        setMessage('❌ Failed to refresh from API');
      }
    } catch (error) {
      setMessage('❌ Failed to refresh');
    } finally {
      setLoading(false);
    }
  };

  const quickPrices = [240, 245, 250, 255, 260];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-onyx to-gray-800 text-white rounded-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-8 h-8" />
            <h1 className="text-3xl font-light tracking-wider">Silver Price Management</h1>
          </div>
          <p className="text-gray-300">Update your silver rate daily for accurate product pricing</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Price Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Current Silver Rate</h2>
            
            {currentPrice ? (
              <div>
                <div className="text-4xl font-bold text-market-green mb-2">
                  ₹{currentPrice.toFixed(2)}
                  <span className="text-lg text-gray-500 ml-2">/gram</span>
                </div>
                {lastUpdated && (
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(lastUpdated).toLocaleString()}
                  </p>
                )}
              </div>
            ) : (
              <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">999 Purity</span>
                  <span className="font-semibold">₹{currentPrice?.toFixed(2)}/g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">925 Purity (Sterling)</span>
                  <span className="font-semibold">₹{((currentPrice || 0) * 0.925).toFixed(2)}/g</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Update Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Update Silver Price</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (INR per gram)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-market-green focus:border-transparent text-lg"
                  placeholder="245"
                  step="0.01"
                />
              </div>

              <button
                onClick={handleManualUpdate}
                disabled={loading}
                className="w-full bg-market-green text-white py-3 rounded-md hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Update Price</span>
                  </>
                )}
              </button>

              {/* Quick Set Buttons */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Quick Set:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrices.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrice(p.toString())}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors"
                    >
                      ₹{p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={handleForceRefresh}
                  disabled={loading}
                  className="w-full bg-onyx text-white py-2 rounded-md hover:bg-gray-800 transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Fetch from API</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg flex items-start space-x-3 ${
              message.includes('✅')
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{message}</p>
          </motion.div>
        )}

        {/* Trusted Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Trusted Indian Price Sources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.goodreturns.in/silver-rates/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border rounded-md hover:border-market-green transition-colors"
            >
              <h3 className="font-semibold text-onyx mb-1">GoodReturns.in</h3>
              <p className="text-sm text-gray-600">City-wise silver rates (Recommended)</p>
            </a>
            <a
              href="https://www.moneycontrol.com/commodity/silver-price.html"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border rounded-md hover:border-market-green transition-colors"
            >
              <h3 className="font-semibold text-onyx mb-1">MoneyControl</h3>
              <p className="text-sm text-gray-600">Real-time commodity prices</p>
            </a>
            <a
              href="https://www.mcxindia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border rounded-md hover:border-market-green transition-colors"
            >
              <h3 className="font-semibold text-onyx mb-1">MCX India</h3>
              <p className="text-sm text-gray-600">Official commodity exchange</p>
            </a>
            <a
              href="https://www.bullionbypost.in/silver-price/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border rounded-md hover:border-market-green transition-colors"
            >
              <h3 className="font-semibold text-onyx mb-1">BullionByPost</h3>
              <p className="text-sm text-gray-600">Dealer prices</p>
            </a>
          </div>
        </motion.div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-market-green hover:underline"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
