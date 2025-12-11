import HeroCarousel from './components/hero/HeroCarrousel';
import CarrouselProductos from './components/carrousel/CarrouselProductos';

import Electrodomesticos from '../../assets/electrodomesticos.png';
import Automotor from '../../assets/motor3D.png';
import Televisor from '../../assets/tv3D.png';
import Celulares from '../../assets/phone3D.png';

import Apple from '../../assets/appleBackground.jpg';
import Samsung from '../../assets/samsungBackground.jpg';
import Bosch from '../../assets/boschBackground.jpg';
import Philips from '../../assets/philipsBackground.jpg';
import CategoriasCard from './components/cards/CategoriasCard';
import MarcasCard from './components/cards/MarcasCard';

const Home = () => {
  const categories = [
    { name: 'Automotor', img: Automotor, color: 'bg-orange-600' },
    { name: 'Electrodomésticos', img: Electrodomesticos, color: 'bg-orange-700' },
    { name: 'Televisores', img: Televisor, color: 'bg-orange-500' },
    { name: 'Celulares', img: Celulares, color: 'bg-orange-600' },
  ];

  const marcas = [
    { name: 'Apple', img: Apple, color: 'bg-orange-700' },
    { name: 'Samsung', img: Samsung, color: 'bg-orange-500' },
    { name: 'Bosch', img: Bosch, color: 'bg-orange-600' },
    { name: 'Philips', img: Philips, color: 'bg-orange-600' },
  ];

  const products = [
    { id: 1, name: 'Mint T-Shirt', price: '$29.99', image: '👕', color: 'bg-orange-50' },
    { id: 2, name: 'White Shirt', price: '$39.99', image: '👔', color: 'bg-amber-50' },
    { id: 3, name: 'Blue Hoodie', price: '$49.99', image: '🧥', color: 'bg-orange-100' },
    { id: 4, name: 'Yellow Set', price: '$59.99', image: '👗', color: 'bg-amber-100' },
  ];

  return (
    <div className="min-h-screen bg-orange-100 p-4 sm:p-6 lg:p-10">
      <div className="min-h-[calc(100vh-4rem)]">
        <HeroCarousel />
        <div className="w-full">
          <CategoriasCard categories={categories} />
          <CarrouselProductos products={products} />
        </div>
      </div>
      <div className="w-full">
        <MarcasCard marcas={marcas} />
      </div>
    </div>
  );
};

export default Home;