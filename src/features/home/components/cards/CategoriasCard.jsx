import React from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

import AutomotorBackground from "@assets/images/categories/automotorCategory.jpg";

const CategoriasCard = ({ categories }) => {
  return (
    <>
      <div className="w-full lg:w-2/5">
        <div className="flex items-center justify-between mb-6 font-poppins">
          <h3 className="text-2xl font-bold ">Categorias destacadas</h3>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1"
          >
            Ver más <FiChevronDown className="-rotate-90" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {categories.slice(0, 1).map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group rounded-2xl p-6 cursor-pointer shadow-md hover:shadow-lg transition-all overflow-hidden h-64 bg-linear-to-br from-orange-300 to-orange-700 hover:from-orange-400 hover:to-orange-800"
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <img
                    src={AutomotorBackground}
                    alt={category.name}
                    className={`${category.color} w-full h-full object-cover`}
                  />
                </div>
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>
                <p className="text-white">Total de productos: 85</p>
              </div>
            </motion.div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            {categories.slice(1, 3).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                className={`relative group rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-all overflow-hidden h-48 ${category.color}`}
              >
                <div className="relative z-10 h-full flex">
                  <div className="flex flex-col items-start justify-end">
                    <h3 className="text-lg font-bold text-white mb-4">
                      {category.name}
                    </h3>
                    <p
                      className={`${category.descriptionColor} text-2xl font-bold`}
                    >
                      {category.description}
                    </p>
                    <p className="text-white">Total de productos: 85</p>
                    <button
                      className={`bg-white ${category.textColor} px-4 py-1 rounded-full hover:bg-orange-100 transition-colors mt-2 font-poppins`}
                    >
                      Ver más
                    </button>
                  </div>
                  <div className="flex-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="h-38 object-contain transition-transform duration-300 group-hover:scale-105 max-w-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriasCard;
