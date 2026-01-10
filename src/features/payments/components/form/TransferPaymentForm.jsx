import React from 'react';

const TransferPaymentForm = () => {
  return (
    <div className="space-y-3 mt-2 animate-slideDown">
      <div className="bg-gray-50 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Datos para Transferencia</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-orange-400 mb-1">
              Banco
            </label>
            <select
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
            >
              <option value="">Selecciona tu banco</option>
              <option value="bcp">Banco Continental</option>
              <option value="bna">Banco Nacional</option>
              <option value="bip">Banco Itapúa</option>
              <option value="bas">Banco Atlas</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-orange-400 mb-1">
              Número de Cuenta
            </label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
              placeholder="1234567890"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-orange-400 mb-1">
              Nombre del Titular
            </label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
              placeholder="Juan Pérez"
            />
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Información Importante</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-700">La transferencia puede tardar hasta 24 horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferPaymentForm;
