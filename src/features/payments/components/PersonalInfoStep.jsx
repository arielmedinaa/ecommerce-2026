import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useEnterNavigation } from '../../../core/shared/hooks/useEnterNavigation';

const PersonalInfoStep = ({ formData, handleInputChange }) => {
  const { registerInput, handleKeyDown } = useEnterNavigation();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">
        Tus Datos Personales
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-orange-400 mb-1">
            Nombre
          </label>
          <input
            ref={registerInput(0)}
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-orange-400 mb-1">
            Apellido
          </label>
          <input
            ref={registerInput(1)}
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none"
            placeholder="Doe"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-orange-400 mb-1">
            Número de Teléfono
          </label>
          <input
            ref={registerInput(2)}
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none"
            placeholder="+595 981 123 456"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-orange-400 mb-1">
            Correo Electrónico
          </label>
          <input
            ref={registerInput(3)}
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none"
            placeholder="john.doe@example.com"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-orange-400 mb-1">
          ¿Utilizar Puntos?
        </label>
        <select
          ref={registerInput(4)}
          value={formData.healthFunds}
          onChange={(e) => handleInputChange("healthFunds", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none"
        >
          <option value="">Select a health fund</option>
          <option value="fund1">Health Fund A</option>
          <option value="fund2">Health Fund B</option>
          <option value="fund3">Health Fund C</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Datos de Envío</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-1">
              Dirección
            </label>
            <input
              ref={registerInput(5)}
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none"
              placeholder="123 Main St"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-orange-400 mb-1">
                Ciudad
              </label>
              <input
                ref={registerInput(6)}
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none"
                placeholder="Asunción"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-400 mb-1">
                Código Postal
              </label>
              <input
                ref={registerInput(7)}
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none"
                placeholder="0000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
