import useCartStore from "@core/shared/stores/cart.store";
import { motion } from "framer-motion";
import { formatGuarani } from '@core/shared/utils/formatDecimal';

export const BannerComponent = () => (
  <div>
    <h1>Banner</h1>
  </div>
);

export const ProductList = () => {
  const cart = useCartStore((state) => state.cart);
  const products = cart?.articulos?.contado;
  const subtotal = products.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <motion.div
      className="p-4 md:p-6 h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2
        className="text-xl md:text-2xl font-bold mb-4 font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        Mi Carrito
      </motion.h2>

      <div className="space-y-2 md:space-y-3 flex-1 overflow-y-auto p-1">
        {products.map((item, i) => (
          <motion.div
            key={item.codigo + i}
            className="flex items-center gap-1 md:gap-2 bg-white shadow-sm rounded-xl p-1 md:p-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.1 + i * 0.05,
            }}
          >
            <motion.div
              className="w-16 h-16 md:w-12 md:h-12 rounded-lg bg-gray-200 shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <img
                src={`https://csdigitalizacion.nyc3.cdn.digitaloceanspaces.com/ecommerce/store/${item.imagen}`}
                alt={item.nombre}
                className="w-16 h-auto object-cover"
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.div
                className="text-xs md:text-sm truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {item.nombre}
              </motion.div>
              <motion.div
                className="font-bold text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
              >
                {item.precio.toLocaleString()} Gs
              </motion.div>
            </div>
            <motion.div
              className="flex flex-col items-center gap-1 shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <motion.button
                className="w-5 h-5 flex items-center justify-center rounded bg-[#f1f1f1] text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                +
              </motion.button>
              <span className="text-xs md:text-xs font-semibold">
                {item.cantidad}
              </span>
              <motion.button
                className="w-5 h-5 flex items-center justify-center rounded bg-[#f1f1f1] text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                -
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-4 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="font-semibold text-xs md:text-sm rounded-xl border border-gray-100 p-2 md:p-3 font-poppins shadow-sm flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Solicitudes Pendientes
          <motion.button
            className="ml-2 text-xs bg-[#FFB072] text-white rounded-full px-2 py-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            Pagar 4
          </motion.button>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {["15% Off", "15% Off", "15% Off"].map((txt, i) => (
            <motion.span
              key={i}
              className="bg-[#e6f5e6] text-[#51c151] text-xs px-2 py-0.5 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 + i * 0.02 }}
            >
              {txt}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col justify-center border border-gray-100 p-3 md:p-4 rounded-xl shadow-sm font-poppins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-xs md:text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>G$ {formatGuarani(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Descuentos</span>
              <span>G$ 0</span>
            </div>
            <div className="flex justify-between">
              <span>Creditos</span>
              <span>G$ 0</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 md:mt-4 pt-3 text-lg md:text-xl border-t border-gray-300">
            <span className="font-bold">Total:</span>
            <span className="font-semibold text-orange-600">
              G$ {formatGuarani(subtotal)}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
