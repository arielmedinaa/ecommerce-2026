import { useCallback, useEffect, useRef, useState } from 'react'
import { getWithFilter, getData } from '@core/infrastructure/api/api.general';
import useCartStore from '../../../core/shared/stores/cart.store';

const useHooksEffect = (homeState, isCall = false) => {
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const heroRef = useRef(null);
    const prevScrollY = useRef(window.scrollY);
    const scrollThreshold = 500;
    const isScrollingDown = useRef(false);
    const setCart = useCartStore(state => state.setCart);
    const fetchEffect = useCallback(async () => {
        try {
            const [responseHome, responseCarrito] = await Promise.all([
                getWithFilter('content/home', homeState.filter),
                getData('cart')
            ]);
            if (responseHome?.status === 200) {
                homeState.setHomeData(responseHome.data);
            }
            if (responseCarrito?.data) {
                console.log(responseCarrito?.data)
                setCart(responseCarrito.data);
            }
        } catch (error) {
            console.error('Error en fetchEffect:', error);
        }
    }, [homeState.filter, setCart]);

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