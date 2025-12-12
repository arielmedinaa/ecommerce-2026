import { localStorageService } from '@core/infrastructure/storage/storage.service';

const CART_KEY = 'ecommerce_cart';

export const cartStorage = {
  getCart() {
    return localStorageService.getItem(CART_KEY, { items: [], updatedAt: new Date().toISOString() });
  },

  addItem(product, quantity = 1) {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        ...product,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    cart.updatedAt = new Date().toISOString();
    localStorageService.setItem(CART_KEY, cart);
    return cart;
  },

  updateItemQuantity(productId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(productId);
    }

    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.id === productId);
    
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = quantity;
      cart.updatedAt = new Date().toISOString();
      localStorageService.setItem(CART_KEY, cart);
    }
    
    return cart;
  },

  removeItem(productId) {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== productId);
    cart.updatedAt = new Date().toISOString();
    localStorageService.setItem(CART_KEY, cart);
    return cart;
  },

  clearCart() {
    localStorageService.removeItem(CART_KEY);
    return { items: [], updatedAt: new Date().toISOString() };
  },

  getItemCount() {
    return this.getCart().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal() {
    return this.getCart().items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
};
