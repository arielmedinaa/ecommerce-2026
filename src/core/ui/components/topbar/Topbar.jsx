import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiUser, FiSearch, FiMenu, FiShoppingCart } from 'react-icons/fi';
import { FaMapMarkerAlt } from "react-icons/fa";
import useCartStore from '../../../shared/stores/cart.store';

const Topbar = ({ onMenuClick, onCartClick }) => {
  const cartCount = useCartStore(state => state.getContadoCount());
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiMenu className="w-6 h-6 text-gray-700" />
            </button>
            <div className="hidden md:flex items-center space-x-2 bg-orange-200 hover:bg-orange-100 rounded-full px-5 py-2.5 font-poppins transition-colors border border-orange-100">
              <FaMapMarkerAlt className="w-5 h-5 text-orange-600" />
              <span className="text-base font-medium text-orange-700">Agrega tu dirección</span>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-2xl mx-8 font-poppins">
            <div className="relative w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar productos, marcas y más..."
                className="w-full px-6 py-3 pl-6 pr-14 bg-transparent border border-orange-700 rounded-full focus:outline-none text-base text-orange-700 placeholder-orange-700"
              />
              <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-orange-700 w-6 h-6" />
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 hover:bg-orange-200 rounded-full transition-colors relative"
              aria-label="Favoritos"
            >
              <FiHeart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 hover:bg-orange-200 rounded-full transition-colors relative"
              aria-label="Carrito de compras"
              onClick={onCartClick}
            >
              <FiShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>
            

            <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-orange-200 rounded-full text-base font-medium text-orange-700 ml-2">
              UA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;