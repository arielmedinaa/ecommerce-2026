import React from "react";

const RegisterCard = () => {
  return (
    <div
      className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 py-6 sm:py-8 px-4 sm:px-6 lg:px-8
                  bg-linear-to-r from-orange-500 to-orange-300 rounded-2xl sm:rounded-3xl font-poppins"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-orange-200 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-orange-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div className="text-orange-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Regístrate Ahora
            </h2>
            <p className="text-xs sm:text-sm lg:text-base">
              y accede a ofertas exclusivas.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto">
          <input
            type="email"
            placeholder="Correo..."
            className="w-full sm:w-40 lg:w-48 p-2 sm:p-3 rounded-full bg-orange-50 text-orange-800 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          <input
            type="password"
            placeholder="Contraseña..."
            className="w-full sm:w-40 lg:w-48 p-2 sm:p-3 rounded-full bg-orange-50 text-orange-800 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-yellow-400 text-orange-800 font-bold text-sm sm:text-lg shadow-md hover:bg-yellow-300 transition-colors">
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
