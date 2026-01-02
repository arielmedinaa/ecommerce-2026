import React, { useState } from 'react'
import { globalFilter } from '@core/shared/constants/globalConst'

const useHooksState = () => {
  const [filter, setFilter] = useState(globalFilter);
  const [homeData, setHomeData] = useState({
    banners: [],
    productos: [],
    categorias: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  return {
    filter,
    setFilter,
    homeData,
    setHomeData,
    loading,
    setLoading,
    error,
    setError,
    lastUpdated,
    setLastUpdated
  };
};

export default useHooksState;