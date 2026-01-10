import React from 'react';
import { FaCheck } from 'react-icons/fa';

const CashPaymentForm = () => {
  return (
    <div className="space-y-3 mt-2 animate-slideDown">
      <div className="bg-gray-50 rounded-lg p-3 shadow-sm border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Información de Pago en Efectivo</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-orange-400 mb-1">
              Monto a Pagar
            </label>
            <div className="relative">
              <span className="absolute left-2 top-2 text-gray-500 text-xs">Gs.</span>
              <input
                type="text"
                className="w-full px-2 py-1.5 pl-8 border border-gray-300 rounded focus:outline-none text-xs font-semibold"
                placeholder="270.000"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-orange-400 mb-1">
              ¿Con cuánto vas a pagar?
            </label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none text-xs">
              <option value="exact">Monto exacto</option>
              <option value="plus">Necesito vuelto</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-green-50 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Beneficios del Pago en Efectivo</h4>
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-200 rounded flex items-center justify-center">
              <FaCheck size={12} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-700 font-medium">Sin comisiones</p>
              <p className="text-xs text-gray-500">Precio exacto sin recargos</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-200 rounded flex items-center justify-center">
              <FaCheck size={12} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-700 font-medium">Pago inmediato</p>
              <p className="text-xs text-gray-500">Recibe al instante</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashPaymentForm;
