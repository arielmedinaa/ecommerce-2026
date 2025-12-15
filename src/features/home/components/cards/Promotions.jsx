import React from 'react';
import { motion } from 'framer-motion';

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: 'Completa el espíritu festivo',
      subtitle: 'Cervezas y bebidas en 1 hora*',
      buttonText: 'Comprar',
      badge: 'Express Delivery',
      bgBadge: 'bg-orange-500',
      gradient: 'from-orange-400 via-amber-500 to-yellow-500',
      textColor: 'text-white',
      image: '🍻',
      fullWidth: true
    },
    {
      id: 2,
      title: 'Explora tarjetas de regalo para las fiestas',
      buttonText: 'Comprar ahora',
      gradient: 'from-yellow-400 via-orange-400 to-amber-500',
      textColor: 'text-white',
      image: '🎁',
      fullWidth: false
    },
    {
      id: 3,
      title: 'Comparte una lista de deseos para las fiestas',
      buttonText: 'Envía la tuya',
      gradient: 'from-blue-400 via-blue-300 to-blue-400',
      textColor: 'text-white',
      image: '👶',
      fullWidth: false
    },
    {
      id: 4,
      title: 'Ayuda a brindar una comida festiva',
      subtitle: 'desde solo $5',
      buttonText: 'Donar ahora',
      brand: 'THE SALVATION ARMY',
      gradient: 'from-orange-500 via-orange-400 to-orange-700',
      textColor: 'text-white',
      image: '🍗',
      fullWidth: true
    }
  ];

  return (
      <div className="w-full lg:w-2/4 grid grid-cols-2 gap-4 font-poppins">
        {promotions.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              ${promo.fullWidth ? 'md:col-span-2' : 'col-span-1'} 
              bg-linear-to-br ${promo.gradient}
              ${promo.textColor} 
              rounded-2xl p-6 relative overflow-hidden 
              shadow-lg hover:shadow-xl transition-all duration-300
              min-h-10
            `}
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/0 opacity-50"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="font-bold text-lg md:text-xl mb-2 leading-tight">
                  {promo.title}
                </h3>
                {promo.subtitle && (
                  <p className="text-sm md:text-base mb-3 opacity-90">
                    {promo.subtitle}
                  </p>
                )}
              </div>
              
              <div className="mt-auto">
                {promo.brand && (
                  <div className="text-xs font-semibold mb-3 opacity-90 tracking-wider">
                    {promo.brand}
                  </div>
                )}
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-800 text-sm px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  {promo.buttonText}
                </motion.button>
              </div>
            </div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="absolute right-4 bottom-4 text-6xl md:text-7xl opacity-80"
            >
              {promo.image}
            </motion.div>
            
            {promo.badge && (
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`
                  absolute top-4 right-4 
                  ${promo.bgBadge} text-white 
                  text-xs px-3 py-1.5 rounded-full 
                  font-bold shadow-md
                `}
              >
                {promo.badge}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
  );
};

export default Promotions;