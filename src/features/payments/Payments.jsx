import React, { useState } from "react";
import CarrouselProductos from "../home/components/carrousel/CarrouselProductos";
import CardInfoPayment from "./components/cards/CardInfoPayment";
import { MOCK_CARROUSEL_PRODUCTS } from "./mockCarrouselProducts";
import { FaCheck } from "react-icons/fa";

const MOCK_CART = [
  { codigo: 'P1', nombre: 'Auriculares de prueba', cantidad: 2, precio: 45000 },
  { codigo: 'P2', nombre: 'Auriculares de prueba', cantidad: 2, precio: 45000 },
  { codigo: 'P3', nombre: 'Auriculares de prueba', cantidad: 2, precio: 45000 }
];

const Stepper = ({ step }) => (
  <div className="flex items-center justify-between mb-8 font-poppins">
    <div className="flex items-center gap-2 md:gap-3">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-400 bg-opacity-30 flex items-center justify-center">
        <FaCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </div>
      <span className="text-xs md:text-sm text-white opacity-90">Información</span>
    </div>

    <div className="flex-1 h-0.5 bg-white bg-opacity-30 mx-2 md:mx-4"></div>

    <div className="flex items-center gap-2 md:gap-3">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
        <span className="text-white text-lg md:text-xl font-semibold">2</span>
      </div>
      <span className="text-xs md:text-sm text-white font-semibold">Pagos</span>
    </div>

    <div className="flex-1 h-0.5 bg-white bg-opacity-30 mx-2 md:mx-4"></div>

    <div className="flex items-center gap-2 md:gap-3">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white border-opacity-50 flex items-center justify-center">
        <span className="text-white text-lg md:text-xl font-semibold opacity-70">3</span>
      </div>
    </div>
  </div>
);

const ProductList = ({ products }) => {
  const subtotal = products.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  
  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <h2 className="text-xl md:text-2xl font-bold mb-4 font-poppins">Mi Carrito</h2>
      
      <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto">
        {products.map((item, i) => (
          <div key={item.codigo + i} className="flex items-center gap-2 md:gap-3 bg-[#f6f6f6] rounded-xl p-2 md:p-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gray-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm md:text-base font-poppins truncate">{item.nombre}</div>
              <div className="font-bold text-base md:text-lg font-poppins">{item.precio.toLocaleString()} Gs</div>
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <button className="w-6 h-6 flex items-center justify-center rounded bg-[#f1f1f1] text-base md:text-lg">+</button>
              <span className="text-xs md:text-sm font-semibold">{item.cantidad}</span>
              <button className="w-6 h-6 flex items-center justify-center rounded bg-[#f1f1f1] text-base md:text-lg">-</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <div className="font-semibold text-xs md:text-sm rounded-xl border border-gray-100 p-2 md:p-3 font-poppins shadow-sm">
          Solicitudes Pendientes 
          <button className="ml-2 text-xs bg-[#FFB072] text-white rounded-full px-2 py-0.5">Pagar 4</button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {["15% Off", "15% Off", "15% Off"].map((txt, i) => (
            <span key={i} className="bg-[#e6f5e6] text-[#51c151] text-xs px-2 py-0.5 rounded-full">{txt}</span>
          ))}
        </div>
        
        <div className="flex flex-col justify-center border border-gray-100 p-3 md:p-4 rounded-xl shadow-sm font-poppins">
          <div className="text-xs md:text-sm text-gray-700 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>G$ {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Descuentos</span><span>G$ 0</span></div>
            <div className="flex justify-between"><span>Creditos</span><span>G$ 0</span></div>
          </div>
          <div className="flex justify-between items-center mt-3 md:mt-4 pt-3 text-lg md:text-xl border-t border-gray-300">
            <span className="font-bold">Total:</span>
            <span className="font-semibold">G$ {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Comments = () => (
  <div className="w-full py-8">
    <h3 className="text-xl md:text-2xl font-bold text-center mb-6 font-poppins">Comentarios de clientes</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
            <span className="font-semibold text-sm flex-1">User {i}</span>
            <span className="text-xs text-[#FFB072] font-semibold">Cliente destacado</span>
          </div>
          <div className="text-xs md:text-sm text-gray-600 mb-2">"Muy buen producto, recomendado al 100% para ustedes"</div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, j) => (
              <span key={j} className="text-yellow-400 text-base md:text-lg">★</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Payments = () => {
  return (
    <div className="min-h-screen bg-orange-100">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="lg:col-span-2">
            <CardInfoPayment />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl h-full">
              <ProductList products={MOCK_CART} />
            </div>
          </div>
        </div>

        <div className="mb-8 md:mb-12">
          <CarrouselProductos products={MOCK_CARROUSEL_PRODUCTS} />
        </div>
        <Comments />
      </div>
    </div>
  );
};

export default Payments;