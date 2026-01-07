import React from 'react';

const TransferPaymentForm = () => {
  return (
    <div className="space-y-6 mt-8 animate-slideDown">
      <div className="bg-gray-50 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Datos para Transferencia</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-1">
              Banco
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none"
            >
              <option value="">Selecciona tu banco</option>
              <option value="bcp">Banco Continental</option>
              <option value="bna">Banco Nacional</option>
              <option value="bip">Banco Itapúa</option>
              <option value="bas">Banco Atlas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-1">
              Número de Cuenta
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none"
              placeholder="1234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-1">
              Nombre del Titular
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none"
              placeholder="Juan Pérez"
            />
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Información Importante</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mt-1">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">La transferencia puede tardar hasta 24 horas en procesarse</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mt-1">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">Guarda el comprobante de tu transferencia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferPaymentForm;
