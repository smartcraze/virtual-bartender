import { GlassWater } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
      <div className="max-w-7xl mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <GlassWater className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              Virtual Bartender
            </h1>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? '✖' : '☰'}
          </button>

          {/* Navigation */}
          <nav
            className={`${
              isOpen ? 'block' : 'hidden'
            } absolute top-full left-0 w-full bg-white shadow-lg lg:shadow-none lg:bg-transparent lg:static lg:flex gap-8`}
          >
            {['/', '/recipes', '/chat'].map((path, index) => (
              <Link
                key={index}
                to={path}
                className={`relative px-4 py-2 block $ {
                  location.pathname === path ? 'text-amber-600' : 'text-gray-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {path === '/' ? 'Home' : path === '/recipes' ? 'Recipes' : 'Ask AI'}
                {location.pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-red-500"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
