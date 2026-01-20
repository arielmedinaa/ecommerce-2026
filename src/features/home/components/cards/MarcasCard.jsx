import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const MarcasCard = ({ marcas }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6 font-poppins">
          <h3 className="text-4xl font-bold ">Marcas destacadas</h3>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1"
          >
            Ver más <FiChevronDown className="-rotate-90" />
          </motion.button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div
              className="w-[9000px] h-60 blur-3xl rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(249, 116, 22, 0.89) 0%, rgba(251, 146, 60, 0.92) 50%, transparent 100%)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 font-poppins text-white relative z-10">
            {marcas.map((marca, index) => (
              <motion.div
                key={marca.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: hoveredIndex === null ? 1 : hoveredIndex === index ? 1.05 : 0.95,
                  filter: hoveredIndex === null ? "brightness(1)" : hoveredIndex === index ? "brightness(1.1)" : "brightness(0.8)"
                }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-2xl transition-all overflow-hidden h-[630px]"
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110">
                    <img
                      src={marca.img}
                      alt={marca.name}
                      className={`${marca.color} w-full h-full object-cover`}
                      style={{ clipPath: "inset(0)" }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="mt-auto">
                    <h4 className="text-white text-xl font-bold">
                      {marca.name}
                    </h4>
                    <div className="items-center p-0.5 bg-slate-100 w-[125px] rounded-full">
                      <button className="bg-linear-to-br from-slate-900 via-red-900 to-orange-400 px-6 py-1 rounded-full hover:from-orange-500 hover:to-orange-700 transition-colors font-poppins text-white">
                        ACCEDER
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MarcasCard;
