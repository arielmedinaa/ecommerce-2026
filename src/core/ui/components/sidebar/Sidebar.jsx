import React from 'react';
import CentralShopLogo from '@assets/images/logo/centralshoplogo.d08fd0e3.webp';
import { FaShoppingBag, FaStore, FaUsers, FaBriefcase, FaFileAlt, FaStar, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
    const categories = [
        { name: 'Carnes y Pescados', icon: <FaShoppingBag size={16} className="mr-2" /> },
        { name: 'Frutas y Verduras', icon: <FaStore size={16} className="mr-2" /> },
        { name: 'Lácteos y Huevos', icon: <FaUsers size={16} className="mr-2" /> },
        { name: 'Panadería y Repostería', icon: <FaBriefcase size={16} className="mr-2" /> },
        { name: 'Bebidas', icon: <FaFileAlt size={16} className="mr-2" /> }
    ];

    const partners = [
        'Supermercado Central',
        'Tienda del Barrio',
        'Almacén Don Juan',
        'Verdulería Fresca',
        'Carnicería Selecta'
    ];

    return (
        <div className="w-64 flex flex-col bg-orange-100 h-screen p-4">
            <div className="shrink-0 flex items-center">
                <img src={CentralShopLogo} alt="Central Shop" className="w-50 mt-2" />
            </div>
            <div className="mb-6 mt-4 font-poppins">
                <h3 className="text-xl font-semibold text-orange-500 uppercase tracking-wider mb-3 px-2">
                    Categorías
                </h3>
                <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-2xl hover:bg-orange-50 transition-colors"
                            >
                                {category.icon}
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
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
            </div>
        </div>
    );
};

export default Sidebar;