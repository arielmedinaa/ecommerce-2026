import React, { useEffect } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { useEnterNavigation } from '../../../core/shared/hooks/useEnterNavigation';

const CardPaymentForm = ({ formData, handleInputChange }) => {
  const { registerInput, handleKeyDown } = useEnterNavigation();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  return (
    <div className="space-y-6 mt-8 animate-slideDown">
      <div className="bg-gray-50 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Información de Tarjeta</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-1">
              Número de tarjeta
            </label>
            <input
              ref={registerInput(0)}
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-orange-400 mb-1">
                Vencimiento
              </label>
              <input
                ref={registerInput(1)}
                type="text"
                value={formData.expiry}
                onChange={(e) => handleInputChange("expiry", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none"
                placeholder="MM/AA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-400 mb-1">
                CVC
              </label>
              <input
                ref={registerInput(2)}
                type="text"
                value={formData.cvc}
                onChange={(e) => handleInputChange("cvc", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Información de Seguridad</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
              <FaCreditCard size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">Protección de Compra</p>
              <p className="text-xs text-gray-500">Tus transacciones están seguras con encriptación SSL</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
              <FaCreditCard size={20} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">Verificación 3D Secure</p>
              <p className="text-xs text-gray-500">Capa adicional de seguridad para tus compras</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;
