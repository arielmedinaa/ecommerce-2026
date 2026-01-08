import { useCallback, useEffect, useState } from 'react';

const useHookSIide = (initialSlides = []) => {
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset current slide when slides change
  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => {
      const next = prev + 1;
      return next >= slides.length ? prev : next; // Stay at last slide
    });
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    if (slides.length === 0) return;
    setCurrentSlide(Math.max(0, Math.min(index, slides.length - 1)));
  }, [slides.length]);
  
  // Auto-advance slides
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        return next >= slides.length ? prev : next; // Stop at last slide
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    setSlides,
    currentSlideData: slides[currentSlide] || {}
  };
}

export default useHookSIide