import React from 'react';
import { FaCreditCard, FaShoppingBag } from 'react-icons/fa';

const PaymentMethodSelector = ({ formData, handleInputChange }) => {
  const paymentMethods = [
    {
      id: "card",
      name: "Tarjeta de Crédito/Débito",
      icon: FaCreditCard,
    },
    {
      id: "transfer",
      name: "Transferencia Bancaria",
      icon: FaShoppingBag,
    },
    { id: "cash", name: "Efectivo", icon: FaShoppingBag },
  ];

  return (
    <div>
      <label className="block text-xs font-medium text-orange-400 mb-2">
        Selecciona un método de pago
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => handleInputChange("paymentMethod", method.id)}
              className={`p-4 border rounded-xl flex flex-col items-center space-y-2 transition-all duration-200 ${
                formData.paymentMethod === method.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Icon
                size={24}
                className={
                  formData.paymentMethod === method.id
                    ? "text-orange-500"
                    : "text-gray-400"
                }
              />
              <span
                className={`text-xs text-center font-medium ${
                  formData.paymentMethod === method.id
                    ? "text-orange-500"
                    : "text-gray-700"
                }`}
              >
                {method.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
