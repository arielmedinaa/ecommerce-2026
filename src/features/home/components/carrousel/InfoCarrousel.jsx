import BlackFriday from "@assets/icons/blackFriday1.webp";
import sudamerisCreditImage from "@assets/images/badges/badgeSudamerisCredit.webp";
import sudamerisBg from "@assets/images/backgrounds/sudamerisBg.webp";
import badgePH from "@assets/images/badges/badgePH.webp";

import { FaShippingFast } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const InfoCarrousel = () => {
  return (
    <>
      <div className="relative mt-10">
        <div className="absolute -left-5 top-1/2 -translate-y-1/2 z-50 cursor-pointer">
          <IoIosArrowBack className="text-gray-500/50 text-4xl" />
        </div>
        
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-50 cursor-pointer">
          <IoIosArrowForward className="text-gray-500/50 text-4xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
        <div className="relative">
          <div
            id="cosmeticos-card"
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-red-900 to-orange-400 p-6 text-white h-32"
          >
            <div className="relative z-10">
              <p className="font-bold font-poppins text-white">
                SUDAMERIS Promo <br /> <span>!HASTA 50% DE DESCUENTO¡</span>
              </p>
              <p className="text-[10px] opacity-80 mb-4 line-clamp-3 font-poppins">
                con la tarjeta de crédito de Sudameris Bank
              </p>
            </div>

            <img
              src={sudamerisBg}
              alt="Sudameris Background"
              className="absolute inset-0 w-full h-48 object-cover opacity-50"
            />
          </div>
          <div className="absolute -right-5 -top-5 w-28 h-auto z-50">
            <img
              src={sudamerisCreditImage}
              alt="Sudameris Credit"
              className="w-full h-12 object-contain -rotate-12"
            />
          </div>

          <div className="absolute z-50 -bottom-5 left-1/4 -translate-x-1/2">
            <div className="flex items-center p-0.5 bg-slate-100 rounded-full">
              <button className="bg-linear-to-br from-slate-900 via-red-900 to-orange-400 px-6 py-1 rounded-full hover:from-orange-500 hover:to-orange-700 transition-colors font-poppins text-white">
                SOLICITAR
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            id="cosmeticos-card"
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-red-900 to-orange-400 p-6 text-white h-32"
          >
            <div className="relative z-10">
              <h3 className="font-bold font-poppins text-white">
                BLACK FRIDAY
              </h3>
              <p className="text-[10px] opacity-80 mb-4 line-clamp-3 font-poppins">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
            {/* Megaphone icon in top-left */}

            {/* Shopping cart icon in bottom-right */}
          </div>
          <div className="absolute -right-5 -top-14 w-28 h-auto z-50">
            <img
              src={BlackFriday}
              alt="Black Friday"
              className="w-full h-32 object-contain -rotate-12"
            />
          </div>

          <div className="absolute z-50 -bottom-5 left-1/4 -translate-x-1/2">
            <div className="flex items-center p-0.5 bg-slate-100 rounded-full">
              <button className="bg-linear-to-br from-slate-900 via-red-900 to-orange-400 px-6 py-1 rounded-full hover:from-orange-500 hover:to-orange-700 transition-colors font-poppins text-white">
                VERIFICAR
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            id="cosmeticos-card"
            className="relative overflow-hidden rounded-3xl bg-orange-970 p-6 text-white h-32"
          >
            <div className="relative z-10">
              <h3 className="font-bold font-poppins text-white">
                CERTIFICADOS PH
              </h3>
              <p className="text-[10px] opacity-80 mb-4 line-clamp-3 font-poppins">
                Los productos que tengan certificados PH te facilitarán en
                obtener un préstamo a solo firma.
              </p>
            </div>
            <div className="absolute right-4 bottom-4 w-80 h-auto">
              {/* <img
                src={Electrodomesticos}
                alt="Productos Electrodomesticos"
                className="w-full h-32 object-contain"
              /> */}
            </div>
            <div className="absolute -right-5 top-2 w-28 h-auto z-50">
              <img
                src={badgePH}
                alt="Badge PH"
                className="w-full h-14 object-contain"
              />
            </div>
          </div>

          <div className="absolute z-50 -bottom-5 left-1/4 -translate-x-1/2">
            <div className="flex items-center p-0.5 bg-slate-100 rounded-full">
              <button className="bg-orange-970 px-6 py-1 rounded-full hover:from-orange-500 hover:to-orange-700 transition-colors font-poppins text-white">
                ACCEDER
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            id="cosmeticos-card"
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-1 to-orange-200 p-6 text-white h-32"
          >
            <div className="relative z-10">
              <h3 className="font-bold font-poppins text-white">
                CUOTAS SIN INTERES
              </h3>
              <p className="text-[10px] opacity-80 mb-4 line-clamp-3 font-poppins">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
            <div className="absolute right-4 bottom-4 w-80 h-auto">
              {/* <img
                src={Electrodomesticos}
                alt="Productos Electrodomesticos"
                className="w-full h-48 object-contain"
              /> */}
            </div>
          </div>

          <div className="absolute -right-1 -top-2 w-16 h-5 z-50 rounded-full bg-orange-300 items-center flex justify-center">
            <span className="text-white text-[10px] flex items-center gap-1">
              <FaShippingFast /> 24hs
            </span>
          </div>

          <div className="absolute z-50 -bottom-5 left-1/4 -translate-x-1/2">
            <div className="flex items-center p-0.5 bg-slate-100 rounded-full">
              <button className="bg-linear-to-br from-orange-1 to-orange-200 px-6 py-1 rounded-full hover:from-orange-1 hover:to-orange-200 transition-colors font-poppins text-white">
                ACCEDER
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default InfoCarrousel;
