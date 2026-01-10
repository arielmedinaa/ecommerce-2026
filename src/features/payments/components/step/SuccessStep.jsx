import React from 'react';
import { FaCheck } from 'react-icons/fa';

const SuccessStep = () => {
  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-scaleIn">
          <FaCheck size={40} className="text-white" />
        </div>
        <div className="absolute inset-0 w-20 h-20 bg-green-500 rounded-full animate-ping opacity-20"></div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
        ¡Pago Confirmado!
      </h3>
      <p className="text-gray-600 text-center mb-6">
        Tu pedido ha sido procesado exitosamente
      </p>
      <div className="bg-gray-50 rounded-lg p-4 w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Orden #</span>
          <span className="font-semibold">ORD-2024-001</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Estado</span>
          <span className="text-green-500 font-semibold">Completado</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessStep;
