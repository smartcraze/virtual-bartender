import { motion } from 'framer-motion';
import { DrinkRecipe } from '../types';
import { X } from 'lucide-react';

interface DrinkDetailProps {
  drink: DrinkRecipe;
  onClose: () => void;
}

export function DrinkDetail({ drink, onClose }: DrinkDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="relative h-64">
          <img
            src={drink.image}
            alt={drink.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{drink.name}</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {drink.ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-gray-700"
                >
                  <span className="w-20">{ingredient.amount} {ingredient.unit}</span>
                  <span>{ingredient.name}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Instructions</h3>
            <ol className="space-y-3">
              {drink.instructions.map((instruction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-gray-700"
                >
                  {index + 1}. {instruction}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </motion.div>
  );
}