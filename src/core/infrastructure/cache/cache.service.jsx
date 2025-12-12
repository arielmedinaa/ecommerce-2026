import CacheStrategy from '@core/infrastructure/cache/cache.strategy';

class CacheService {
  constructor(options = {}) {
    this.strategy = options.strategy || new CacheStrategy(options);
    this.pendingRequests = new Map();
  }

  /**
   * Obtiene datos de la caché o de la red usando la estrategia Stale While Revalidate
   * @param {string} key - Clave única para identificar el caché
   * @param {Function} fetchFn - Función que devuelve una promesa con los datos frescos
   * @param {Object} options - Opciones adicionales
   * @param {boolean} options.forceRefresh - Forzar actualización ignorando la caché
   * @param {number} options.ttl - Tiempo de vida en milisegundos
   * @returns {Promise<any>} Datos en caché o de la red
   */
  async getOrUpdate(key, fetchFn, options = {}) {
    // Si ya hay una petición en curso para esta clave, devolvemos esa promesa
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    const { forceRefresh = false, ttl } = options;
    
    if (ttl) {
      this.strategy.ttl = ttl;
    }

    const cacheResult = await this.strategy.get(key);
    const hasValidCache = cacheResult && !cacheResult.isExpired;

    // Si forzamos la actualización o no hay caché, hacemos la petición
    if (forceRefresh || !cacheResult) {
      return this.fetchAndCache(key, fetchFn);
    }

    // Si hay caché válida, devolvemos los datos y actualizamos en segundo plano
    if (hasValidCache) {
      // Actualización en segundo plano
      this.fetchAndCache(key, fetchFn).catch(error => {
        console.warn(`Error al actualizar caché en segundo plano para ${key}:`, error);
      });
      
      return cacheResult.data;
    }

    // Si la caché está vencida pero aún así la devolvemos mientras se actualiza
    if (cacheResult.isExpired) {
      this.fetchAndCache(key, fetchFn).catch(error => {
        console.warn(`Error al actualizar caché expirada para ${key}:`, error);
      });
      
      return cacheResult.data;
    }
  }

  /**
   * Obtiene datos de la red y actualiza la caché
   * @private
   */
  async fetchAndCache(key, fetchFn) {
    const request = fetchFn()
      .then(async (data) => {
        await this.strategy.set(key, data);
        return data;
      })
      .finally(() => {
        // Eliminamos la petición pendiente
        this.pendingRequests.delete(key);
      });

    // Guardamos la promesa para evitar peticiones duplicadas
    this.pendingRequests.set(key, request);
    
    return request;
  }

  /**
   * Elimina un elemento de la caché
   * @param {string} key - Clave del elemento a eliminar
   */
  async invalidate(key) {
    await this.strategy.delete(key);
  }

  /**
   * Limpia toda la caché
   */
  async clear() {
    await this.strategy.clear();
  }
}

// Exportamos una instancia por defecto
export const cacheService = new CacheService({
  ttl: 5 * 60 * 1000, // 5 minutos por defecto
});

// También exportamos la clase para permitir crear instancias personalizadas
export { CacheService };
