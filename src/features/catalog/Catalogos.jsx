import React from "react";
import CosmeticImage from "@assets/images/products/cosmetic.webp";
import Electrodomesticos from "@assets/images/products/electrodomestics.webp";
import BlackFriday from "@assets/icons/blackFriday1.webp";
import BlackFriday2 from "@assets/icons/blackFriday2.webp";
import BlackFriday3 from "@assets/icons/blackFriday3.webp";
import Carrousel from "@core/ui/components/carrousel/Carrousel";
import { MOCK_CARROUSEL_PRODUCTS } from "../payments/mockCarrouselProducts";

const Catalogos = () => {
  return (
    <>
      <div className="min-h-screen bg-orange-100 p-4 sm:p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="relative">
              <div
                id="cosmeticos-card"
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-400 to-orange-200 p-6 text-white h-full"
              >
                <div className="relative z-10">
                  <p className="text-sm opacity-90 mb-2">
                    categories / cosmeticos
                  </p>
                  <h3 className="text-2xl font-bold mb-3 font-poppins text-orange-400">
                    Productos Cosmeticos
                  </h3>
                  <p className="text-sm opacity-80 mb-4 line-clamp-3 font-poppins">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
                <div className="absolute right-4 bottom-4 w-32 h-auto">
                  <img
                    src={CosmeticImage}
                    alt="Productos Cosmeticos"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="absolute z-50 -bottom-5 left-1/4 -translate-x-1/2">
                <div className="flex items-center p-2 bg-orange-100 rounded-full">
                  <button className="bg-linear-to-br from-orange-400 to-orange-200 px-6 py-2 rounded-full hover:from-orange-500 hover:to-orange-700 transition-colors font-poppins text-white">
                    visualizar
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                id="cosmeticos-card"
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-500 to-blue-300 p-6 text-white h-full"
              >
                <div className="relative z-10">
                  <p className="text-sm opacity-90 mb-2">
                    categories / electrodomesticos
                  </p>
                  <h3 className="text-2xl font-bold mb-3 font-poppins text-blue-200">
                    Electrodomesticos
                  </h3>
                  <p className="text-sm opacity-80 mb-4 line-clamp-3 font-poppins">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
                <div className="absolute right-4 bottom-4 w-80 h-auto">
                  <img
                    src={Electrodomesticos}
                    alt="Productos Electrodomesticos"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="absolute z-50 -bottom-5 left-1/4 -translate-x-1/2">
                <div className="flex items-center p-2 bg-orange-100 rounded-full">
                  <button className="bg-linear-to-br from-blue-500 to-blue-300 px-6 py-2 rounded-full hover:from-orange-500 hover:to-orange-700 transition-colors font-poppins text-white">
                    visualizar
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                id="cosmeticos-card"
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-red-900 to-orange-400 p-6 text-white h-full"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3 font-poppins text-white">
                    BLACK FRIDAY
                  </h3>
                  <p className="text-sm opacity-80 mb-4 line-clamp-3 font-poppins">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
                {/* Megaphone icon in top-left */}

                {/* Shopping cart icon in bottom-right */}
              </div>
              <div className="absolute -top-20 -left-16 w-44 h-auto">
                <img
                  src={BlackFriday}
                  alt="Megaphone"
                  className="w-full h-full object-contain -rotate-12"
                />
              </div>

              <div
                className="absolute bottom-12 -right-2 w-12 h-auto"
                style={{
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <img
                  src={BlackFriday2}
                  alt="Shopping Cart"
                  className="w-full h-full object-contain rotate-12"
                />
              </div>

              <div className="absolute -bottom-10 -right-8 w-28 h-auto">
                <img
                  src={BlackFriday3}
                  alt="Shopping Cart"
                  className="w-full h-full object-contain"
                />
              </div>

              <div
                className="absolute bottom-7 right-5 w-12 h-auto z-30"
                style={{
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <img
                  src={BlackFriday2}
                  alt="Shopping Cart"
                  className="w-full h-full object-contain -rotate-45 drop-shadow-lg"
                />
              </div>

              <div className="absolute z-50 -bottom-5 left-1/4 -translate-x-1/2">
                <div className="flex items-center p-2 bg-orange-100 rounded-full">
                  <button className="bg-linear-to-br from-slate-900 via-red-900 to-orange-400 px-6 py-2 rounded-full hover:from-orange-500 hover:to-orange-700 transition-colors font-poppins text-white">
                    acceder
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 md:mb-12">
            <Carrousel products={MOCK_CARROUSEL_PRODUCTS} title={false} />

            <Carrousel products={MOCK_CARROUSEL_PRODUCTS} title={false} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
};

export default Catalogos;
