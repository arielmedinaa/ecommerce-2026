import { useState, useEffect, useRef } from "react";
import HeroCarousel from "./components/hero/HeroCarrousel";
import Carrousel from "@core/ui/components/carrousel/Carrousel";
import CategoriasCard from "./components/cards/CategoriasCard";
import MarcasCard from "./components/cards/MarcasCard";
import CreditCard from "./components/cards/CreditCard";
import Promotions from "./components/cards/Promotions";
import PromotionsCarrousel from "./components/carrousel/PromotionsCarrousel";
import InfoCarrousel from "./components/carrousel/InfoCarrousel";
import useHookHome from "./hooks/useHookHome";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

import Electrodomesticos from "@assets/images/categories/electrodomesticos.png";
import Automotor from "@assets/images/products/motor3D.png";
import CategoryPhone from "@assets/images/products/phone3D.png";
import CategoryTv from "@assets/images/products/tv3D.png";
import Apple from "@assets/images/backgrounds/appleBackground.jpg";
import Samsung from "@assets/images/backgrounds/samsungBackground.jpg";
import Bosch from "@assets/images/backgrounds/boschBackground.jpg";
import Philips from "@assets/images/backgrounds/philipsBackground.jpg";
import Electrodomestic from "@assets/images/products/electrodomestics.png";

import FireIcon from "@assets/icons/fire.webp";
import StarIcon from "@assets/icons/star.webp";
import TruckIcon from "@assets/icons/truck.webp";
import CreditCardIcon from "@assets/icons/creditCard.webp";

import RegisterCard from "./components/cards/RegisterCard";
import EmojiExplosion from "./components/global/EmojiExplosion";
import { FiArrowRight, FiTruck } from "react-icons/fi";

