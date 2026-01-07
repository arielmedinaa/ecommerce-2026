import React from 'react';

const NavigationButtons = ({ currentStep, onPrev, onNext, isStepValid }) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrev}
        disabled={currentStep === 1}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
          currentStep === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Anterior
      </button>
      <button
        onClick={onNext}
        disabled={!isStepValid()}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
          isStepValid()
            ? "bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-105"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {currentStep === 2 ? "Confirmar" : "Siguiente"}
      </button>
    </div>
  );
};

export default NavigationButtons;
