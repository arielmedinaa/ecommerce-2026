import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiUser,
  FiSearch,
  FiMenu,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";

import useCartStore from "@core/shared/stores/cart.store";
import useProductStore from "@core/shared/stores/product.store";

import { getWithFilter } from "@core/infrastructure/api/api.general";
import { formatGuarani } from "@core/shared/utils/formatDecimal";
import { useNavigate } from "react-router";

const Topbar = ({ onMenuClick, onCartClick }) => {
  const cartCount = useCartStore((state) => state.getContadoCount());
  const setProduct = useProductStore((state) => state.setProduct);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const debounceTimeout = useRef(null);
  const debounceDelay = 550;

  const search = useCallback((e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.trim().length > 2) {
      setIsSearching(true);
      debounceTimeout.current = setTimeout(() => {
        apiSearch(value);
      }, debounceDelay);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, []);

  const apiSearch = async (query) => {
    try {
      const response = await getWithFilter("products/searchProducts", {
        search: query,
      });
      setSearchResults(response.data || []);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setSearchResults([]);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(scrollTop > 20);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header 
        className="w-full border-none"
      >
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-2 shadow-sm rounded-full bg-white"
        >
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiMenu className="w-6 h-6 text-gray-700" />
              </button>
              <div className="hidden md:flex items-center space-x-2 bg-slate-100 cursor-pointer rounded-full px-5 py-2.5 font-poppins transition-colors">
                <FaMapMarkerAlt className="w-5 h-5 text-orange-600" />
                <span className="text-base font-medium text-orange-700">
                  Agrega tu dirección
                </span>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 max-w-2xl mx-8 font-poppins">
              <div className="relative w-full" ref={searchRef}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={search}
                    onFocus={() =>
                      searchResults.length > 0 && setIsDropdownOpen(true)
                    }
                    placeholder="Buscar productos, marcas y más..."
                    className="w-full px-6 py-3 pl-6 pr-14 bg-slate-100 rounded-full focus:outline-none text-base text-orange-700 placeholder-orange-700"
                  />
                  {searchValue ? (
                    <button
                      onClick={clearSearch}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-orange-700 hover:text-orange-800 transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  ) : null}
                  {isSearching ? (
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-orange-700 w-6 h-6" />
                  )}
                </div>

                <AnimatePresence>
                  {isDropdownOpen && searchResults.length > 0 && (
                    <motion.div
                      className="absolute z-50 mt-2 w-full bg-linear-to-br from-orange-200 via-orange-100 to-orange-200 backdrop-blur-md rounded-2xl shadow-lg border border-orange-200 max-h-96 overflow-y-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="divide-y divide-orange-300">
                        {searchResults.slice(0, 5).map((product) => (
                          <div
                            key={product._id}
                            className="flex items-center p-3 hover:bg-orange-200 transition-colors cursor-pointer"
                            onClick={() => {
                              setProduct(product);
                              setIsDropdownOpen(false);
                              navigate(`/catalogo`);
                            }}
                          >
                            <div className="shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden p-1">
                              {product.imagenes?.[0]?.url?.["100"] && (
                                <img
                                  src={`https://csdigitalizacion.nyc3.cdn.digitaloceanspaces.com/ecommerce/store/${product.imagenes?.[0]?.url?.["1000"]}`}
                                  alt={product.nombre}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                {product.nombre}
                              </p>
                              <p className="text-sm text-orange-600 font-semibold">
                                {`Gs ${formatGuarani(product.precio)}`}
                              </p>
                            </div>
                          </div>
                        ))}
                        {searchResults.length > 5 && (
                          <div className="p-3 text-center text-sm text-orange-600 font-medium">
                            {searchResults.length - 5} más resultados
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Topbar;
