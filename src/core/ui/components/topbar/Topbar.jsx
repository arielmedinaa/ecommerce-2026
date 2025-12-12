import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiUser, FiSearch, FiMenu } from 'react-icons/fi';
import { FaMapMarkerAlt } from "react-icons/fa";
import CentralShopLogo from '@assets/images/logo/centralshoplogo.d08fd0e3.webp';

const Topbar = ({ onMenuClick }) => {
  const [activeTab, setActiveTab] = useState('women');
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 mt-2">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiMenu className="w-6 h-6 text-gray-700" />
          </button>

          <div className="shrink-0 flex items-center justify-center">
            <img src={CentralShopLogo} alt="Central Shop" className="w-50 mt-2" />
          </div>

          <div className="hidden md:flex items-center space-x-2 bg-orange-200 rounded-full p-3 font-poppins">
            <FaMapMarkerAlt className="w-5 h-5 text-orange-800" />
            <h1 className="text-orange-800">Agrega tu direccion</h1>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8 font-poppins">
            <div className="relative w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for items, brands, inspiration..."
                className="w-full px-4 py-2 pl-4 pr-10 bg-orange-200 rounded-3xl focus:outline-none text-orange-800 border border-orange-300 text-sm"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-800 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiHeart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <div className="hidden sm:block text-sm font-medium text-gray-700 ml-2">
              UA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;