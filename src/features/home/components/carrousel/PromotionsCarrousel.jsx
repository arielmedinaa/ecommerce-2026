import React, { useState, useCallback, useEffect } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { formatGuarani } from "@core/shared/utils/formatDecimal";
import usePromotionsStore from "@core/shared/stores/promotions.store";
import {
  removeBackgroundImage,
  blobToDataURL,
} from "@core/shared/utils/imageUtils";
import CarrouselSkeleton from "./CarrouselSkeleton";
import CentralShopLogo from "@assets/images/logo/centralShopLogo.webp";
import BaseCarousel from "@core/ui/components/carrousel/BaseCarousel";

const PromotionsCarrousel = ({ title }) => {
  const [processedImages, setProcessedImages] = useState({});
  const [processing, setProcessing] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const { promotions: products, isLoading } = usePromotionsStore();

  useEffect(() => {
    const processImages = async () => {
      if (!products?.length) return;
      for (const product of products) {
        const imageUrl = `https://csdigitalizacion.nyc3.cdn.digitaloceanspaces.com/ecommerce/store/${product.imagenes?.[0]?.url?.["1000"]}`;
        const cacheKey = `${product.codigo}-${product.imagenes?.[0]?.url?.["1000"]}`;

        if (processedImages[cacheKey] || processing[cacheKey]) continue;

        try {
          setProcessing((prev) => ({ ...prev, [cacheKey]: true }));
          const cachedImage = localStorage.getItem(`processed_${cacheKey}`);
          if (cachedImage) {
            setProcessedImages((prev) => ({
              ...prev,
              [cacheKey]: cachedImage,
            }));
            continue;
          }

          const blob = await removeBackgroundImage(imageUrl);
          const dataUrl = await blobToDataURL(blob);

          localStorage.setItem(`processed_${cacheKey}`, dataUrl);

          setProcessedImages((prev) => ({
            ...prev,
            [cacheKey]: dataUrl,
          }));
        } catch (error) {
          setProcessedImages((prev) => ({
            ...prev,
            [cacheKey]: imageUrl,
          }));
        } finally {
          setProcessing((prev) => ({ ...prev, [cacheKey]: false }));
        }
      }
    };

    processImages();
  }, [products]);

  const toggleSize = useCallback((productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: prev[productId] === size ? null : size,
    }));
  }, []);

  const renderProductItem = (product, index) => (
    <div
      key={product.codigo}
      className="shrink-0 w-72 bg-orange-50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col h-[460px]"
    >
      <div className="p-3">
        <div className="relative h-48 bg-orange-50 overflow-hidden rounded-2xl flex items-center justify-center">
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10 transition-colors">
            <FiHeart className="w-5 h-5 text-gray-600" />
          </button>

          <div className="w-full h-full p-3 flex items-center justify-center bg-orange-200">
            <img
              src={
                processedImages[
                  `${product.codigo}-${product.imagenes?.[0]?.url?.["1000"]}`
                ] ||
                `https://csdigitalizacion.nyc3.cdn.digitaloceanspaces.com/ecommerce/store/${product.imagenes?.[0]?.url?.["1000"]}`
              }
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
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 font-poppins">
            {product.nombre}
          </h3>

          <div className="flex flex-wrap gap-2 max-h-20 overflow-hidden">
            {product.sizes?.length > 0 ? (
              product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(product.codigo, size)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    selectedSizes[product.codigo] === size
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                Sin tamaños disponibles
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">{product.nombre}</p>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-800 pr-4">
              G$ {formatGuarani(product.precio)}
            </span>
            <button className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
              <FiShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <BaseCarousel
      title={title}
      items={products}
      isLoading={isLoading}
      renderItem={renderProductItem}
      renderSkeleton={(index) => <CarrouselSkeleton key={index} />}
      className="mt-10"
      carouselId="promotions-carousel"
    />
  );
};

export default PromotionsCarrousel;
