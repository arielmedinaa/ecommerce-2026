import { create } from "zustand";
import { persist } from "zustand/middleware";

function getContado(state) {
  return state.cart.articulos.contado;
}

function setContado(state, newContado) {
  return {
    ...state.cart,
    articulos: {
      ...state.cart.articulos,
      contado: newContado,
    },
  };
}

const useCartStore = create(
  persist(
    (set, get) => ({
  cart: {
    articulos: {
      contado: [],
      credito: [],
    },
    atencion: 0,
    cliente: { razonsocial: "", documento: "", telefono: "" },
    codigo: null,
    estado: 1,
  },

  setCart: (newCart) => {
    if (newCart.articulos?.contado) {
      return set({ cart: newCart });
    }

    return set((state) => {
      if (Array.isArray(newCart)) {
        return {
          ...state,
          cart: {
            ...state.cart,
            articulos: {
              ...state.cart.articulos,
              contado: newCart,
            },
          },
        };
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          ...newCart,
          articulos: {
            ...state.cart.articulos,
            ...(newCart.articulos || {}),
          },
        },
      };
    });
  },

  addItem: async (product) => {
    const state = get();
    const contado = getContado(state);
    const existingItem = contado.find((item) => item.codigo === product.codigo);

    if (existingItem) {
      const newQuantity = (existingItem.cantidad || 1) + (product.cantidad || 1);
      set((state) => ({
        cart: setContado(state, contado.map((item) =>
          item.codigo === product.codigo
            ? { ...item, cantidad: newQuantity }
            : item
        )),
      }));
    } else {
      const tempId = `${product.codigo}-${Date.now()}`;
      set((state) => ({
        cart: setContado(state, [
          ...contado,
          {
            ...product,
            id: tempId,
            cantidad: product.cantidad || 1,
            isOptimistic: true,
          },
        ]),
      }));
    }

    try {
      const response = await fetch(`https://1xzrqw4q-3100.brs.devtunnels.ms/api/cart?codigo=${state.cart.codigo}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const result = await response.json();
      set((state) => ({
        cart: setContado(state, getContado(state).map((item) =>
          item.codigo === product.codigo
            ? { ...item, ...result, isOptimistic: false }
            : item
        )),
      }));
    } catch (error) {
      set((state) => ({
        cart: setContado(state, getContado(state).filter(
          (item) => item.codigo !== product.codigo
        )),
      }));
    }
  },

  removeItem: (itemId) => {
    set((state) => ({
      cart: {
        ...state.cart,
        articulos: {
          ...state.cart.articulos,
          contado: state.cart.articulos.contado.filter(
            (item) => item.id !== itemId
          ),
        },
      },
    }));
  },

  clearCart: () =>
    set({
      cart: {
        articulos: { contado: [], credito: [] },
        atencion: 0,
        cliente: { razonsocial: "", documento: "", telefono: "" },
        codigo: null,
        estado: 1,
      },
    }),

  updateQuantity: async (itemId, newQuantity, product, carrito) => {
    if (newQuantity < 1) return;

    const state = get()
    set((state) => ({
      cart: {
        ...state.cart,
        articulos: {
          ...state.cart.articulos,
          contado: state.cart.articulos.contado.map((item) =>
            item.codigo === itemId ? { ...item, cantidad: newQuantity } : item
          ),
        },
      },
    }));

    try {
      const response = await fetch(`http://localhost:3100/api/cart?codigo=${state.cart.codigo}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const result = await response.json();
      set((state) => ({
        cart: setContado(state, getContado(state).map((item) =>
          item.codigo === product.codigo
            ? { ...item, ...result, isOptimistic: false }
            : item
        )),
      }));
    } catch (error) {
      set((state) => ({
        cart: setContado(state, getContado(state).filter(
          (item) => item.codigo !== product.codigo
        )),
      }));
    }
  },

  getContadoCount: () => {
    const state = get();
    return (
      state.cart.articulos?.contado?.reduce(
        (total, item) => total + (item.cantidad || 1),
        0
      ) || 0
    );
  },

  getCartContado: () => {
    const state = get();
    return state.cart.articulos || { contado: [], credito: [] };
  },

  getTotalPrice: () => {
    const state = get();
    return (
      state.cart.articulos?.contado?.reduce(
        (sum, item) => sum + (item.precio || 0) * (item.cantidad || 1),
        0
      ) || 0
    );
  },

  getTotalItems: () => {
    const state = get();
    return (
      state.cart.articulos?.contado?.reduce(
        (sum, item) => sum + (item.cantidad || 1),
        0
      ) || 0
    );
  },
}),
  {
    name: 'cart-storage',
  }
  )
);

export default useCartStore;
