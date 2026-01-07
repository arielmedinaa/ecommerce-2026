import { useRef, useCallback } from 'react';

export const useEnterNavigation = (onSubmit = null) => {
  const inputRefs = useRef([]);

  const registerInput = useCallback((index) => {
    if (!inputRefs.current[index]) {
      inputRefs.current[index] = { current: null };
    }
    return inputRefs.current[index];
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      const refs = inputRefs.current.filter(ref => ref && ref.current);
      const activeIndex = refs.findIndex(ref => ref.current === document.activeElement);
      
      if (activeIndex !== -1 && activeIndex < refs.length - 1) {
        refs[activeIndex + 1].current.focus();
      } else if (activeIndex === refs.length - 1 && onSubmit) {
        onSubmit();
      }
    }
  }, [onSubmit]);

  return { registerInput, handleKeyDown };
};
