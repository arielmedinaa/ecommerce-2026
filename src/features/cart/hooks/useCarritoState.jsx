import { useState } from 'react'

const useCarritoState = () => {
  const [carritos, setCarritos] = useState([]);
  return {
    carritos,
    setCarritos
  }
}

export default useCarritoState