import React, { useRef, useState, useEffect } from 'react';
import { mathCenterRect, mathExtraRect, Point, Rect } from '@chrome-plugin/common';
import { useInjectContext } from '../../../context';

export default function useScreenshot<T extends HTMLElement>() {
  const { updateContext, moveEnd, moving } = useInjectContext();

  const targetRef = useRef<T | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<Point>({ x: 0, y: 0 });

  const [centerRect, setCenterRect] = useState<Rect>({ width: 0, height: 0, left: 0, top: 0 });
  const [extraRect, setExtraRect] = useState<{ left: Rect; top: Rect; right: Rect; bottom: Rect }>({
    left: { width: 0, height: 0, left: 0, top: 0 },
    top: { width: 0, height: 0, left: 0, top: 0 },
    right: { width: 0, height: 0, left: 0, top: 0 },
    bottom: { width: 0, height: 0, left: 0, top: 0 },
  });

  const onMousing = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!moving) {
      updateContext?.({ moveEnd: false, moving: true });
    }
    const rect = mathCenterRect(startRef.current, { x: e.clientX, y: e.clientY }, targetRef.current as T);
    setCenterRect(rect);
  };

  const onMouseEnd = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    targetRef.current?.removeEventListener('mousemove', onMousing);
    targetRef.current?.removeEventListener('mouseup', onMouseEnd);
    updateContext?.({ moveEnd: true, moving: false });
  };

  const handleOnMouseStart = (e: React.MouseEvent<T>) => {
    if (moveEnd) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    targetRef.current?.addEventListener('mousemove', onMousing);
    targetRef.current?.addEventListener('mouseup', onMouseEnd);
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  useEffect(() => {
    setExtraRect(mathExtraRect(targetRef.current, centerRef.current));
  }, [centerRect]);

  return {
    handleOnMouseStart,
    targetRef,
    centerRef,
    centerRect,
    extraRect,
    moveEnd,
  };
}
