import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiCheck } from 'react-icons/fi';
import useProductStore from '@core/shared/stores/product.store';

const ProductCard = () => {
  const productStore = useProductStore((state) => state.product);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const galleryRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });

  const product = {
    name: productStore?.nombre,
    price: productStore?.precio,
    oldPrice: productStore?.precio,
    rating: 4.8,
    reviews: 124,
    description: productStore?.descripcion.slice(0, 100),
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'
  };

  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Imagen del producto */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg"
            >
              <FiHeart 
                className={`w-6 h-6 ${isFavorite ? 'fill-orange-500 text-orange-500' : 'text-gray-600'}`}
              />
            </motion.button>
          </motion.div>

          {/* Información del producto */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <FiStar className="w-5 h-5 fill-orange-500 text-orange-500" />
                    <span className="font-semibold text-gray-800">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">({product.reviews} reseñas)</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Precio */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-bold text-orange-500">${product.price}</span>
                <span className="text-2xl text-gray-400 line-through">${product.oldPrice}</span>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              </div>

              {/* Tallas */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Talla</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Cantidad */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Cantidad</h3>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-semibold text-gray-700"
                  >
                    -
                  </motion.button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-semibold text-gray-700"
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <FiShoppingCart className="w-5 h-5" />
                Agregar al carrito
              </motion.button>

              {/* Beneficios */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                    <FiTruck className="w-6 h-6 text-orange-500" />
                  </div>
                  <span className="text-xs text-gray-600">Envío gratis</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                    <FiShield className="w-6 h-6 text-orange-500" />
                  </div>
                  <span className="text-xs text-gray-600">Garantía 2 años</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                    <FiCheck className="w-6 h-6 text-orange-500" />
                  </div>
                  <span className="text-xs text-gray-600">Calidad premium</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Galería de imágenes con efecto parallax */}
      <div ref={galleryRef} className="max-w-6xl mx-auto mt-16 mb-16 space-y-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Explora cada detalle</h2>
          <p className="text-gray-600 text-lg">Diseñado para impresionar desde cualquier ángulo</p>
        </motion.div>

        {/* Bloque superior - 2 imágenes */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], [0, -30])
            }}
            className="relative h-96 rounded-3xl overflow-hidden bg-gray-100 shadow-xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" 
              alt="Vista frontal" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold">Vista frontal</p>
                <p className="text-sm">Diseño contemporáneo</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], [0, -50])
            }}
            className="relative h-96 rounded-3xl overflow-hidden bg-orange-50 shadow-xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80" 
              alt="Vista de detalle" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-orange-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold">Detalles premium</p>
                <p className="text-sm">Acabados de calidad</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bloque medio - 1 imagen grande */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            y: useTransform(scrollYProgress, [0.2, 0.7], [0, -40])
          }}
          className="relative h-[500px] rounded-3xl overflow-hidden bg-gray-100 shadow-xl group"
        >
          <img 
            src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80" 
            alt="Vista completa" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-8 left-8 text-white max-w-xl">
              <p className="text-3xl font-bold mb-2">Experiencia visual completa</p>
              <p className="text-lg">Cada ángulo cuenta una historia de diseño y artesanía</p>
            </div>
          </div>
        </motion.div>

        {/* Bloque inferior - 3 imágenes */}
        <div className="grid grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              y: useTransform(scrollYProgress, [0.4, 1], [0, -25])
            }}
            className="relative h-72 rounded-3xl overflow-hidden bg-orange-50 shadow-xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80" 
              alt="Color 1" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-orange-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-xl font-bold">Naranja vibrante</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              y: useTransform(scrollYProgress, [0.4, 1], [0, -35])
            }}
            className="relative h-72 rounded-3xl overflow-hidden bg-gray-100 shadow-xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80" 
              alt="Color 2" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-xl font-bold">Negro elegante</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              y: useTransform(scrollYProgress, [0.4, 1], [0, -45])
            }}
            className="relative h-72 rounded-3xl overflow-hidden bg-blue-50 shadow-xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&q=80" 
              alt="Color 3" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-xl font-bold">Azul clásico</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Características detalladas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-6xl mx-auto mt-8 bg-linear-to-br from-orange-500 to-orange-600 rounded-3xl shadow-xl overflow-hidden p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-6">Características premium</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <FiCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Algodón Orgánico</h3>
            <p className="text-white/90">Material sostenible y respetuoso con el medio ambiente. Certificado GOTS.</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <FiShield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Durabilidad garantizada</h3>
            <p className="text-white/90">Resistente a más de 100 lavados sin perder forma ni color.</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <FiStar className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diseño exclusivo</h3>
            <p className="text-white/90">Creado por diseñadores internacionales. Edición limitada.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Descripción detallada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto mt-8 bg-white rounded-3xl shadow-xl overflow-hidden p-8"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sobre este producto</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {productStore.descripcion}
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Especificaciones</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Material</span>
                <span className="font-semibold text-gray-900">100% Algodón Orgánico</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Peso</span>
                <span className="font-semibold text-gray-900">180 g/m²</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Origen</span>
                <span className="font-semibold text-gray-900">Fabricado en Europa</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Cuidado</span>
                <span className="font-semibold text-gray-900">Lavar a 30°C</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Certificaciones</span>
                <span className="font-semibold text-gray-900">GOTS, Fair Trade</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Comparación de precios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl mx-auto mt-8 bg-white rounded-3xl shadow-xl overflow-hidden p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Compara y elige la mejor opción</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Producto básico */}
          <motion.div
            whileHover={{ y: -10 }}
            className="border-2 border-gray-200 rounded-2xl p-6 transition-all"
          >
            <div className="text-center mb-4">
              <div className="inline-block bg-gray-100 px-4 py-1 rounded-full text-sm font-semibold text-gray-600 mb-2">
                BÁSICO
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Camiseta Estándar</h3>
              <div className="text-3xl font-bold text-gray-900">$49.99</div>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-gray-600">
                <FiCheck className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <span>Algodón convencional</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <FiCheck className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <span>Garantía 6 meses</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <FiCheck className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <span>Diseño básico</span>
              </li>
            </ul>
            <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              Ver producto
            </button>
          </motion.div>

          {/* Producto premium (destacado) */}
          <motion.div
            whileHover={{ y: -10 }}
            className="border-4 border-orange-500 rounded-2xl p-6 relative shadow-xl"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-1 rounded-full text-sm font-bold">
              MÁS POPULAR
            </div>
            <div className="text-center mb-4 mt-2">
              <div className="inline-block bg-orange-100 px-4 py-1 rounded-full text-sm font-semibold text-orange-600 mb-2">
                PREMIUM
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Camiseta Premium</h3>
              <div className="text-3xl font-bold text-orange-500">$89.99</div>
              <div className="text-sm text-gray-500 line-through">$129.99</div>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-gray-900">
                <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <span className="font-medium">100% Algodón orgánico</span>
              </li>
              <li className="flex items-start gap-2 text-gray-900">
                <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <span className="font-medium">Garantía 2 años</span>
              </li>
              <li className="flex items-start gap-2 text-gray-900">
                <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <span className="font-medium">Diseño exclusivo</span>
              </li>
              <li className="flex items-start gap-2 text-gray-900">
                <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <span className="font-medium">Envío gratis express</span>
              </li>
            </ul>
            <button className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors">
              Agregar al carrito
            </button>
          </motion.div>

          {/* Producto de lujo */}
          <motion.div
            whileHover={{ y: -10 }}
            className="border-2 border-gray-200 rounded-2xl p-6 transition-all"
          >
            <div className="text-center mb-4">
              <div className="inline-block bg-linear-to-r from-orange-400 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-2">
                LUXURY
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Camiseta Signature</h3>
              <div className="text-3xl font-bold text-gray-900">$159.99</div>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-gray-900">
                <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <span className="font-medium">Algodón egipcio premium</span>
              </li>
              <li className="flex items-start gap-2 text-gray-900">
                <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <span className="font-medium">Garantía de por vida</span>
              </li>
              <li className="flex items-start gap-2 text-gray-900">
                <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <span className="font-medium">Edición limitada</span>
              </li>
              <li className="flex items-start gap-2 text-gray-900">
                <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <span className="font-medium">Empaque de regalo premium</span>
              </li>
            </ul>
            <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
              Ver producto
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;