"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, TruckIcon, SparklesIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import product_1 from '../assets/images/product-1.jpg';
import product_2 from '../assets/images/product-4.jpg';
import product_3 from '../assets/images/product-3.jpg';
import product_4 from '../assets/images/product-5.jpg';

const productImages = [product_1, product_2, product_3, product_4];
const categories = ['All', 'Plastic', 'Organic', 'E-Waste', 'Metal', 'General'];

const categoryColors = {
  All: 'bg-gray-500',
  Plastic: 'bg-blue-500',
  Organic: 'bg-green-500',
  'E-Waste': 'bg-red-500',
  Metal: 'bg-yellow-500',
  General: 'bg-purple-500'
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Generate dummy products (same as before)
  const products = Array.from({ length: 30 }, (_, i) => {
    const categories = ['Plastic', 'Organic', 'E-Waste', 'Metal', 'General'];
    const category = categories[i % 5];
    
    const productTemplates = {
      Plastic: {
        names: ['Recycle Bin', 'Shredder Machine', 'Storage Container', 'Sorting Station', 'Pelletizer'],
        descriptions: [
          'High-capacity plastic recycling solution',
          'Industrial-grade plastic processing equipment',
          'Durable plastic storage system',
          'Smart plastic sorting unit',
          'Plastic waste converter'
        ]
      },
      Organic: {
        names: ['Compost Bin', 'Vermicomposter', 'Bokashi Kit', 'Digester', 'Mulching Machine'],
        descriptions: [
          'Natural organic waste converter',
          'Efficient composting system',
          'Odorless kitchen composter',
          'Rapid organic digester',
          'Garden waste recycler'
        ]
      },
      'E-Waste': {
        names: ['Crusher Pro', 'PCB Recycler', 'Metal Extractor', 'Dust Collector', 'Sorting Line'],
        descriptions: [
          'E-waste crushing system',
          'Circuit board recycling unit',
          'Precious metal recovery machine',
          'E-waste dust management',
          'Automated sorting system'
        ]
      },
      Metal: {
        names: ['Can Press', 'Shredder', 'Magnetic Separator', 'Baler', 'Furnace'],
        descriptions: [
          'Aluminum can compressor',
          'Heavy-duty metal shredder',
          'Ferrous metal separator',
          'Scrap metal baler',
          'Melting furnace'
        ]
      },
      General: {
        names: ['Eco Bin', 'Smart Dustbin', 'Waste Segregator', 'Recycle Kit', 'Eco Bundle'],
        descriptions: [
          'Multi-purpose waste bin',
          'IoT-enabled smart bin',
          'Color-coded waste system',
          'Home recycling starter kit',
          'Complete waste solution'
        ]
      }
    };

    const template = productTemplates[category];
    const index = Math.floor(i / 5) % 5;

    const basePrice = {
      'E-Waste': 999,
      Metal: 799,
      Plastic: 1299,
      Organic: 899,
      General: 499
    }[category];

    return {
      id: i + 1,
      name: template.names[index],
      price: (basePrice + Math.random() * 5000).toFixed(0),
      description: template.descriptions[index],
      category: category,
      rating: Math.random() > 0.8 ? 3 : Math.random() > 0.4 ? 4 : 5,
      image: productImages[i % productImages.length]
    };
  });

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100 to-[#f0f2f5]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-4 sm:-top-8 left-1/2 -translate-x-1/2"
          >
            <SparklesIcon className="h-12 w-12 sm:h-16 sm:w-16 text-green-400 opacity-30" />
          </motion.div>
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3 sm:mb-4"
          >
            EarthCycle Store
          </motion.h1>
          <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
            Premium waste management solutions for sustainable living
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Mobile Filter Dropdown */}
          <div className="lg:hidden relative">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 bg-white appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="flex items-center gap-2">
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:w-64 xl:w-72">
            <div className="bg-[#e4a400] p-5 rounded-xl shadow-lg sticky top-24 border border-gray-100 ">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Filter Products</h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3
                      ${selectedCategory === cat
                        ? 'bg-green-100 text-green-700 font-semibold'
                        : 'hover:bg-gray-50 text-gray-950'}`}
                  >
                    <div className={`w-3 h-3 rounded-full ${categoryColors[cat]}`} />
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 flex-1"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs sm:text-sm flex items-center">
                    ⭐ {product.rating}/5
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:p-5">
                  <div className="mb-2">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[product.category]} text-white`}>
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 text-sm"
                    >
                      <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </motion.button>
                  </div>
                </div>

                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-50 border-t">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500" />
                    <span>Eco-friendly shipping</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Shop;