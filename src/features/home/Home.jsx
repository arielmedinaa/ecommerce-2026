import { useState } from "react";
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

import Electrodomesticos from "@assets/images/categories/electrodomesticos.png";
import Automotor from "@assets/images/products/motor3D.png";
import CategoryPhone from "@assets/images/products/phone3D.png";
import CategoryTv from "@assets/images/products/tv3D.png";
import Apple from "@assets/images/backgrounds/appleBackground.jpg";
import Samsung from "@assets/images/backgrounds/samsungBackground.jpg";
import Bosch from "@assets/images/backgrounds/boschBackground.jpg";
import Philips from "@assets/images/backgrounds/philipsBackground.jpg";
import Electrodomestic from "@assets/images/products/electrodomestics.png";

import RegisterCard from "./components/cards/RegisterCard";
import EmojiExplosion from "./components/global/EmojiExplosion";
import { FiArrowRight } from "react-icons/fi";

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

  const marcas = [
    { name: "Apple", img: Apple, color: "bg-orange-700", buttonColor: "bg-orange-1" },
    { name: "Samsung", img: Samsung, color: "bg-orange-500", buttonColor: "bg-[#5f6566]" },
    { name: "Bosch", img: Bosch, color: "bg-orange-600", buttonColor: "bg-[#694b3b]" },
    { name: "Philips", img: Philips, color: "bg-orange-600", buttonColor: "bg-[#a24321]" },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
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

        <div className="w-full h-64 mt-10 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 relative bg-orange-970 rounded-l-3xl p-6 flex object-cover overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-orange-300"></div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-orange-300/70"></div>
          <div className="absolute -bottom-14 -right-14 w-40 h-40 rounded-full bg-orange-300/50"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-orange-300/30"></div>
          <div className="absolute -bottom-18 -right-18 w-56 h-56 rounded-full bg-orange-300/20"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-orange-300/10"></div>
          <div className="absolute -bottom-22 -right-22 w-72 h-72 rounded-full bg-orange-300/20"></div>

          <div className="flex w-full items-center justify-between z-20">
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
            <div className="w-1/3">
              <img
                src={Electrodomestic}
                alt="Electrodomestic"
                className="w-full h-auto"
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
      <div className="w-full min-h-screen mt-10 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 relative bg-linear-to-t from-slate-100 to-orange-300 p-6 flex object-cover overflow-hidden">
          
        </div>
    </div>
  );
};

export default Home;
