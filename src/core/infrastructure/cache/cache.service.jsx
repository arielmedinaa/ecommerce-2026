import CacheStrategy from '@core/infrastructure/cache/cache.strategy';

class CacheService {
  constructor(options = {}) {
    this.strategy = options.strategy || new CacheStrategy(options);
    this.pendingRequests = new Map();
  }

  async getOrUpdate(key, fetchFn, options = {}) {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    const { forceRefresh = false, ttl } = options;
    
    if (ttl) {
      this.strategy.ttl = ttl;
    }

    const cacheResult = await this.strategy.get(key);
    const hasValidCache = cacheResult && !cacheResult.isExpired;

    if (forceRefresh || !cacheResult) {
      return this.fetchAndCache(key, fetchFn);
    }

    if (hasValidCache) {
      this.fetchAndCache(key, fetchFn).catch(error => {
        console.warn(`Error al actualizar caché en segundo plano para ${key}:`, error);
      });
      
      return cacheResult.data;
    }

    if (cacheResult.isExpired) {
      this.fetchAndCache(key, fetchFn).catch(error => {
        console.warn(`Error al actualizar caché expirada para ${key}:`, error);
      });
      
      return cacheResult.data;
    }
  }

  async fetchAndCache(key, fetchFn) {
    const request = fetchFn()
      .then(async (data) => {
        await this.strategy.set(key, data);
        return data;
      })
      .finally(() => {
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, request);
    
    return request;
  }

  async invalidate(key) {
    await this.strategy.delete(key);
  }

  async clear() {
    await this.strategy.clear();
  }
}

export const cacheService = new CacheService({
  ttl: 5 * 60 * 1000, // 5 minutos por defecto
});

export { CacheService };
