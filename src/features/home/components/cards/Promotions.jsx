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
      bgColor: 'bg-green-600',
      textColor: 'text-white',
      image: '🍻',
      fullWidth: true
    },
    {
      id: 2,
      title: 'Explora tarjetas de regalo para las fiestas',
      buttonText: 'Comprar ahora',
      bgColor: 'bg-green-100',
      textColor: 'text-gray-800',
      image: '🎁',
      fullWidth: false
    },
    {
      id: 3,
      title: 'Comparte una lista de deseos para las fiestas',
      buttonText: 'Envía la tuya',
      bgColor: 'bg-linear-to-r from-orange-700 to-yellow-600',
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
      bgColor: 'bg-linear-to-r from-orange-500 to-orange-300',
      textColor: 'text-white',
      image: '🍗',
      fullWidth: true
    }
  ];

  return (
    <div className="w-full lg:w-2/4 grid grid-cols-2 gap-4">
      {promotions.map((promo) => (
        <div 
          key={promo.id}
          className={`${promo.fullWidth ? 'col-span-2' : 'col-span-1'} ${promo.bgColor} ${promo.textColor} rounded-xl p-4 relative overflow-hidden`}
        >
          <div className="relative z-10">
            <h3 className="font-bold text-sm md:text-base mb-1">{promo.title}</h3>
            {promo.subtitle && <p className="text-sm mb-3">{promo.subtitle}</p>}
            <button className="bg-white text-gray-800 text-xs px-3 py-1 rounded-full font-medium mt-2">
              {promo.buttonText}
            </button>
            {promo.brand && (
              <div className="mt-3 text-xs opacity-80">{promo.brand}</div>
            )}
          </div>
          <div className="absolute right-2 bottom-2 text-5xl opacity-20">
            {promo.image}
          </div>
          {promo.badge && (
            <div className="absolute top-2 right-2 bg-white text-green-600 text-xs px-2 py-1 rounded-full font-bold">
              {promo.badge}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Promotions;
