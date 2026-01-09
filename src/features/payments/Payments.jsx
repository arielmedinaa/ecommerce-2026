import React, { useState } from "react";
import { motion } from "framer-motion";
import Carrousel from "@core/ui/components/carrousel/Carrousel";
import CardInfoPayment from "./components/cards/CardInfoPayment";
import { MOCK_CARROUSEL_PRODUCTS } from "./mockCarrouselProducts";

const MOCK_CART = [
  { codigo: 'P1', nombre: 'Auriculares de prueba', cantidad: 2, precio: 45000 },
  { codigo: 'P2', nombre: 'Auriculares de prueba', cantidad: 2, precio: 45000 },
  { codigo: 'P3', nombre: 'Auriculares de prueba', cantidad: 2, precio: 45000 }
];

const ProductList = ({ products }) => {
  const subtotal = products.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  
  return (
    <motion.div 
      className="p-4 md:p-6 h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2 
        className="text-xl md:text-2xl font-bold mb-4 font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        Mi Carrito
      </motion.h2>
      
      <div className="space-y-2 md:space-y-3 flex-1 overflow-y-auto">
        {products.map((item, i) => (
          <motion.div
            key={item.codigo + i}
            className="flex items-center gap-1 md:gap-2 bg-white shadow-md rounded-xl p-1 md:p-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.2, 
              delay: 0.1 + i * 0.05
            }}
          >
            <motion.div 
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-200 shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            />
            <div className="flex-1 min-w-0">
              <motion.div 
                className="text-xs md:text-sm truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {item.nombre}
              </motion.div>
              <motion.div 
                className="font-bold text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
              >
                {item.precio.toLocaleString()} Gs
              </motion.div>
            </div>
            <motion.div 
              className="flex flex-col items-center gap-1 shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <motion.button 
                className="w-5 h-5 flex items-center justify-center rounded bg-[#f1f1f1] text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                +
              </motion.button>
              <span className="text-xs md:text-xs font-semibold">{item.cantidad}</span>
              <motion.button 
                className="w-5 h-5 flex items-center justify-center rounded bg-[#f1f1f1] text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                -
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-4 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="font-semibold text-xs md:text-sm rounded-xl border border-gray-100 p-2 md:p-3 font-poppins shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Solicitudes Pendientes 
          <motion.button 
            className="ml-2 text-xs bg-[#FFB072] text-white rounded-full px-2 py-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            Pagar 4
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {["15% Off", "15% Off", "15% Off"].map((txt, i) => (
            <motion.span 
              key={i} 
              className="bg-[#e6f5e6] text-[#51c151] text-xs px-2 py-0.5 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 + i * 0.02 }}
            >
              {txt}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex flex-col justify-center border border-gray-100 p-3 md:p-4 rounded-xl shadow-sm font-poppins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-xs md:text-sm text-gray-700 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>G$ {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Descuentos</span><span>G$ 0</span></div>
            <div className="flex justify-between"><span>Creditos</span><span>G$ 0</span></div>
          </div>
          <div className="flex justify-between items-center mt-3 md:mt-4 pt-3 text-lg md:text-xl border-t border-gray-300">
            <span className="font-bold">Total:</span>
            <span className="font-semibold">G$ {subtotal.toLocaleString()}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Comments = () => (
  <div className="w-full py-8">
    <h3 className="text-xl md:text-2xl font-bold text-center mb-6 font-poppins">Comentarios de clientes</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
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
    <div className="min-h-screen bg-orange-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
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
          <Carrousel products={MOCK_CARROUSEL_PRODUCTS} />
        </div>
        <Comments />
      </div>
    </div>
  );
};

export default Payments;