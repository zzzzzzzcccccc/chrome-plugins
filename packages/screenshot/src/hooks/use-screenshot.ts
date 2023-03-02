import React, { useRef, useState, useEffect } from 'react';
import { mathCenterRect, mathExtraRect, Point, Rect } from '@chrome-plugin/common';

export interface UseScreenshotOptions<T extends HTMLElement> {
  target: T | null;
  onMoving?: (centerRect: Rect) => void;
  onMoveEnd?: (centerRect: Rect) => void;
  disabled?: boolean;
}

export default function useScreenshot<T extends HTMLElement>({
  target,
  onMoving,
  onMoveEnd,
  disabled = false,
}: UseScreenshotOptions<T>) {
  const startRef = useRef<Point>({ x: 0, y: 0 });
  const centerRectRef = useRef<Rect | null>(null);

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
    const rect = mathCenterRect(startRef.current, { x: e.clientX, y: e.clientY }, target);
    setCenterRect(rect);
    onMoving?.(centerRectRef.current as Rect);
  };

  const onMouseEnd = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    target?.removeEventListener('mousemove', onMousing);
    target?.removeEventListener('mouseup', onMouseEnd);
    onMoveEnd?.(centerRectRef.current as Rect);
  };

  const handleOnMouseStart = (e: React.MouseEvent<T>) => {
    if (disabled) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    target?.addEventListener('mousemove', onMousing);
    target?.addEventListener('mouseup', onMouseEnd);
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  useEffect(() => {
    centerRectRef.current = centerRect;
    setExtraRect((prev) => ({
      ...prev,
      ...mathExtraRect(target, centerRect),
    }));
  }, [target, centerRect]);

  return {
    handleOnMouseStart,
    centerRect,
    extraRect,
  };
}
