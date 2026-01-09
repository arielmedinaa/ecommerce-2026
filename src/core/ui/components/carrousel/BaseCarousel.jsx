import { useEffect, useRef, forwardRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CarrouselSkeleton from '../../../../features/home/components/carrousel/CarrouselSkeleton';

const BaseCarousel = forwardRef(({
  title = '',
  titleAlignment = 'start',
  className = '',
  carouselId = `carousel-${Date.now()}`,
  
  items = [],
  isLoading = false,
  
  showNavigation = true,
  scrollAmount = 300,
  navigationButtonClass = '',
  
  renderItem,
  renderSkeleton,
  skeletonCount = 4,
  
  containerClass = 'relative w-full h-full',
  titleClass = 'text-2xl font-bold mb-2 font-poppins',
  carouselClass = 'flex h-full overflow-x-auto scroll-smooth space-x-6 py-4 scrollbar-hide items-stretch',
  
  autoFetch = false,
  onIntersection = null,
  intersectionOptions = { rootMargin: '200%', threshold: 0.01 },
  
  ...props
}, ref) => {
  const carouselRef = ref || useRef(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!autoFetch || !onIntersection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFetched.current) {
          onIntersection();
          hasFetched.current = true;
          observer.disconnect();
        }
      },
      intersectionOptions
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.disconnect();
      }
    };
  }, [autoFetch, onIntersection, intersectionOptions]);

  const scrollLeft = () => {
    const element = document.getElementById(carouselId);
    if (element) {
      element.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    const element = document.getElementById(carouselId);
    if (element) {
      element.scrollLeft += scrollAmount;
    }
  };

  const getTitleAlignmentClass = () => {
    switch (titleAlignment) {
      case 'center': return 'text-center';
      case 'end': return 'text-end';
      default: return 'text-start';
    }
  };

  const defaultNavigationButtonClass = `absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors ${navigationButtonClass}`;

  return (
    <div ref={carouselRef} className={`${containerClass} ${className}`} {...props}>
      {title && (
        <h2 className={`${titleClass} ${getTitleAlignmentClass()}`}>
          {title}
        </h2>
      )}
      
      <div className="relative h-full">
        {showNavigation && (
          <>
            <button
              onClick={scrollLeft}
              className={defaultNavigationButtonClass}
              aria-label="Anterior"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={scrollRight}
              className={`${defaultNavigationButtonClass} -right-4 left-auto`}
              aria-label="Siguiente"
            >
              <FiChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        <div
          id={carouselId}
          className={carouselClass}
        >
          {isLoading ? (
            renderSkeleton ? (
              [...Array(skeletonCount)].map((_, i) => renderSkeleton(i))
            ) : (
              [...Array(skeletonCount)].map((_, i) => (
                <div key={`skeleton-${i}`} className="shrink-0 w-72 h-[460px] bg-gray-200 rounded-xl animate-pulse" />
              ))
            )
          ) : items?.length > 0 ? (
            items.map((item, index) => renderItem(item, index))
          ) : (
            [...Array(skeletonCount)].map((_, i) => renderSkeleton ? renderSkeleton(i) : <CarrouselSkeleton key={`empty-${i}`} />)
          )}
        </div>
      </div>
    </div>
  );
});

BaseCarousel.displayName = 'BaseCarousel';

export default BaseCarousel;
