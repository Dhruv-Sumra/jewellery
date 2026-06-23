'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Heart, Shield, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-onyx text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light tracking-wider mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Crafting timeless elegance since the beginning
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light tracking-wider mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Argentum, we believe in transparency, quality, and timeless design. Every piece
              of jewelry tells a story - crafted by skilled artisans using the finest 925 silver.
              We've revolutionized jewelry pricing by offering real-time market-based rates,
              ensuring you always get fair value for authentic craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light tracking-wider text-center mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Authentic 925 Silver',
                description: 'Every piece is hallmarked and certified for purity',
              },
              {
                icon: Sparkles,
                title: 'Live Market Pricing',
                description: 'Transparent pricing based on real-time silver rates',
              },
              {
                icon: Heart,
                title: 'Handcrafted Excellence',
                description: 'Each piece is carefully crafted by skilled artisans',
              },
              {
                icon: Award,
                title: 'Lifetime Warranty',
                description: 'We stand behind every piece we create',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
              >
                <value.icon className="w-12 h-12 mx-auto mb-4 text-market-green" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-light tracking-wider mb-6">
                Crafted with Precision
              </h2>
              <p className="text-gray-600 mb-4">
                Each piece begins with a vision and is brought to life through meticulous
                craftsmanship. Our artisans use time-honored techniques combined with modern
                innovation to create jewelry that stands the test of time.
              </p>
              <p className="text-gray-600 mb-4">
                From initial sketches to the final polish, every step is carefully monitored
                to ensure the highest quality standards. We use only premium 925 sterling
                silver, ensuring durability and lasting beauty.
              </p>
              <p className="text-gray-600">
                Our commitment to transparency means you know exactly what you're paying for
                - silver cost, making charges, and GST, all calculated using live market rates.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-onyx to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-light tracking-wider mb-6"
          >
            Experience the Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 mb-8"
          >
            Discover jewelry that combines traditional craftsmanship with modern transparency
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            href="/products"
            className="inline-block bg-market-green text-white px-8 py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            Explore Collection
          </motion.a>
        </div>
      </section>
    </div>
  );
}
