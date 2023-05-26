import { useEffect, useRef } from 'react';

export default function useOutSideClick<Element extends HTMLElement>(callback?: (event: Event) => void, delay = 0) {
  const targetRef = useRef<Element | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const removeTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const handler = (event: Event) => {
      if (targetRef.current && !targetRef.current?.contains(event.target as HTMLElement)) {
        removeTimer();
        timerRef.current = setTimeout(() => {
          callback?.(event);
        }, delay);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      removeTimer();
      document.removeEventListener('click', handler);
    };
  }, [delay, callback]);

  return targetRef;
}
