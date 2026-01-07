import React from 'react';
import { FaCheck } from 'react-icons/fa';

const CashPaymentForm = () => {
  return (
    <div className="space-y-6 mt-8 animate-slideDown">
      <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Información de Pago en Efectivo</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-1">
              Monto a Pagar
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 text-lg">Gs.</span>
              <input
                type="text"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-2xl focus:outline-none text-lg font-semibold"
                placeholder="270.000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-1">
              ¿Con cuánto vas a pagar?
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none">
              <option value="exact">Monto exacto</option>
              <option value="plus">Necesito vuelto</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-green-50 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Beneficios del Pago en Efectivo</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
              <FaCheck size={20} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">Sin comisiones adicionales</p>
              <p className="text-xs text-gray-500">Paga el precio exacto sin recargos</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
              <FaCheck size={20} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">Pago inmediato</p>
              <p className="text-xs text-gray-500">Recibe tu producto al instante</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashPaymentForm;
