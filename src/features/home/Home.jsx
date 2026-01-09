import HeroCarousel from "./components/hero/HeroCarrousel";
import CarrouselProductos from "./components/carrousel/CarrouselProductos";
import CategoriasCard from "./components/cards/CategoriasCard";
import MarcasCard from "./components/cards/MarcasCard";
import CreditCard from "./components/cards/CreditCard";
import Promotions from "./components/cards/Promotions";
import PromotionsCarrousel from "./components/carrousel/PromotionsCarrousel";
import useHookHome from "./hooks/useHookHome";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Electrodomesticos from "@assets/images/categories/electrodomesticos.png";
import Automotor from "@assets/images/products/motor3D.png";
import CategoryPhone from "@assets/images/products/phone3D.png";
import CategoryTv from "@assets/images/products/tv3D.png";
import Apple from "@assets/images/backgrounds/appleBackground.jpg";
import Samsung from "@assets/images/backgrounds/samsungBackground.jpg";
import Bosch from "@assets/images/backgrounds/boschBackground.jpg";
import Philips from "@assets/images/backgrounds/philipsBackground.jpg";

import BlackFriday from "@assets/icons/blackFriday1.webp";
import BlackFriday2 from "@assets/icons/blackFriday2.webp";
import BlackFriday3 from "@assets/icons/blackFriday3.webp";

const EmojiExplosion = ({ isActive }) => {
  const containerRef = useRef(null);
  const images = [BlackFriday, BlackFriday2, BlackFriday3];
  const hasExplodedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isActive || hasExplodedRef.current) {
      return;
    }

    const createImageBurst = () => {
      const imageCount = 30;
      const imageElements = [];

      for (let i = 0; i < imageCount; i++) {
        const image = document.createElement("img");
        image.src = images[i % 3];
        image.alt = "Black Friday";

        const sizeClass =
          Math.random() < 0.3
            ? "w-24 h-24 md:w-32 md:h-32"
            : Math.random() < 0.6
            ? "w-20 h-20 md:w-28 md:h-28"
            : "w-16 h-16 md:w-24 md:h-24";

        image.className = `absolute ${sizeClass} object-cover rounded-lg`;
        image.style.left = "50%";
        image.style.top = "50%";
        image.style.transform = "translate(-50%, -50%)";
        image.style.zIndex = "20";
        image.style.clipPath = "inset(0)";
        image.style.maxWidth = "100%";
        image.style.maxHeight = "100%";

        container.appendChild(image);
        imageElements.push(image);
      }

      imageElements.forEach((image, index) => {
        const angle = (Math.PI * 2 * index) / imageCount;
        const distance = 300 + Math.random() * 400;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotation = Math.random() * 720 - 360;
        const scale = 0.3 + Math.random() * 2.5;
        const hasBlur = Math.random() < 0.4;

        gsap
          .timeline()
          .to(image, {
            duration: 0.01,
            scale: 1,
            opacity: 1,
            ease: "power1.out",
          })
          .to(image, {
            duration: 0.6,
            x: x,
            y: y,
            rotation: rotation,
            scale: scale,
            opacity: 1,
            ease: "power2.out",
            delay: Math.random() * 0.15,
            onComplete: () => {
              if (hasBlur) {
                image.style.filter = "blur(2px)";
              }
            },
          });
      });

      hasExplodedRef.current = true;
    };

    const timer = setTimeout(createImageBurst, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ clipPath: "inset(0)" }}
    ></div>
  );
};

const Home = () => {
  const { ref: loadMoreRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "20px 0px",
  });
  const home = useHookHome(loadMoreRef, inView);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const categories = [
    {
      name: "Automotor",
      description: "KIA SPORTAGE",
      img: Automotor,
      color: "bg-linear-to-br from-orange-300 to-orange-700",
      descriptionColor: "text-orange-100",
      textColor: "text-orange-600",
    },
    {
      name: "Electrodomésticos",
      description: "MIDAS",
      img: Electrodomesticos,
      color: "bg-linear-to-br from-orange-300 to-orange-700",
      descriptionColor: "text-orange-100",
      textColor: "text-orange-600",
    },
    {
      name: "Televisores",
      description: "SAMRT TV",
      img: CategoryTv,
      color: "bg-linear-to-br from-blue-300 to-blue-700",
      descriptionColor: "text-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "Celulares",
      description: "IPHONE 15",
      img: CategoryPhone,
      color: "bg-linear-to-br from-orange-300 to-orange-700",
      descriptionColor: "text-orange-100",
      textColor: "text-orange-600",
    },
  ];

  const marcas = [
    { name: "Apple", img: Apple, color: "bg-orange-700" },
    { name: "Samsung", img: Samsung, color: "bg-orange-500" },
    { name: "Bosch", img: Bosch, color: "bg-orange-600" },
    { name: "Philips", img: Philips, color: "bg-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-orange-100 p-4 sm:p-6 lg:p-10">
      <div className="min-h-[calc(100vh-4rem)]" ref={home.heroRef}>
        {/* PRIMERA SECCION - HERO CAROUSEL */}
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
        {/* PRIMERA SECCION - HERO CAROUSEL */}

        {/* SEGUNDA SECCION - CATEGORIAS Y CARROUSEL */}
        <div className="w-full mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <CategoriasCard categories={categories} />

            <div className="w-full lg:w-3/5 h-full">
              <CarrouselProductos products={home.productos} />
            </div>
          </div>
        </div>
        {/* SEGUNDA SECCION - CATEGORIAS Y CARROUSEL */}
      </div>

      {/* TERCERA SECCION - MARCAS */}
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
      {/* TERCERA SECCION - MARCAS */}

      {/* CUARTA SECCION - PROMOCIONES */}
      <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className="w-[8000px] h-80 blur-2xl rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 146, 60, 0.8) 0%, rgba(249, 115, 22, 0.6) 40%, rgba(254, 215, 170, 0.4) 70%, transparent 100%)",
            }}
          />
        </div>
        <div className="relative z-10">
          <PromotionsCarrousel />
        </div>
      </div>
      {/* CUARTA SECCION - PROMOCIONES */}

      {/* QUINTA SECCION - REGISTRO RAPIDO DE USUARIOS */}
      <div
        className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 py-8 px-4 sm:px-6 lg:px-8
                  bg-linear-to-r from-orange-300 to-orange-400 rounded-full font-poppins"
      >
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-orange-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="text-orange-100">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Regístrate Ahora
              </h2>
              <p className="text-sm sm:text-base">
                y accede a ofertas exclusivas.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Correo..."
              className="w-full sm:w-48 p-3 rounded-full bg-orange-50 text-orange-800 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
            <input
              type="password"
              placeholder="Contraseña..."
              className="w-full sm:w-48 p-3 rounded-full bg-orange-50 text-orange-800 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
            <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-yellow-400 text-orange-800 font-bold text-lg shadow-md hover:bg-yellow-300 transition-colors">
              Registrar
            </button>
          </div>
        </div>
      </div>
      {/* QUINTA SECCION - REGISTRO RAPIDO DE USUARIOS */}

      {/* SEXTA SECCION - TARJETAS Y PROMOCIONES */}
      <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className="w-[7000px] h-96 blur-2xl rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(254, 215, 170, 0.7) 0%, rgba(251, 146, 60, 0.5) 30%, rgba(249, 115, 22, 0.3) 60%, transparent 100%)",
            }}
          />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <CreditCard />
            <Promotions />
          </div>
        </div>
      </div>
      {/* SEXTA SECCION - TARJETAS Y PROMOCIONES */}
    </div>
  );
};

export default Home;
