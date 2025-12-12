// Servicios de almacenamiento base
export { localStorageService, sessionStorageService } from '@core/infrastructure/storage/storage.service';

// Servicios específicos
export * from '@core/infrastructure/storage/auth.storage';
export * from '@core/infrastructure/storage/cart.storage';
export * from '@core/infrastructure/storage/preferences.storage';

// Utilidad para limpiar todo el almacenamiento relacionado con la aplicación
export const clearAllAppData = () => {
  // Limpiar autenticación
  sessionStorageService.clear();
  
  // Limpiar preferencias (si se desea mantener las preferencias, eliminar esta línea)
  // localStorageService.clear();
  
  // En su lugar, limpiar solo las claves específicas de la aplicación
  ['ecommerce_cart', 'ecommerce_auth', 'ecommerce_remember_me', 'ecommerce_preferences']
    .forEach(key => {
      localStorageService.removeItem(key);
      sessionStorageService.removeItem(key);
    });
};
