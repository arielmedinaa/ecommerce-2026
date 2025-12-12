import { useState, useEffect, useCallback } from 'react';
import { cacheService } from '@core/infrastructure/cache/cache.service';

const useCache = (cacheKey, fetchFn, options = {}) => {
  const {
    enabled = true,
    ttl,
    keepPreviousData = true,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setIsValidating(true);
      
      const result = await cacheService.getOrUpdate(
        cacheKey,
        async () => {
          const response = await fetchFn();
          onSuccess?.(response);
          return response;
        },
        { forceRefresh, ttl }
      );
      
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      console.error(`Error en useCache (${cacheKey}):`, err);
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  }, [cacheKey, enabled, fetchFn, onError, onSuccess, ttl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mutate = useCallback(async () => {
    return fetchData(true);
  }, [fetchData]);

  const invalidate = useCallback(async () => {
    try {
      await cacheService.invalidate(cacheKey);
      return true;
    } catch (err) {
      console.error(`Error al invalidar caché (${cacheKey}):`, err);
      return false;
    }
  }, [cacheKey]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    invalidate,
  };
};

export default useCache;
