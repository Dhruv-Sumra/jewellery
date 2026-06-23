'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import Image from 'next/image';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    setMounted(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/');
    }
  }, [items, mounted, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!session?.user) {
      alert('Please sign in to continue');
      return;
    }

    // Validate form
    const requiredFields = ['fullName', 'phone', 'addressLine1', 'city', 'state', 'pincode'];
    const emptyFields = requiredFields.filter((field) => !shippingAddress[field as keyof typeof shippingAddress]);

    if (emptyFields.length > 0) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      // Create order on backend
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          shippingAddress,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Initialize Razorpay
      const options = {
        key: data.keyId,
        amount: data.amount * 100,
        currency: data.currency,
        name: 'Argentum',
        description: 'Silver Jewelry Purchase',
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.orderId,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              clearCart();
              router.push(`/order-success?orderId=${data.orderId}`);
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: session.user.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: '#0F0F0F',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light tracking-wider text-onyx mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={shippingAddress.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-market-green focus:border-transparent"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-market-green focus:border-transparent"
              />
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1 *"
                value={shippingAddress.addressLine1}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-market-green focus:border-transparent"
              />
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                value={shippingAddress.addressLine2}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-market-green focus:border-transparent"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-market-green focus:border-transparent"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State *"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-market-green focus:border-transparent"
                />
              </div>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode *"
                value={shippingAddress.pincode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-market-green focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm h-fit"
          >
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.productId} className="flex space-x-3">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-onyx">
                      ₹{(item.pricing.finalPrice * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-market-green text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Pay with Razorpay'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
