import React, { useCallback, useEffect, useState } from 'react'

const useHookSIide = (slides) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
  
      return () => clearInterval(interval);
    }, [nextSlide]);
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
  
    const goToSlide = (index) => {
      setCurrentSlide(index);
    };
    
  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide
  }
}

export default useHookSIide