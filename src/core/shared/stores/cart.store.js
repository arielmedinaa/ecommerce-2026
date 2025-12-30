import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: async (product) => {
    // Generate a temporary ID for optimistic update
    const tempId = `${product.productId || product._id}-${Date.now()}`;
    
    // Optimistic update
    set((state) => ({
      items: [...state.items, { ...product, id: tempId, isOptimistic: true }]
    }));

    try {
      // Fire and forget - we don't await this
      const response = await fetch(`http://localhost:3100/api/cart?codigo=6`, {
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
      
      // Update the item with server response if needed
      set((state) => ({
        items: state.items.map(item => 
          item.id === tempId 
            ? { ...item, ...result, isOptimistic: false }
            : item
        )
      }));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Revert on error
      set((state) => ({
        items: state.items.filter(item => item.id !== tempId)
      }));
      
      // Optional: Show error to user
      // You might want to add a toast notification here
    }
  },
  
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== itemId)
    }));
  },
  
  clearCart: () => set({ items: [] }),
  
  // Optional: Get cart total
  getTotalItems: () => {
    return useCartStore.getState().items.length;
  },
  
  // Optional: Get cart total price
  getTotalPrice: () => {
    return useCartStore.getState().items.reduce(
      (total, item) => total + (item.price * (item.quantity || 1)), 
      0
    );
  }
}));

export default useCartStore;
