import { motion } from 'framer-motion';
import { DrinkRecipe } from '../types';
import { ChevronRight } from 'lucide-react';

interface DrinkCardProps {
  drink: DrinkRecipe;
  onClick: () => void;
}

export function DrinkCard({ drink, onClick }: DrinkCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img
          src={drink.image}
          alt={drink.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-bold">{drink.name}</h3>
          <p className="text-sm opacity-80">{drink.category}</p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">{drink.ingredients.length} ingredients</p>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </motion.div>
  );
}