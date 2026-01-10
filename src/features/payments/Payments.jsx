import React, { useState } from "react";
import Carrousel from "@core/ui/components/carrousel/Carrousel";
import CardInfoPayment from "./components/cards/CardInfoPayment";
import { MOCK_CARROUSEL_PRODUCTS } from "./mockCarrouselProducts";
import { ProductList } from "@components/ComponentesGlobales";

const Payments = () => {
  return (
    <div className="min-h-screen bg-orange-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="lg:col-span-2">
            <CardInfoPayment />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl h-[700px] flex flex-col">
              <ProductList />
            </div>
          </div>
        </div>

        <div className="mb-8 md:mb-12">
          <Carrousel products={MOCK_CARROUSEL_PRODUCTS} />
        </div>
      </div>
    </div>
  );
};

export default Payments;
