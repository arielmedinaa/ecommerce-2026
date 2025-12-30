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
  return {
    filter,
    setFilter,
    homeData,
    setHomeData,
    loading,
    setLoading,
    error,
    setError
  }
}

export default useHooksState