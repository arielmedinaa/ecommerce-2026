import { create } from 'zustand';
import { getWithFilter } from '@core/infrastructure/api/api.general';

const usePromotionsStore = create((set) => ({
    promotions: [],
    isLoading: false,
    error: null,
    fetchPromotions: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getWithFilter('products/listar/promos', {
                limit: 10,
                offset: 0
            });
            set({ promotions: response, isLoading: false });
            return response;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    }
}));

export default usePromotionsStore;