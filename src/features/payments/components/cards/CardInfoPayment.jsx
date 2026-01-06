import React, { useState } from 'react'
import Stepper from '../steps/Stepper';

const CardInfoPayment = () => {
    const [selectedMethod, setSelectedMethod] = useState('debito');

    return (
        <div className="bg-orange-1 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl h-full">
            <Stepper step={1} />

            <h2 className="text-xl md:text-2xl text-color-orange-1 mb-4 md:mb-6 font-poppins">Detalles de Pagos</h2>

            <p className="text-color-orange-1 text-xs md:text-sm mb-2 md:mb-3 opacity-90 font-poppins">Selecciona el método de pago</p>
            <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
                <button
                    onClick={() => setSelectedMethod('pagopar')}
                    className={`flex-1 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all border-2 ${selectedMethod === 'pagopar'
                            ? 'bg-white text-orange-500 border-white'
                            : 'bg-transparent text-white border-white border-opacity-50'
                        }`}
                >
                    Pagopar
                </button>
                <button
                    onClick={() => setSelectedMethod('debito')}
                    className={`flex-1 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all border-2 relative ${selectedMethod === 'debito'
                            ? 'bg-white text-orange-500 border-white'
                            : 'bg-transparent text-white border-white border-opacity-50'
                        }`}
                >
                    Debito / Credito
                    {selectedMethod === 'debito' && (
                        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full"></div>
                    )}
                </button>
                <button
                    onClick={() => setSelectedMethod('efectivo')}
                    className={`flex-1 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all border-2 ${selectedMethod === 'efectivo'
                            ? 'bg-white text-orange-500 border-white'
                            : 'bg-transparent text-white border-white border-opacity-50'
                        }`}
                >
                    Efectivo
                </button>
            </div>

            <p className="text-color-orange-1 text-xs md:text-sm mb-2 md:mb-3 opacity-90 font-poppins">Informacion de tarjeta</p>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <input
                    type="text"
                    placeholder="****************96868768"
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-3xl bg-transparent border border-orange-200 border-opacity-50 text-orange-200 placeholder-orange-200 placeholder-opacity-70 focus:outline-none"
                />
                <div className="flex gap-2 md:gap-3">
                    <input
                        type="text"
                        placeholder="MM/YY"
                        className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-3xl bg-transparent border border-orange-200 border-opacity-50 text-orange-200 placeholder-orange-200 placeholder-opacity-70 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="CVC"
                        className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-3xl bg-transparent border border-orange-200 border-opacity-50 text-orange-200 placeholder-orange-200 placeholder-opacity-70 focus:outline-none"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 mb-4 md:mb-6 font-poppins">
                <p className="text-gray-800 text-xs md:text-sm leading-relaxed">
                    <span className="font-semibold">La informacion de su tarjeta esta resguardado por sucured billing</span>
                    <br />
                    <span className="text-orange-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </p>
            </div>

            <button className="w-28 py-3 md:py-4 rounded-full bg-transparent text-color-orange-1 font-bold font-poppins text-base md:text-lg hover:bg-opacity-90 transition-all border border-orange-200">
                Finalizar
            </button>
        </div>
    );
};

export default CardInfoPayment