import { baseUrl } from "@/core/shared/constants/globalConst";

export const cartApi = {
  getCart: async (bodyFilter = {}) => {
    try {
      const response = await fetch(`${baseUrl}/cart/listar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyFilter),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  },

  addItem: async (productId, quantity = 1) => {
    try {
      const response = await fetch(`${baseUrl}/cart/agregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: Number(quantity)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  updateItemQuantity: async (itemId, quantity) => {
    try {
      const response = await fetch(`${baseUrl}/cart/actualizar/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: Number(quantity)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  removeItem: async (itemId) => {
    try {
      const response = await fetch(`${baseUrl}/cart/eliminar/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },


  clearCart: async () => {
    try {
      const response = await fetch(`${baseUrl}/cart/vaciar`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  applyDiscount: async (discountCode) => {
    try {
      const response = await fetch(`${baseUrl}/cart/aplicar-descuento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discountCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to apply discount');
      }

      return await response.json();
    } catch (error) {
      console.error('Error applying discount:', error);
      throw error;
    }
  },

  checkout: async (checkoutData) => {
    try {
      const response = await fetch(`${baseUrl}/cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  }
};