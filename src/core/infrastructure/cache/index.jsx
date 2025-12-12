export { cacheService, CacheService } from '@core/infrastructure/cache/cache.service';

export { default as CacheStrategy } from '@core/infrastructure/cache/cache.strategy';

export { default as useCache } from '@core/infrastructure/cache/useCache';

export const createCacheKey = (prefix, params = {}) => {
  const paramsString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
    .join('&');
  
  return paramsString ? `${prefix}?${paramsString}` : prefix;
};

export const CACHE_KEYS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  USER_PROFILE: 'user_profile',
  CART: 'user_cart',
  SESSION: 'user_session',
};

export const DEFAULT_CACHE_CONFIG = {
  ttl: 5 * 60 * 1000, // 5 minutos
  enabled: true,
  keepPreviousData: true,
};
