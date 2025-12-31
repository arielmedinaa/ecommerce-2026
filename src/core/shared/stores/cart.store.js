import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: {
    articulos: {
      contado: [],
      credito: []
    },
    atencion: 0,
    cliente: { razonsocial: '', documento: '', telefono: '' },
    codigo: null,
    estado: 1,
  },
  
  setCart: (newCart) => {
    if (newCart.articulos?.contado) {
      return set({ cart: newCart });
    }
    
    return set(state => {
      if (Array.isArray(newCart)) {
        return {
          ...state,
          cart: {
            ...state.cart,
            articulos: {
              ...state.cart.articulos,
              contado: newCart
            }
          }
        };
      }
      
      return {
        ...state,
        cart: {
          ...state.cart,
          ...newCart,
          articulos: {
            ...state.cart.articulos,
            ...(newCart.articulos || {})
          }
        }
      };
    });
  },

  addItem: async (product) => {
    const tempId = `${product.productId || product._id || product.codigo}-${Date.now()}`;
    
    set(state => ({
      cart: {
        ...state.cart,
        articulos: {
          ...state.cart.articulos,
          contado: [...state.cart.articulos.contado, { ...product, id: tempId, isOptimistic: true }]
        }
      }
    }));

    try {
      const response = await fetch('http://localhost:3100/api/cart?codigo=6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const result = await response.json();
      set(state => ({
        cart: {
          ...state.cart,
          articulos: {
            ...state.cart.articulos,
            contado: state.cart.articulos.contado.map(item => 
              item.id === tempId 
                ? { ...item, ...result, isOptimistic: false }
                : item
            )
          }
        }
      }));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      set(state => ({
        cart: {
          ...state.cart,
          articulos: {
            ...state.cart.articulos,
            contado: state.cart.articulos.contado.filter(item => item.id !== tempId)
          }
        }
      }));
    }
  },
  
  removeItem: (itemId) => {
    set(state => ({
      cart: {
        ...state.cart,
        articulos: {
          ...state.cart.articulos,
          contado: state.cart.articulos.contado.filter(item => item.id !== itemId)
        }
      }
    }));
  },
  
  clearCart: () => set({ 
    cart: {
      articulos: { contado: [], credito: [] },
      atencion: 0,
      cliente: { razonsocial: '', documento: '', telefono: '' },
      codigo: null,
      estado: 1
    }
  }),

  updateQuantity: (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    set(state => ({
      cart: {
        ...state.cart,
        articulos: {
          ...state.cart.articulos,
          contado: state.cart.articulos.contado.map(item => 
            item.id === itemId 
              ? { ...item, cantidad: newQuantity }
              : item
          )
        }
      }
    }));
  },

  getContadoCount: () => {
    const state = get();
    return state.cart.articulos?.contado?.reduce((total, item) => 
      total + (item.cantidad || 1), 0) || 0;
  },

  getCartContado: () => {
    const state = get();
    return state.cart.articulos || { contado: [], credito: [] };
  },

  getTotalPrice: () => {
    const state = get();
    return state.cart.articulos?.contado?.reduce(
      (sum, item) => sum + (item.precio || 0) * (item.cantidad || 1),
      0
    ) || 0;
  },
  
  getTotalItems: () => {
    const state = get();
    return state.cart.articulos?.contado?.reduce(
      (sum, item) => sum + (item.cantidad || 1),
      0
    ) || 0;
  }
}));

export default useCartStore;