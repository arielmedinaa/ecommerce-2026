import React, { useState, useCallback, useEffect } from "react";
import { FiHeart, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { formatGuarani } from "@core/shared/utils/formatDecimal";
import usePromotionsStore from "@core/shared/stores/promotions.store";
import {
  removeBackgroundImage,
  blobToDataURL,
} from "@core/shared/utils/imageUtils";
import CarrouselSkeleton from "./CarrouselSkeleton";
import CentralShopLogo from "@assets/images/logo/centralShopLogo.webp";
import BaseCarousel from "@core/ui/components/carrousel/BaseCarousel";
import { FaRegCreditCard } from "react-icons/fa";

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



  const renderProductItem = (product, index) => (
    <div
      key={product.codigo}
      className="shrink-0 w-72 bg-slate-50 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col h-[430px]"
    >
      <div className="p-3 relative">
        <div className="relative h-48 overflow-hidden rounded-2xl flex items-center justify-center">
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10 transition-colors">
            <FiHeart className="w-5 h-5 text-gray-600" />
          </button>

          <div className="w-full h-full p-3 flex items-center justify-center bg-orange-200 rounded-3xl">
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
        <div className="absolute bottom-2 right-1 bg-orange-1 text-white text-sm px-2 py-1 rounded-xl font-poppins z-20">
          <FaRegCreditCard className="inline-block mr-1" /> Tarjeta
        </div>
      </div>

      <div className="flex flex-col grow p-4">
        <div className="space-y-2">
          <p className="text-sm font-poppins text-gray-400 underline">Apple</p>
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 font-poppins">
            {product.nombre}
          </h3>
          <p className="text-gray-600 text-xs line-clamp-2 font-poppins">{product.nombre}</p>
        </div>

        <div className="mt-auto pt-4 font-poppins">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  G$ {formatGuarani(product.precio * 1.1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-800">
                  G$ {formatGuarani(product.precio)}
                </span>
              </div>
              <p className="text-sm text-orange-400">
                {formatGuarani(product.precio * 0.95)}gs con Tarjeta
              </p>
            </div>
            <div className="flex items-end gap-2">
              <button className="flex items-center justify-center gap-1 bg-orange-500 text-white px-3 py-2 rounded-full hover:bg-orange-600 transition-colors w-12">
                <FiShoppingCart className="w-4 h-auto" />
              </button>
            </div>
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
