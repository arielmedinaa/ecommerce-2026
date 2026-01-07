import React from 'react';
import { FaCheck, FaUser, FaCreditCard } from 'react-icons/fa';

const Stepper = ({ currentStep }) => {
    const steps = [
        { id: 1, title: 'Datos', icon: FaUser },
        { id: 2, title: 'Pago', icon: FaCreditCard },
        { id: 3, title: 'Confirmado', icon: FaCheck }
    ];

    return (
        <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                    <div key={step.id} className="flex items-center">
                        <div className="relative">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isActive
                                        ? 'bg-orange-500 text-white scale-110'
                                        : isCompleted
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                }`}
                            >
                                <Icon size={20} />
                            </div>
                            {isActive && (
                                <div className="absolute inset-0 w-10 h-10 rounded-full bg-orange-500 animate-ping opacity-20"></div>
                            )}
                        </div>
                        <span
                            className={`ml-2 text-sm font-medium transition-all duration-300 ${
                                isActive ? 'text-orange-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
                            }`}
                        >
                            {step.title}
                        </span>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-12 h-0.5 mx-3 transition-all duration-300 ${
                                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;