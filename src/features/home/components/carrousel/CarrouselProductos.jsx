import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart } from 'react-icons/fi';

const products = [
    {
        id: 1,
        name: 'HydroSync Pro Water Bottle',
        price: 137.000,
        description: 'Stay hydrated with our premium water bottle designed for your active lifestyle.',
        image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        sizes: ['300 ml', '500 ml', '800 ml', '1 Litre'],
        category: 'Hogar',
    },
    {
        id: 2,
        name: 'Apple iPhone 17 256GB Branco 6,3" 48MP iOS 5G',
        price: 89.990,
        description: 'Keep your drinks hot or cold for hours with our insulated travel mug.',
        image: 'https://images.unsplash.com/photo-1602143407151-a6214b957fba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        sizes: ['350 ml', '500 ml', '750 ml'],
        category: 'Hogar',
    },
    {
        id: 3,
        name: 'Stainless Steel Bottle',
        price: 149.000,
        description: 'Durable and stylish stainless steel bottle for your daily hydration needs.',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        sizes: ['500 ml', '750 ml', '1 Litre'],
        category: 'Hogar',
    },
    {
        id: 4,
        name: 'Glass Water Bottle',
        price: 119.99,
        description: 'Pure taste with our BPA-free glass water bottle with silicone sleeve.',
        image: 'https://images.unsplash.com/photo-1603561597816-7c4c3c5d96cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        sizes: ['400 ml', '600 ml'],
        category: 'Hogar',
    },
    {
        id: 5,
        name: 'ThermoSport Insulated Bottle',
        price: 159.990,
        description: 'Perfect temperature retention for athletes and adventurers.',
        image: 'https://images.unsplash.com/photo-1595433707802-95c2c1a2f6d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        sizes: ['500 ml', '750 ml', '1 Litre'],
        category: 'Hogar',
    },
    {
        id: 6,
        name: 'AquaPure Filter Bottle',
        price: 179.990,
        description: 'Filtered water on the go with built-in purification system.',
        image: 'https://images.unsplash.com/photo-1526403228-28ad0b1e9b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        sizes: ['600 ml'],
        category: 'Hogar',
    },
    {
        id: 7,
        name: 'ChillMate Freezer Bottle',
        price: 99.990,
        description: 'Innovative freezer gel design to keep your beverages cool for hours.',
        image: 'https://images.unsplash.com/photo-1564306404026-2c40c0d76a5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        sizes: ['400 ml', '600 ml'],
        category: 'Hogar',
    },
    {
        id: 8,
        name: 'EcoGlass Premium Bottle',
        price: "129.990.340",
        description: 'Eco-friendly glass bottle with bamboo lid and protective sleeve.',
        image: 'https://images.unsplash.com/photo-1598511724791-1f52c814360a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        sizes: ['500 ml', '700 ml'],
        category: 'Hogar',
    }
];


const CarrouselProductos = () => {
    const [selectedSizes, setSelectedSizes] = useState({});

    const scrollLeft = () => {
        document.getElementById('product-carousel').scrollLeft -= 300;
    };

    const scrollRight = () => {
        document.getElementById('product-carousel').scrollLeft += 300;
    };

    const toggleSize = (productId, size) => {
        setSelectedSizes(prev => ({
            ...prev,
            [productId]: prev[productId] === size ? null : size
        }));
    };

    return (
        <div className="relative w-full h-full">
            <h2 className="text-2xl font-bold mb-2 font-poppins text-end text-orange-400">Productos destacados</h2>
            <div className="relative h-full">
                <button
                    onClick={scrollLeft}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Anterior"
                >
                    <FiChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <div
                    id="product-carousel"
                    className="flex h-full overflow-x-auto scroll-smooth space-x-6 py-4 scrollbar-hide items-stretch"
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="shrink-0 w-72 bg-orange-50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-[460px]"
                        >
                            <div className='p-3'>
                                <div className="relative h-48 bg-orange-200 overflow-hidden rounded-2xl">
                                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10">
                                        <FiHeart className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col grow p-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 font-poppins">{product.name}</h3>

                                    <div className="flex flex-wrap gap-2 max-h-20 overflow-hidden">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSize(product.id, size)}
                                                className={`px-3 py-1 text-sm rounded-full border ${selectedSizes[product.id] === size
                                                        ? 'bg-orange-500 text-white border-orange-500'
                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-orange-300'
                                                    } transition-colors`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Price and Add to Cart - Pushed to bottom */}
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                                        <button className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
                                            <FiShoppingCart className="w-5 h-5" />
                                            <span className="text-sm font-medium">Añadir</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Siguiente"
                >
                    <FiChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default CarrouselProductos;