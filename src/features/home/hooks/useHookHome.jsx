import { useState, useEffect, useCallback } from 'react';
import useHooksEffect from './useHooksEffect';
import useHookSlide from './useHookSIide';
import useHooksState from './useHooksState';

const useHookHome = (loadRef, view) => {
  const homeState = useHooksState();
  const homeEffect = useHooksEffect(homeState, true, loadRef, view);
  const homeSlide = useHookSlide(homeState);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      homeState.setLastUpdated(Date.now());
    } catch (err) {
      console.error('Error in refetch:', err);
      setError(err.message || 'Error al actualizar los datos');
    } finally {
      setIsLoading(false);
    }
  }, [homeState]);

  return {
    ...homeState.homeData,
    loading: isLoading,
    error,
    refetch,
    ...homeSlide,
    heroRef: homeEffect.heroRef,
    isHeroVisible: homeEffect.isHeroVisible,
    banners: homeState.homeData.banners || [],
    products: homeState.homeData.productos || [],
    categories: homeState.homeData.categorias || []
  };
};

export default useHookHome;