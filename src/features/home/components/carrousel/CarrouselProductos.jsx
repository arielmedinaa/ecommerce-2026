import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart } from 'react-icons/fi';

const CarrouselProductos = ({ products = [] }) => {
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
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Anterior"
                >
                    <FiChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <div
                    id="product-carousel"
                    className="flex h-full overflow-x-auto scroll-smooth space-x-6 py-4 scrollbar-hide items-stretch"
                >
                    {products?.map((product) => (
                        <div
                            key={product._id}
                            className="shrink-0 w-72 bg-orange-50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-[460px]"
                        >
                            <div className='p-3'>
                                <div className="relative h-48 bg-orange-200 overflow-hidden rounded-2xl">
                                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10">
                                        <FiHeart className="w-5 h-5 text-gray-600" />
                                    </button>

                                    <div className="p-3">
                                        <img src={product.imagenes?.[0]?.url?.["1000"]} alt={product.nombre} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col grow p-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 font-poppins">{product.nombre}</h3>

                                    <div className="flex flex-wrap gap-2 max-h-20 overflow-hidden">
                                        {product?.sizes?.map((size) => (
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
                                        {product.descripcion?.toUpperCase()}
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-800">${product.precio}</span>
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
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Siguiente"
                >
                    <FiChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default CarrouselProductos;