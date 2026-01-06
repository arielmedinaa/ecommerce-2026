import React, { useState } from 'react';
import CentralShopLogo from '@assets/images/logo/centralShopLogo.webp';
import { 
  FaShoppingBag, 
  FaStore, 
  FaUsers, 
  FaBriefcase, 
  FaFileAlt, 
  FaChevronLeft, 
  FaChevronRight, 
  FaStar,
  FaPlus
} from 'react-icons/fa';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const categories = [
        { name: 'Carnes y Pescados', icon: <FaShoppingBag size={20} /> },
        { name: 'Frutas y Verduras', icon: <FaStore size={20} /> },
        { name: 'Lácteos y Huevos', icon: <FaUsers size={20} /> },
        { name: 'Panadería y Repostería', icon: <FaBriefcase size={20} /> },
        { name: 'Bebidas', icon: <FaFileAlt size={20} /> }
    ];

    const partners = [
        'Supermercado Central',
        'Tienda del Barrio',
        'Almacén Don Juan',
        'Verdulería Fresca',
        'Carnicería Selecta'
    ];

    return (
        <div className={`${isCollapsed ? 'w-20' : 'w-64'} flex flex-col bg-orange-100 h-screen p-4 transition-all duration-300 relative`}>
            {/* <div className="shrink-0 flex items-center justify-center">
                <img 
                    src={CentralShopLogo} 
                    alt="Central Shop" 
                    className={`${isCollapsed ? 'w-12' : 'w-40'} mt-2 transition-all duration-300`} 
                />
            </div>
            
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10"
                aria-label={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
            >
                {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
            <div className="mb-6 mt-6 font-poppins">
                {!isCollapsed && (
                    <h3 className="text-lg font-semibold text-orange-500 uppercase tracking-wider mb-4 px-2">
                        Categorías
                    </h3>
                )}
                <div className="space-y-3">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'px-3 py-2'} text-gray-700 rounded-lg hover:bg-orange-200 cursor-pointer transition-colors group relative`}
                            title={isCollapsed ? category.name : ''}
                        >
                            <div className="flex items-center">
                                {category.icon}
                                {!isCollapsed && (
                                    <span className="ml-3 whitespace-nowrap">
                                        {category.name}
                                    </span>
                                )}
                            </div>
                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                                    {category.name}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-orange-500 uppercase tracking-wider mb-3 px-2 font-poppins">
                    Partners
                </h3>
                <ul className="space-y-2">
                    {partners.map((partner, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-2xl hover:bg-orange-50 transition-colors"
                            >
                                <FaStar size={16} className="mr-2 text-yellow-500" />
                                {partner}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto">
                <a
                    href="#"
                    className="flex items-center px-3 py-3 text-sm font-medium text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
                >
                    <FaPlus size={16} className="mr-2" />
                    Crea tu Negocio
                </a>
            </div> */}
        </div>
    );
};

export default Sidebar;