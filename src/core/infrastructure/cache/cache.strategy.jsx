import { localStorageService } from '@core/infrastructure/storage/storage.service';

const CACHE_PREFIX = 'cache_';
const DEFAULT_TTL = 5 * 60 * 1000;

class CacheStrategy {
  constructor(options = {}) {
    this.ttl = options.ttl || DEFAULT_TTL;
    this.storage = options.storage || localStorageService;
    this.prefix = options.prefix || CACHE_PREFIX;
  }

  getKey(key) {
    return `${this.prefix}${key}`;
  }

  async get(key) {
    const cacheKey = this.getKey(key);
    const cached = this.storage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const { data, timestamp } = cached;
    const isExpired = Date.now() - timestamp > this.ttl;
    
    return { data, isExpired };
  }

  async set(key, data) {
    const cacheKey = this.getKey(key);
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    
    this.storage.setItem(cacheKey, cacheData);
    return data;
  }

  async delete(key) {
    const cacheKey = this.getKey(key);
    this.storage.removeItem(cacheKey);
  }

  async clear() {
    const keys = Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix));
    
    keys.forEach(key => this.storage.removeItem(key));
  }
}

export default CacheStrategy;
