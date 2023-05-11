import { useEffect, useRef } from 'react';

export default function useOutSideClick<Element extends HTMLElement>(callback?: (event: MouseEvent) => void) {
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target as HTMLElement)) {
        callback?.(event);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [callback]);

  return targetRef;
}
