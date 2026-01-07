import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PropTypes from "prop-types";
import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin, Draggable);

import useHookSIide from "../../hooks/useHookSIide";

import Hero1Video from "@assets/videos/backgroundVideo.mp4";
import Hero2Video from "@assets/videos/blackfriday.mp4";

const HeroCarousel = ({ isVisible = true, banners, onSlideChange }) => {
  const emojiContainerRef = useRef(null);
  const emojisRef = useRef([]);
  const prevSlideRef = useRef(0);

  const slides = [
    {
      id: 1,
      title: "DISCOUNTS UP TO 50% FROM",
      subtitle: "ANSWER CLUB ORIGINAL GOODS",
      description: "Luxury meets ultimate sitting comfort",
      promocode: "10030",
      bgColor: "from-orange-500 via-orange-600 to-amber-600",
      image: "👟",
    },
    {
      id: 2,
      title: "NEW SPRING COLLECTION",
      subtitle: "FRESH STYLES FOR 2025",
      description: "Discover the latest trends in fashion",
      promocode: "SPRING25",
      bgColor: "from-amber-500 via-orange-500 to-yellow-500",
      image: "👗",
    },
    {
      id: 3,
      title: "EXCLUSIVE MEMBER DEALS",
      subtitle: "JOIN THE CLUB TODAY",
      description: "Get access to premium discounts",
      promocode: "MEMBER10",
      bgColor: "from-orange-600 via-amber-600 to-orange-700",
      image: "🎁",
      emojis: [
        "🎉",
        "✨",
        "🎊",
        "💫",
        "🌟",
        "🎈",
        "🎁",
        "🎀",
        "💥",
        "🔥",
        "🎇",
        "🎆",
      ],
    },
  ];

  const { currentSlide, nextSlide, prevSlide, goToSlide } =
    useHookSIide(slides);

  const createEmojis = useCallback(() => {
    const container = emojiContainerRef.current;
    if (!container) return;

    // Clear existing emojis
    container.innerHTML = "";
    emojisRef.current = [];

    const emojis = [];
    const { width, height } = container.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    // Create emoji elements
    for (let i = 0; i < 30; i++) {
      const emoji = document.createElement("div");
      emoji.className =
        "emoji absolute text-2xl md:text-3xl select-none pointer-events-none";
      emoji.textContent =
        slides[2].emojis[Math.floor(Math.random() * slides[2].emojis.length)];

      // Set initial position at center
      gsap.set(emoji, {
        x: centerX,
        y: centerY,
        scale: 0,
        opacity: 0,
        rotation: Math.random() * 360,
        transformOrigin: "center center",
        z: 0,
      });

      // Calculate random final position
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 150;
      const finalX = centerX + Math.cos(angle) * distance;
      const finalY = centerY + Math.sin(angle) * distance;

      // Store animation targets
      emoji._gsap = {
        finalX,
        finalY,
        scale: 0.5 + Math.random() * 1.5,
        rotation: Math.random() * 360,
      };

      container.appendChild(emoji);
      emojis.push(emoji);
    }

    emojisRef.current = emojis;
  }, []);

  const animateEmojis = useCallback(() => {
    if (!emojisRef.current.length) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate emojis out from center
    emojisRef.current.forEach((emoji) => {
      const { finalX, finalY, scale, rotation } = emoji._gsap;

      tl.to(
        emoji,
        {
          x: finalX,
          y: finalY,
          scale: scale,
          opacity: 0.8,
          rotation: rotation,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        },
        Math.random() * 0.5
      ); // Stagger start times

      // Add floating animation
      gsap.to(emoji, {
        y: "+=10",
        x: "+=5",
        rotation: "+=5",
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return tl;
  }, []);

  useEffect(() => {
    // Notificar al componente padre cuando el slide cambia
    if (onSlideChange) {
      onSlideChange(currentSlide);
    }
  }, [currentSlide, onSlideChange]);

  useEffect(() => {
    // Only run the animation when the third slide is active
    if (currentSlide === 2) {
      if (prevSlideRef.current !== 2) {
        createEmojis();
        const timer = setTimeout(() => {
          animateEmojis();
        }, 100);
        return () => clearTimeout(timer);
      }
    } else if (prevSlideRef.current === 2) {
      // When leaving the third slide, clean up emojis
      if (emojiContainerRef.current) {
        emojiContainerRef.current.innerHTML = "";
        emojisRef.current = [];
      }
    }
    prevSlideRef.current = currentSlide;
  }, [currentSlide, animateEmojis, createEmojis]);

  return (
    <motion.div
      className="relative bg-linear-to-r from-orange-500 via-orange-600 to-amber-600 rounded-3xl overflow-hidden shadow-xl mb-4 sm:mb-20 h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]"
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -100,
        scale: isVisible ? 1 : 0.98,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.4 },
        },
      }}
      style={{
        transformOrigin: "top center",
        willChange: "opacity, transform",
      }}
    >
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white/55 p-3 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
      >
        <FiChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white/55 p-3 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
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
                className={`absolute inset-0 w-full h-full p-8 sm:p-12 ${
                  index === 0 ? "bg-black" : slide.bgColor
                }`}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {index === 0 ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={Hero1Video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : index === 1 ? (
                    <img
                      src={banners[0]?.imageUrl}
                      alt="NavidadCentralShop"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={Hero2Video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
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
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
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
                ? "bg-orange-50 shadow-lg ring-2 ring-white"
                : "bg-orange-50 hover:bg-orange-50/75"
            }`}
          >
            {slide.image}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Add CSS for 3D effect
const style = document.createElement("style");
style.textContent = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .emoji {
    will-change: transform, opacity;
    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(style);

HeroCarousel.propTypes = {
  isVisible: PropTypes.bool,
  onSlideChange: PropTypes.func,
};

export default HeroCarousel;
