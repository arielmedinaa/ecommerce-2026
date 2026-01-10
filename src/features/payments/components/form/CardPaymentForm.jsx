import React, { useEffect } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { useEnterNavigation } from '../../../../core/shared/hooks/useEnterNavigation';

const CardPaymentForm = ({ formData, handleInputChange }) => {
  const { registerInput, handleKeyDown } = useEnterNavigation();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  return (
    <div className="space-y-3 mt-2 animate-slideDown">
      <div className="bg-gray-50 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Información de Tarjeta</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-orange-400 mb-1">
              Número de tarjeta
            </label>
            <input
              ref={registerInput(0)}
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-orange-400 mb-1">
                Vencimiento
              </label>
              <input
                ref={registerInput(1)}
                type="text"
                value={formData.expiry}
                onChange={(e) => handleInputChange("expiry", e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
                placeholder="MM/AA"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-orange-400 mb-1">
                CVV
              </label>
              <input
                ref={registerInput(2)}
                type="text"
                value={formData.cvc}
                onChange={(e) => handleInputChange("cvc", e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Seguridad de tu Tarjeta</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-200 rounded flex items-center justify-center">
              <FaCreditCard size={12} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-700 font-medium">Conexión segura</p>
              <p className="text-xs text-gray-500">Encriptación SSL de 256 bits</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-200 rounded flex items-center justify-center">
              <FaCreditCard size={12} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-700 font-medium">Protección antifraude</p>
              <p className="text-xs text-gray-500">Verificación en tiempo real</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;
