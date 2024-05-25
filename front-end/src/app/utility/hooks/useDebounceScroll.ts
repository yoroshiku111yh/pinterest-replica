import { debounce } from "lodash";
import { RefObject, useEffect } from "react";

export interface TypePropsDebounceScroll {
    wait?: number,
    callback: () => void,
    element?: RefObject<HTMLElement> | null,
    rate?: number

}

export const useDebouncedScroll = ({callback, wait = 300, rate = 0.95, element = null}: TypePropsDebounceScroll) => {
    useEffect(() => {
        const handleScroll = debounce(() => {
            const target = element?.current ?? document.documentElement;
            const scrollTop = target.scrollTop;
            const windowHeight = element ? target.clientHeight : window.innerHeight;
            const fullHeight = target.scrollHeight;

            if (scrollTop + windowHeight >= fullHeight*rate) {
                callback();
            }
        }, wait);

        const targetElement = element?.current ?? window;

        targetElement.addEventListener('scroll', handleScroll as EventListener);

        return () => {
            targetElement.removeEventListener('scroll', handleScroll as EventListener);
        };
    }, [callback, wait, element]);
};