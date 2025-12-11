import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "DISCOUNTS UP TO 50% FROM",
      subtitle: "ANSWEAR CLUB ORIGINAL GOODS",
      description: "Luxury meets ultimate sitting comfort",
      promocode: "10030",
      bgColor: "from-orange-500 via-orange-600 to-amber-600",
      image: "👟"
    },
    {
      id: 2,
      title: "NEW SPRING COLLECTION",
      subtitle: "FRESH STYLES FOR 2025",
      description: "Discover the latest trends in fashion",
      promocode: "SPRING25",
      bgColor: "from-amber-500 via-orange-500 to-yellow-500",
      image: "👗"
    },
    {
      id: 3,
      title: "EXCLUSIVE MEMBER DEALS",
      subtitle: "JOIN THE CLUB TODAY",
      description: "Get access to premium discounts",
      promocode: "MEMBER10",
      bgColor: "from-orange-600 via-amber-600 to-orange-700",
      image: "🎁"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative bg-linear-to-r from-orange-500 via-orange-600 to-amber-600 rounded-3xl overflow-hidden shadow-xl mb-4 sm:mb-20 h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
      >
        <FiChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
      >
        <FiChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <AnimatePresence key={slide.id}>
            {currentSlide === index && (
              <motion.div
                initial={{ opacity: 0, x: index > currentSlide ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: index < currentSlide ? 100 : -100 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 w-full h-full ${slide.bgColor} p-8 sm:p-12`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between h-full pt-10 sm:pt-12 md:pt-0 px-4 sm:px-6 md:px-12">
                  <div className="relative z-10 w-full md:max-w-2xl text-center md:text-left mb-6 md:mb-0">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 text-white"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white"
                    >
                      {slide.subtitle}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-base sm:text-lg text-white/90 mb-4 sm:mb-6"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="mb-6"
                    >
                      <p className="text-sm text-white/80 mb-2">
                        PROMOCODE: <span className="font-bold text-lg text-white">{slide.promocode}</span>
                      </p>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
                    >
                      Discover →
                    </motion.button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="hidden lg:block text-9xl"
                  >
                    {slide.image}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      <div className="hidden sm:flex absolute bottom-4 sm:bottom-6 right-4 sm:right-6 gap-2 z-20">
        {slides.map((slide, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all ${
              currentSlide === index 
                ? 'bg-orange-50 shadow-lg ring-2 ring-white' 
                : 'bg-orange-50 hover:bg-orange-50/75'
            }`}
          >
            {slide.image}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;