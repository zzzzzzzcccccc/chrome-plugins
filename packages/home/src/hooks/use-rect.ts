import { useState, useEffect, useCallback, useRef } from 'react';

export default function useRect<Element extends HTMLElement>(target: Element) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const [entry] = entries;
    setRect(entry.contentRect);
  }, []);

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver(handleResize);

    const resizeObserver = resizeObserverRef.current;
    if (target && resizeObserver) {
      resizeObserver.observe(target);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, [target, handleResize]);

  return rect;
}
