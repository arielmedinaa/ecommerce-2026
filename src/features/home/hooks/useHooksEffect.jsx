import { useCallback, useEffect, useRef, useState } from 'react';
import { getWithFilter, getData } from '@core/infrastructure/api/api.general';
import { cacheService } from '@core/infrastructure/cache';
import useCartStore from '@core/shared/stores/cart.store';
import usePromotionsStore from '@core/shared/stores/promotions.store';

const CACHE_KEYS = {
    HOME: 'home_data',
};

const CACHE_TTLS = {
    HOME: 5 * 60 * 1000,
    CART: 1 * 60 * 1000
};

const useHooksEffect = (homeState, isCall = false, loadRef, view) => {
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const heroRef = useRef(null);
    const prevScrollY = useRef(window.scrollY);
    const scrollThreshold = 500;
    const isScrollingDown = useRef(false);
    const setCart = useCartStore(state => state.setCart);
    const { fetchPromotions } = usePromotionsStore();

    const fetchHomeData = useCallback(async () => {
        const response = await getWithFilter('content/home', homeState.filter);
        if (response?.status === 200) {
            return response.data;
        }
        throw new Error('Failed to fetch home data');
    }, [homeState.filter]);

    const fetchCartData = useCallback(async () => {
        const response = await getData('cart');
        if (response?.data) {
            return Array.isArray(response.data) ? response.data[0] : response.data;
        }
        throw new Error('Failed to fetch cart data');
    }, []);


    const fetchEffect = useCallback(async () => {
        try {
            const [cachedHomeData] = await Promise.all([
                cacheService.getOrUpdate(CACHE_KEYS.HOME, fetchHomeData, { ttl: CACHE_TTLS.HOME })
            ]);

            if (cachedHomeData) {
                homeState.setHomeData(cachedHomeData);
            }

            const cartData = await fetchCartData();
            setCart(cartData);
        } catch (error) {
            console.error('Error in fetchEffect:', error);
            try {
                const [homeResponse] = await Promise.all([
                    fetchHomeData(),
                ]);
                homeState.setHomeData(homeResponse);
            } catch (fallbackError) {
                console.error('Fallback fetch failed:', fallbackError);
            }
        }
    }, [fetchHomeData, homeState, fetchCartData, setCart]);

    useEffect(() => {
        if (isCall) {
            fetchEffect();
        }
    }, [isCall, homeState.lastUpdated]);

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
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHeroVisible]);

    useEffect(() => {
        if (view) {
            fetchPromotions();
        }
    }, [view, fetchPromotions]);

    return { isHeroVisible, heroRef, fetchEffect };
};

export default useHooksEffect;