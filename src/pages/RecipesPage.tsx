import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { drinks } from '../data/drinks';
import { DrinkCard } from '../components/DrinkCard';
import { DrinkDetail } from '../components/DrinkDetail';
import type { DrinkRecipe } from '../types';
import { Search } from 'lucide-react';

export function RecipesPage() {
  const [selectedDrink, setSelectedDrink] = useState<DrinkRecipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(drinks.map(drink => drink.category))];

  const filteredDrinks = drinks.filter(drink => {
    const matchesSearch = drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drink.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || drink.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              Cocktail Collection
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our extensive collection of handcrafted cocktail recipes, from timeless classics
              to modern innovations.
            </p>
          </motion.div>

          <div className="mb-8 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cocktails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDrinks.map((drink) => (
              <DrinkCard
                key={drink.id}
                drink={drink}
                onClick={() => setSelectedDrink(drink)}
              />
            ))}
          </motion.div>

          {filteredDrinks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600">No cocktails found matching your search.</p>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedDrink && (
          <DrinkDetail
            drink={selectedDrink}
            onClose={() => setSelectedDrink(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}