const Home = () => {
  const { ref: loadMoreRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "20px 0px",
  });
  const home = useHookHome(loadMoreRef, inView);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const scrollSectionRef = useRef(null);
  const { ref: scrollInViewRef, inView: isScrollSectionVisible } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ["start 3", "end 0.3"] // Más visible durante el scroll
  });

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const marcas = [
    { name: "Apple", img: Apple, color: "bg-orange-700", buttonColor: "bg-orange-1" },
    { name: "Samsung", img: Samsung, color: "bg-orange-500", buttonColor: "bg-[#5f6566]" },
    { name: "Bosch", img: Bosch, color: "bg-orange-600", buttonColor: "bg-[#694b3b]" },
    { name: "Philips", img: Philips, color: "bg-orange-600", buttonColor: "bg-[#a24321]" },
  ];

  // Iconos flotantes con posiciones aleatorias, profundidad y blur
  const floatingIcons = [
    { src: FireIcon, alt: "Fire", delay: 0, x: "10%", y: "15%", zIndex: 1, blur: 2 },
    { src: StarIcon, alt: "Star", delay: 0.1, x: "80%", y: "25%", zIndex: 30, blur: 0 },
    { src: TruckIcon, alt: "Truck", delay: 0.2, x: "15%", y: "70%", zIndex: 30, blur: 0 },
    { src: CreditCardIcon, alt: "Credit Card", delay: 0.15, x: "85%", y: "60%", zIndex: 1, blur: 3 },
    { src: FireIcon, alt: "Fire 2", delay: 0.05, x: "45%", y: "35%", zIndex: 30, blur: 0 },
    { src: StarIcon, alt: "Star 2", delay: 0.25, x: "60%", y: "80%", zIndex: 1, blur: 2 },
    { src: TruckIcon, alt: "Truck 2", delay: 0.3, x: "30%", y: "45%", zIndex: 1, blur: 3 },
    { src: CreditCardIcon, alt: "Credit Card 2", delay: 0.08, x: "70%", y: "20%", zIndex: 30, blur: 0 },
  ];

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1]);

  return (
    <div className="min-h-screen">
      <div className="p-16 mx-auto">
        <div className="w-full h-full p-1 relative">
          <div className="absolute top-0 left-0 w-full h-full z-10">
            <EmojiExplosion isActive={currentSlide === 2} />
          </div>
          <HeroCarousel
            isVisible={home.isHeroVisible}
            banners={home.banners}
            onSlideChange={handleSlideChange}
          />
        </div>

        <InfoCarrousel />

        <div className="w-full h-64 mt-10 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 relative">
          <div className="absolute inset-0 bg-orange-970 rounded-l-3xl overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-orange-300"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-orange-300/70"></div>
            <div className="absolute -bottom-14 -right-14 w-40 h-40 rounded-full bg-orange-300/50"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-orange-300/30"></div>
            <div className="absolute -bottom-18 -right-18 w-56 h-56 rounded-full bg-orange-300/20"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-orange-300/10"></div>
            <div className="absolute -bottom-22 -right-22 w-72 h-72 rounded-full bg-orange-300/20"></div>
          </div>

          <div className="absolute -top-5 -right-6 z-30 bg-orange-400 rounded-full px-5 py-2.5 flex items-center gap-2 shadow-lg">
            <FiTruck className="w-6 h-6 text-white" />
            <span className="text-white text-xl font-poppins">24hs</span>
          </div>

          <div className="relative flex w-full h-full items-center justify-between z-20 p-6">
            <div className="w-2/3 p-3 rounded-md">
              <p className="text-white text-5xl font-bold italic mb-2">
                Hoy conviene comprar
              </p>
              <p className="text-white text-lg font-poppins mb-3">
                Aprovecha y compra todos los productos con un mejor precio y
                descuentos con la tarjeta de{" "}
                <span className="font-bold">Central Shop</span>
              </p>
              <button className="text-white text-lg italic bg-orange-300/40 rounded-full px-4 py-1 flex items-center gap-1">
                Ver más <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="w-1/4 relative">
              <img
                src={Electrodomestic}
                alt="Electrodomestic"
                className="w-full h-auto absolute -top-20 right-0 transform scale-125"
              />
            </div>
          </div>
        </div>

        <PromotionsCarrousel />
        <PromotionsCarrousel />

        <div
          className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 relative"
          ref={loadMoreRef}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div
              className="w-[9000px] h-60 blur-3xl rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(249, 116, 22, 0.89) 0%, rgba(251, 146, 60, 0.92) 50%, transparent 100%)",
              }}
            />
          </div>
          <div className="relative z-10">
            <MarcasCard marcas={marcas} />
          </div>
        </div>


      </div>
      
      {/* Sección con scroll dinámico */}
      <motion.div 
        ref={(node) => {
          scrollSectionRef.current = node;
          scrollInViewRef(node);
        }}
        className="w-full min-h-screen mt-10 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 relative p-8 md:p-12 lg:p-16 flex flex-col justify-between overflow-hidden"
        initial={{ backgroundColor: "rgb(255, 255, 255)" }}
        animate={isScrollSectionVisible ? {
          backgroundColor: "rgb(251, 146, 60)"
        } : {
          backgroundColor: "rgb(255, 255, 255)"
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
          {/* Iconos flotantes con profundidad */}
          {floatingIcons.map((icon, index) => (
            <motion.div
              key={`${icon.alt}-${index}`}
              className="absolute pointer-events-none"
              style={{
                left: icon.x,
                top: icon.y,
                zIndex: icon.zIndex,
                filter: `blur(${icon.blur}px)`,
              }}
              initial={{ 
                opacity: 0, 
                scale: 0
              }}
              animate={isScrollSectionVisible ? {
                opacity: icon.blur > 0 ? 0.5 : 0.8,
                scale: 1
              } : {}}
              transition={{
                duration: 0.6,
                delay: icon.delay,
                ease: "easeOut"
              }}
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
              />
            </motion.div>
          ))}

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isScrollSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 max-w-7xl w-full mb-auto"
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium italic text-white mb-2 font-poppins">
            ¿Qué te conviene hoy?
          </h3>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white font-poppins uppercase leading-tight">
            BENEFICIOS<br />
            EXCLUSIVOS PARA<br />
            VOS
          </h2>
        </motion.div>

        {/* Tarjetas de beneficios */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isScrollSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl mx-auto"
        >
          {/* Card 1 - Más barato */}
          <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-3xl p-6 flex flex-col justify-between min-h-[280px]">
            <div>
              <h4 className="text-2xl font-bold text-white mb-3 font-poppins">
                Más barato
              </h4>
              <p className="text-white/90 text-sm font-poppins">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            <button className="mt-6 px-6 py-2 border-2 border-white text-white rounded-full font-poppins font-medium hover:bg-white hover:text-orange-600 transition-all duration-300">
              COMPRAR
            </button>
          </div>

          {/* Card 2 - Mejor con tarjeta */}
          <div className="bg-linear-to-br from-orange-400 to-orange-500 rounded-3xl p-6 flex flex-col justify-between min-h-[280px]">
            <div>
              <h4 className="text-2xl font-bold text-white mb-3 font-poppins">
                Mejor con tarjeta
              </h4>
              <p className="text-white/90 text-sm font-poppins">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            <button className="mt-6 px-6 py-2 border-2 border-white text-white rounded-full font-poppins font-medium hover:bg-white hover:text-orange-500 transition-all duration-300">
              COMPRAR
            </button>
          </div>

          {/* Card 3 - Entrega en 24h */}
          <div className="bg-linear-to-br from-yellow-400 to-orange-400 rounded-3xl p-6 flex flex-col justify-between min-h-[280px]">
            <div>
              <h4 className="text-2xl font-bold text-white mb-3 font-poppins">
                Entrega en 24h
              </h4>
              <p className="text-white/90 text-sm font-poppins">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            <button className="mt-6 px-6 py-2 border-2 border-white text-white rounded-full font-poppins font-medium hover:bg-white hover:text-orange-500 transition-all duration-300">
              COMPRAR
            </button>
          </div>

          {/* Card 4 - Más puntos */}
          <div className="bg-linear-to-br from-orange-600 to-red-500 rounded-3xl p-6 flex flex-col justify-between min-h-[280px]">
            <div>
              <h4 className="text-2xl font-bold text-white mb-3 font-poppins">
                Más puntos
              </h4>
              <p className="text-white/90 text-sm font-poppins">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            <button className="mt-6 px-6 py-2 border-2 border-white text-white rounded-full font-poppins font-medium hover:bg-orange-400 hover:text-red-600 transition-all duration-300">
              COMPRAR
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
