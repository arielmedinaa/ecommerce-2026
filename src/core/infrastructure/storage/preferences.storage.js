import { localStorageService } from '@core/infrastructure/storage/storage.service';

const PREFERENCES_KEY = 'ecommerce_preferences';

// Valores por defecto
const DEFAULT_PREFERENCES = {
  theme: 'light',
  language: 'es',
  currency: 'USD',
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  recentlyViewed: []
};

export const preferencesStorage = {
  // Obtener todas las preferencias
  getPreferences() {
    return {
      ...DEFAULT_PREFERENCES,
      ...localStorageService.getItem(PREFERENCES_KEY, {})
    };
  },

  // Actualizar preferencias
  updatePreferences(updates) {
    const current = this.getPreferences();
    const updated = { ...current, ...updates };
    localStorageService.setItem(PREFERENCES_KEY, updated);
    return updated;
  },

  // Tema
  getTheme() {
    return this.getPreferences().theme;
  },
  
  setTheme(theme) {
    return this.updatePreferences({ theme });
  },

  // Idioma
  getLanguage() {
    return this.getPreferences().language;
  },
  
  setLanguage(language) {
    return this.updatePreferences({ language });
  },

  // Moneda
  getCurrency() {
    return this.getPreferences().currency;
  },
  
  setCurrency(currency) {
    return this.updatePreferences({ currency });
  },

  // Notificaciones
  getNotificationSettings() {
    return this.getPreferences().notifications;
  },
  
  updateNotificationSettings(settings) {
    const current = this.getNotificationSettings();
    return this.updatePreferences({
      notifications: { ...current, ...settings }
    });
  },

  // Productos recientemente vistos
  addToRecentlyViewed(product) {
    const { recentlyViewed } = this.getPreferences();
    const updated = [
      product,
      ...recentlyViewed.filter(p => p.id !== product.id)
    ].slice(0, 10); // Mantener solo los 10 más recientes
    
    return this.updatePreferences({ recentlyViewed: updated });
  },

  getRecentlyViewed() {
    return this.getPreferences().recentlyViewed;
  },

  // Restablecer a valores por defecto
  resetToDefaults() {
    localStorageService.removeItem(PREFERENCES_KEY);
    return this.getPreferences();
  }
};
