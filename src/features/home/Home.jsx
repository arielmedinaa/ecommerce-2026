import { useState, useEffect, useRef } from 'react';
import HeroCarousel from './components/hero/HeroCarrousel';
import CarrouselProductos from './components/carrousel/CarrouselProductos';
import CategoriasCard from './components/cards/CategoriasCard';
import MarcasCard from './components/cards/MarcasCard';
import CreditCard from './components/cards/CreditCard';
import Promotions from './components/cards/Promotions';

import Electrodomesticos from '@assets/images/categories/electrodomesticos.png';
import Automotor from '@assets/images/products/motor3D.png';
import CategoryPhone from '@assets/images/products/phone3D.png';
import CategoryTv from '@assets/images/products/tv3D.png';
import Apple from '@assets/images/backgrounds/appleBackground.jpg';
import Samsung from '@assets/images/backgrounds/samsungBackground.jpg';
import Bosch from '@assets/images/backgrounds/boschBackground.jpg';
import Philips from '@assets/images/backgrounds/philipsBackground.jpg';

const Home = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef(null);
  const prevScrollY = useRef(window.scrollY);
  const scrollThreshold = 500;
  const isScrollingDown = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isScrollingDown.current = currentScrollY > prevScrollY.current;
      if (isScrollingDown.current && currentScrollY > scrollThreshold && isHeroVisible) {
        setIsHeroVisible(false);
      } else if ((!isScrollingDown.current || currentScrollY <= scrollThreshold) && !isHeroVisible) {
        setIsHeroVisible(true);
      }
      
      prevScrollY.current = currentScrollY;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHeroVisible, scrollThreshold]);
  const categories = [
    { name: 'Automotor', description: 'KIA SPORTAGE', img: Automotor, color: 'bg-linear-to-br from-orange-300 to-orange-700', descriptionColor: 'text-orange-100', textColor: 'text-orange-600' },
    { name: 'Electrodomésticos', description: 'MIDAS', img: Electrodomesticos, color: 'bg-linear-to-br from-orange-300 to-orange-700', descriptionColor: 'text-orange-100', textColor: 'text-orange-600' },
    { name: 'Televisores', description: 'SAMRT TV', img: CategoryTv, color: 'bg-linear-to-br from-blue-300 to-blue-700', descriptionColor: 'text-blue-100', textColor: 'text-blue-600' },
    { name: 'Celulares', description: 'IPHONE 15', img: CategoryPhone, color: 'bg-linear-to-br from-orange-300 to-orange-700', descriptionColor: 'text-orange-100', textColor: 'text-orange-600' },
  ];

  const marcas = [
    { name: 'Apple', img: Apple, color: 'bg-orange-700' },
    { name: 'Samsung', img: Samsung, color: 'bg-orange-500' },
    { name: 'Bosch', img: Bosch, color: 'bg-orange-600' },
    { name: 'Philips', img: Philips, color: 'bg-orange-600' },
  ];

  const products = [
    { id: 1, name: 'Mint T-Shirt', price: '$29.99', image: '👕', color: 'bg-orange-50' },
    { id: 2, name: 'White Shirt', price: '$39.99', image: '👔', color: 'bg-amber-50' },
    { id: 3, name: 'Blue Hoodie', price: '$49.99', image: '🧥', color: 'bg-orange-100' },
    { id: 4, name: 'Yellow Set', price: '$59.99', image: '👗', color: 'bg-amber-100' },
  ];

  return (
    <div className="min-h-screen bg-orange-100 p-4 sm:p-6 lg:p-10">
      <div className="min-h-[calc(100vh-4rem)]" ref={heroRef}>
        <HeroCarousel isVisible={isHeroVisible} />

        <div className="w-full mt-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <CategoriasCard categories={categories} />

            <div className="w-full lg:w-3/5 h-full">
              <CarrouselProductos products={products} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full mt-20">
        <MarcasCard marcas={marcas} />
      </div>

      <div className="w-full mt-20">
        <div className="flex flex-col lg:flex-row gap-6">
          <CreditCard />
          <Promotions />
        </div>
      </div>
    </div>
  );
};

export default Home;