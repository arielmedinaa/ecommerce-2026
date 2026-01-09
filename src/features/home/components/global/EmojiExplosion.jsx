import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import BlackFriday from '@assets/icons/blackFriday1.webp'
import BlackFriday2 from '@assets/icons/blackFriday2.webp'
import BlackFriday3 from '@assets/icons/blackFriday3.webp'

const EmojiExplosion = ({ isActive }) => {
  const containerRef = useRef(null);
  const images = [BlackFriday, BlackFriday2, BlackFriday3];
  const hasExplodedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isActive || hasExplodedRef.current) {
      return;
    }

    const createImageBurst = () => {
      const imageCount = 30;
      const imageElements = [];

      for (let i = 0; i < imageCount; i++) {
        const image = document.createElement("img");
        image.src = images[i % 3];
        image.alt = "Black Friday";

        const sizeClass =
          Math.random() < 0.3
            ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
            : Math.random() < 0.6
            ? "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
            : "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-24 lg:h-24";

        image.className = `absolute ${sizeClass} object-cover rounded-lg`;
        image.style.left = "50%";
        image.style.top = "50%";
        image.style.transform = "translate(-50%, -50%)";
        image.style.zIndex = "20";
        image.style.clipPath = "inset(0)";
        image.style.maxWidth = "100%";
        image.style.maxHeight = "100%";

        container.appendChild(image);
        imageElements.push(image);
      }

      imageElements.forEach((image, index) => {
        const angle = (Math.PI * 2 * index) / imageCount;
        const viewportWidth = window.innerWidth;
        const baseDistance = viewportWidth < 768 ? 150 : viewportWidth < 1024 ? 250 : 300;
        const distance = baseDistance + Math.random() * (viewportWidth < 768 ? 200 : 400);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotation = Math.random() * 720 - 360;
        const scale = 0.3 + Math.random() * 2.5;
        const hasBlur = Math.random() < 0.4;

        gsap
          .timeline()
          .to(image, {
            duration: 0.01,
            scale: 1,
            opacity: 1,
            ease: "power1.out",
          })
          .to(image, {
            duration: 0.6,
            x: x,
            y: y,
            rotation: rotation,
            scale: scale,
            opacity: 1,
            ease: "power2.out",
            delay: Math.random() * 0.15,
            onComplete: () => {
              if (hasBlur) {
                image.style.filter = "blur(2px)";
              }
            },
          });
      });

      hasExplodedRef.current = true;
    };

    const timer = setTimeout(createImageBurst, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ clipPath: "inset(0)" }}
    ></div>
  );
};

export default EmojiExplosion