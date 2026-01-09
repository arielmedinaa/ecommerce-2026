import { useState } from "react";
import HeroCarousel from "./components/hero/HeroCarrousel";
import Carrousel from "@core/ui/components/carrousel/Carrousel";
import CategoriasCard from "./components/cards/CategoriasCard";
import MarcasCard from "./components/cards/MarcasCard";
import CreditCard from "./components/cards/CreditCard";
import Promotions from "./components/cards/Promotions";
import PromotionsCarrousel from "./components/carrousel/PromotionsCarrousel";
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

import RegisterCard from "./components/cards/RegisterCard";
import EmojiExplosion from "./components/global/EmojiExplosion";

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
      <div className="max-w-7xl mx-auto">
        <div className="min-h-[calc(100vh-4rem)]" ref={home.heroRef}>
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

        <div className="w-full mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <CategoriasCard categories={categories} />

            <div className="w-full lg:w-3/5 h-full">
              <Carrousel products={home.productos} textTitle="Productos destacados" />
            </div>
          </div>
        </div>
      </div>

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
        <PromotionsCarrousel title="Promos destacados" />
      </div>

      <RegisterCard />

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
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-6">
            <CreditCard />
            <Promotions />
          </div>
        </div>
        <PromotionsCarrousel />
        <PromotionsCarrousel />
      </div>
      </div>
    </div>
  );
};

export default Home;
