import { sessionStorageService, localStorageService } from '@core/infrastructure/storage/storage.service';

const AUTH_KEY = 'ecommerce_auth';
const REMEMBER_ME_KEY = 'ecommerce_remember_me';

export const authStorage = {
  setAuthData(authData, rememberMe = false) {
    const storage = rememberMe ? localStorageService : sessionStorageService;
    
    this.clearAuthData();
    
    storage.setItem(AUTH_KEY, {
      ...authData,
      timestamp: new Date().toISOString()
    });
    
    localStorageService.setItem(REMEMBER_ME_KEY, rememberMe);
  },

  getAuthData() {
    const rememberMe = localStorageService.getItem(REMEMBER_ME_KEY, false);
    const storage = rememberMe ? localStorageService : sessionStorageService;
    return storage.getItem(AUTH_KEY);
  },

  isAuthenticated() {
    const authData = this.getAuthData();
    if (!authData) return false;
    
    // Verificar si el token ha expirado (si existe expiración)
    if (authData.expiresAt) {
      return new Date(authData.expiresAt) > new Date();
    }
    
    return true;
  },

  // Obtener token de acceso
  getAccessToken() {
    const authData = this.getAuthData();
    return authData?.accessToken;
  },

  // Obtener información del usuario
  getUser() {
    const authData = this.getAuthData();
    return authData?.user;
  },

  // Cerrar sesión
  clearAuthData() {
    localStorageService.removeItem(AUTH_KEY);
    sessionStorageService.removeItem(AUTH_KEY);
    // No limpiamos REMEMBER_ME_KEY para mantener la preferencia
  },

  // Verificar si está configurado para recordar la sesión
  shouldRememberMe() {
    return localStorageService.getItem(REMEMBER_ME_KEY, false);
  }
};
