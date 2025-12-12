import CreditCardImg from '@assets/images/categories/centralShopTD.webp';
import CentralShopLogo from '@assets/images/logo/centralshoplogo.d08fd0e3.webp';

const CreditCard = () => {
  return (
    <div className="w-full bg-linear-to-r from-orange-500 to-orange-300 rounded-2xl overflow-hidden">
      <div className="relative text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6 p-8 md:p-6">
            <div className="flex items-center mb-10">
              <img
                src={CentralShopLogo}
                alt="Central Shop"
                className="w-40 md:w-48"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
              Tarjeta de Crédito <br />
              <span className="text-yellow-300">Central Shop</span>
            </h2>
            <p className="mb-6 opacity-90">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut unde nobis provident pariatur porro. Dolores ullam delectus, mollitia voluptas, perspiciatis laborum necessitatibus pariatur nemo facilis fugiat natus placeat accusantium facere.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-2 rounded-full font-semibold transition-colors flex items-center">
              Ver más
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src={CreditCardImg}
              alt="Tarjeta de Crédito Central Shop"
              className="text-end w-full max-w-none md:max-w-[400px] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;