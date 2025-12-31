import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import useCartStore from '../../../../core/shared/stores/cart.store';

const CartSidebar = ({ isOpen, onClose }) => {
  const { updateQuantity, removeItem, getTotalPrice, getTotalItems, getCartContado } = useCartStore();
  const { contado: contadoItems = [] } = getCartContado();
  const items = contadoItems[0]?.articulos?.contado;
  const total = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-linear-to-b from-white to-gray-50 shadow-2xl z-50 flex flex-col"
          >
            <div className="relative p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Cerrar carrito"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-200 text-orange-500 rounded-lg">
                  <FiShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Mi Carrito</h2>
                  <p className="text-orange-500 text-sm">
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-gray-400"
                >
                  <FiShoppingBag className="w-20 h-20 mb-4" />
                  <p className="text-lg font-medium">Tu carrito está vacío</p>
                  <p className="text-sm mt-2">¡Agrega productos para comenzar!</p>
                </motion.div>
              ) : (
                <motion.ul
                  className="space-y-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {items.map((item, index) => (
                    <motion.li
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      layout
                      className="bg-white rounded-xl shadow-sm p-3 border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        {/* Image */}
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          {item.imagen ? (
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FiShoppingBag className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm mb-0.5">
                            {item.nombre}
                          </h3>
                          <p className="text-base font-bold text-gray-900">
                            ${(item.precio * item.cantidad).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-center gap-1 shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <FiPlus className="w-3.5 h-3.5 text-gray-700" />
                          </button>

                          <span className="text-sm font-semibold text-gray-900 w-7 text-center">
                            {item.cantidad}
                          </span>

                          <button
                            onClick={() => {
                              if (item.cantidad === 1) {
                                removeItem(item.id);
                              } else {
                                updateQuantity(item.id, item.cantidad - 1);
                              }
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <FiMinus className="w-3.5 h-3.5 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            {items.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="bg-white border-t border-gray-200 p-4 shadow-lg"
              >
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-orange-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/30"
                  onClick={() => {
                    console.log('Proceder al pago');
                  }}
                >
                  Proceder al pago
                </button>

                <button
                  onClick={onClose}
                  className="w-full mt-2 text-gray-600 py-2 text-sm font-medium hover:text-gray-900 transition-colors"
                >
                  Continuar comprando
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
