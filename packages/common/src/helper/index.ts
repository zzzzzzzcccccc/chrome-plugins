export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  width: number;
  height: number;
}

export function mathCenterRect<T extends HTMLElement>(start: Point, current: Point, target: T): Rect {
  const startLeft = start.x < current.x;
  const startBottom = start.y < current.y;
  const { x: targetX, y: targetY } = target.getBoundingClientRect();
  return {
    top: (startBottom ? start.y : current.y) + Math.abs(targetY),
    left: (startLeft ? start.x : current.x) + Math.abs(targetX),
    width: startLeft ? current.x - start.x : start.x - current.x,
    height: startBottom ? current.y - start.y : start.y - current.y,
  };
}

export function mathExtraRect<T extends HTMLElement, C extends HTMLElement>(target: T | null, center: C | null) {
  if (!target || !center) {
    return {
      left: { width: 0, height: 0, left: 0, top: 0 },
      top: { width: 0, height: 0, left: 0, top: 0 },
      right: { width: 0, height: 0, left: 0, top: 0 },
      bottom: { width: 0, height: 0, left: 0, top: 0 },
    };
  }
  const centerRect = center.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const left = {
    left: 0,
    top: 0,
    width: centerRect.x,
    height: targetRect.height,
  };
  const right = {
    right: 0,
    top: centerRect.y,
    width: targetRect.width - centerRect.x - centerRect.width,
    height: centerRect.height,
  };
  const top = {
    width: targetRect.width,
    height: centerRect.y,
    top: 0,
    left: centerRect.x,
    right: targetRect.width - centerRect.x - centerRect.width,
  };
  const bottom = {
    width: targetRect.width,
    height: targetRect.height - centerRect.y - centerRect.height,
    bottom: 0,
    left: centerRect.x,
    right: targetRect.width - centerRect.x - centerRect.width,
  };
  return {
    left,
    right,
    top,
    bottom,
  };
}
