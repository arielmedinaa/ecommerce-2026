import { useState, useEffect } from 'react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import CarrouselSkeleton from '../../../../features/home/components/carrousel/CarrouselSkeleton';
import useCartStore from '@core/shared/stores/cart.store';
import { removeBackgroundImage, blobToDataURL } from '@core/shared/utils/imageUtils';
import { formatGuarani } from '@core/shared/utils/formatDecimal';
import usePromotionsStore from '@core/shared/stores/promotions.store';
import CentralShopLogo from '@assets/images/logo/centralShopLogo.webp';
import BaseCarousel from './BaseCarousel';

const prepareCartItem = (product, size) => ({
    codigo: product.codigo,
    nombre: product.nombre,
    precio: product.precio,
    imagen: product.imagenes?.[0]?.url?.["1000"],
    cantidad: 1,
    ruta: product.ruta
});

const saveCartItem = (item) => {
    const existingItem = JSON.parse(localStorage.getItem('pendingCartItem'));
    if (existingItem && existingItem.codigo === item.codigo) {
        return;
    }
    const cartItem = {
        ...item,
        status: 'pending'
    };
    localStorage.setItem('pendingCartItem', JSON.stringify(cartItem));
};

const removeCartItem = () => {
    localStorage.removeItem('pendingCartItem');
};

const Carrousel = ({ products = [], isLoading = false, textTitle = '' }) => {
    const cart = useCartStore((state) => state.cart);
    const [processedImages, setProcessedImages] = useState({});
    const [processing, setProcessing] = useState({});
    const { fetchPromotions } = usePromotionsStore();
    const [selectedSizes, setSelectedSizes] = useState({});

    useEffect(() => {
        const processImages = async () => {
            if (!products?.length) return;
            for (const product of products) {
                const imageUrl = `https://csdigitalizacion.nyc3.cdn.digitaloceanspaces.com/ecommerce/store/${product.imagenes?.[0]?.url?.["1000"]}`;
                const cacheKey = `${product.codigo}-${product.imagenes?.[0]?.url?.["1000"]}`;

                if (processedImages[cacheKey] || processing[cacheKey]) continue;

                try {
                    setProcessing(prev => ({ ...prev, [cacheKey]: true }));
                    const cachedImage = localStorage.getItem(`processed_${cacheKey}`);
                    if (cachedImage) {
                        setProcessedImages(prev => ({
                            ...prev,
                            [cacheKey]: cachedImage
                        }));
                        continue;
                    }

                    const blob = await removeBackgroundImage(imageUrl);
                    const dataUrl = await blobToDataURL(blob);

                    localStorage.setItem(`processed_${cacheKey}`, dataUrl);

                    setProcessedImages(prev => ({
                        ...prev,
                        [cacheKey]: dataUrl
                    }));
                } catch (error) {
                    console.error(`Error processing image for product ${product.codigo}:`, error);
                    setProcessedImages(prev => ({
                        ...prev,
                        [cacheKey]: imageUrl
                    }));
                } finally {
                    setProcessing(prev => ({ ...prev, [cacheKey]: false }));
                }
            }
        };

        processImages();
    }, [products]);

    const addToCart = useCartStore(state => state.addItem);

    const renderProductItem = (product, index) => (
        <div
            key={product.codigo}
            className="shrink-0 w-72 bg-slate-50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col h-[460px]"
        >
            <div className='p-3'>
                <div className="relative h-48 bg-slate-50 overflow-hidden rounded-2xl flex items-center justify-center">
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10 transition-colors">
                        <FiHeart className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="w-full h-full p-3 flex items-center justify-center bg-orange-200">
                        <img
                            src={processedImages[`${product.codigo}-${product.imagenes?.[0]?.url?.["1000"]}`] ||
                                `https://csdigitalizacion.nyc3.cdn.digitaloceanspaces.com/ecommerce/store/${product.imagenes?.[0]?.url?.["1000"]}`}
                            alt={product.nombre}
                            className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-300 transform hover:scale-105"
                            onError={(e) => {
                                if (e.target.src !== CentralShopLogo) {
                                    e.target.src = CentralShopLogo;
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col grow p-4">
                <div className="space-y-2">
                    <p className="text-[10px] font-poppins text-gray-400 underline">Apple</p>
                    <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 font-poppins">{product.nombre}</h3>

                    <p className="text-gray-600 text-sm line-clamp-2">
                        {product.descripcion?.toUpperCase()}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {product.caracteristicas?.slice(0, 2).map((c, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center text-xs font-medium border border-orange-500 px-2 py-1 rounded-full font-poppins text-orange-500"
                            >
                                {c.tipo}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-800">G$ {formatGuarani(product.precio)}</span>
                        <button className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
                            onMouseEnter={() => {
                                const selectedSize = selectedSizes[product.codigo];
                                const cartItem = prepareCartItem(product, selectedSize);
                                saveCartItem(cartItem);
                            }}
                            onMouseLeave={removeCartItem}
                            onClick={(e) => {
                                e.preventDefault();
                                const selectedSize = selectedSizes[product.codigo];
                                const cartItem = prepareCartItem(product, selectedSize);
                                addToCart(cartItem, cart);
                                removeCartItem();
                            }}
                        >
                            <FiShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <BaseCarousel
            title={textTitle}
            titleAlignment="end"
            items={products}
            isLoading={isLoading}
            renderItem={renderProductItem}
            renderSkeleton={(index) => <CarrouselSkeleton key={index} />}
            carouselId="main-product-carousel"
            carouselClass="flex h-full overflow-x-auto scroll-smooth space-x-6 py-4 pr-8 scrollbar-hide items-stretch"
            autoFetch={true}
            onIntersection={fetchPromotions}
        />
    );
};

export default Carrousel;