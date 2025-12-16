import { useCallback, useEffect, useRef, useState } from 'react'

const useHooksEffect = (homeState, isCall = false) => {
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const heroRef = useRef(null);
    const prevScrollY = useRef(window.scrollY);
    const scrollThreshold = 500;
    const isScrollingDown = useRef(false);

    const fetchEffect = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:3002/ecommerce/home/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(homeState.filter),
            });

            if (!res.ok) {
                throw new Error('Error al obtener los datos');
            }

            const data = await res.json();

            if (data.status === 200 && data.data) {
                //console.log(data.data);
                homeState.setHomeData(data.data);
            }
        } catch (error) {
            console.error('Error en fetchEffect:', error);

        }
    }, [homeState.filter]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            isScrollingDown.current = currentScrollY > prevScrollY.current;
            if (isScrollingDown.current && currentScrollY > scrollThreshold && isHeroVisible) {
                setIsHeroVisible(false);
            } else if ((!isScrollingDown.current || currentScrollY <= scrollThreshold) && !isHeroVisible) {
                setIsHeroVisible(true);
            }

            prevScrollY.current = currentScrollY;
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [isHeroVisible, scrollThreshold]);

    return {
        isHeroVisible,
        setIsHeroVisible,
        fetchEffect,
        heroRef
    }
}

export default useHooksEffect