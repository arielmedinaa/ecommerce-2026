import { useState, useEffect, useCallback } from 'react';
import useHooksEffect from './useHooksEffect';
import useHookSlide from './useHookSIide';
import useHooksState from './useHooksState';

const useHookHome = () => {
  const homeState = useHooksState();
  const homeEffect = useHooksEffect(homeState);
  const homeSlide = useHookSlide(homeState);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await homeEffect.fetchEffect();
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refetch = useCallback(() => {
    return loadData();
  }, [loadData]);

  return {
    ...homeState.homeData,
    loading: isLoading,
    error,
    refetch,
    fetchEffect: homeEffect.fetchEffect,
    ...homeSlide,
    heroRef: homeEffect.heroRef,
    isHeroVisible: homeEffect.isHeroVisible,
    banners: homeState.homeData.banners || [],
    products: homeState.homeData.productos || [],
    categories: homeState.homeData.categorias || []
  };
};

export default useHookHome;