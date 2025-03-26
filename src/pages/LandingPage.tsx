import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ChevronRight, GlassWater } from 'lucide-react';

export function LandingPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  const [ref3, inView3] = useInView({ triggerOnce: true });
  const [ref4, inView4] = useInView({ triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583227061267-8428fb76fbfd?w=1600&auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-4 max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-amber-500 rounded-full mx-auto mb-8 flex items-center justify-center"
          >
            <GlassWater className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-7xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
            Master the Art of Mixology
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover the secrets of crafting exceptional cocktails from world-class bartenders.
            Your journey to becoming a mixology master starts here.
          </p>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Our Collection
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Featured Cocktails */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            ref={ref1}
            initial={{ opacity: 0, y: 50 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Signature Cocktails</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our carefully curated selection of classic and contemporary cocktails,
              each crafted to perfection with premium spirits and fresh ingredients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Classic Martini",
                image: "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=800&auto=format&fit=crop&q=60",
                description: "The epitome of sophistication"
              },
              {
                name: "Smoky Old Fashioned",
                image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop&q=60",
                description: "A modern twist on tradition"
              },
              {
                name: "Tropical Paradise",
                image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60",
                description: "Escape to the islands"
              }
            ].map((cocktail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-2xl shadow-xl"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{cocktail.name}</h3>
                    <p className="text-white/80">{cocktail.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Bartender Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=1600&auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-fixed" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 50 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            className="flex flex-col md:flex-row items-center gap-16"
          >
            <div className="flex-1">
              <h2 className="text-5xl font-bold mb-8">Learn from the Experts</h2>
              <p className="text-xl text-gray-300 mb-8">
                Our virtual bartending experience brings professional expertise right to your home.
                Master the techniques, understand the spirits, and learn the secrets behind
                creating extraordinary cocktails.
              </p>
              <ul className="space-y-4 text-lg text-gray-300">
                {[
                  "Professional mixing techniques",
                  "Spirit and flavor pairing",
                  "Garnishing masterclass",
                  "Bar tool essentials"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView2 ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-amber-500 rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800&auto=format&fit=crop&q=60"
                alt="Expert Bartender"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Ingredients */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            ref={ref3}
            initial={{ opacity: 0, y: 50 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Premium Ingredients</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every great cocktail starts with exceptional ingredients. Discover our curated
              selection of premium spirits, fresh fruits, and artisanal mixers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Aged Spirits",
                image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&auto=format&fit=crop&q=60"
              },
              {
                name: "Fresh Citrus",
                image: "https://images.unsplash.com/photo-1453824979084-c8fd42932378?w=800&auto=format&fit=crop&q=60"
              },
              {
                name: "Exotic Herbs",
                image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop&q=60"
              },
              {
                name: "Artisanal Mixers",
                image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=800&auto=format&fit=crop&q=60"
              }
            ].map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{ingredient.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-amber-500 to-red-500 text-white">
        <motion.div
          ref={ref4}
          initial={{ opacity: 0, y: 50 }}
          animate={inView4 ? { opacity: 1, y: 0 } : {}}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-5xl font-bold mb-8">Start Your Mixology Journey Today</h2>
          <p className="text-xl mb-12">
            Join thousands of cocktail enthusiasts who have mastered the art of mixology
            through our comprehensive collection of recipes and techniques.
          </p>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 bg-white text-amber-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Browse All Recipes
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}