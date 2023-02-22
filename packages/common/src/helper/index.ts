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

export function mathCenterRect<T extends HTMLElement>(start: Point, current: Point, target: T | null): Rect {
  if (!target) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };
  }
  const startLeft = start.x < current.x;
  const startBottom = start.y < current.y;
  const { x: targetX = 0, y: targetY = 0 } = target.getBoundingClientRect();
  return {
    top: (startBottom ? start.y : current.y) + Math.abs(targetY),
    left: (startLeft ? start.x : current.x) + Math.abs(targetX),
    width: startLeft ? current.x - start.x : start.x - current.x,
    height: startBottom ? current.y - start.y : start.y - current.y,
  };
}

export function mathExtraRect<T extends HTMLElement>(target: T | null, currentCenterRect: Rect) {
  if (!target) {
    return {};
  }
  const targetRect = target.getBoundingClientRect();
  const { left = 0, top = 0, width = 0, height = 0 } = currentCenterRect;
  return {
    left: {
      left: 0,
      top: 0,
      width: left,
      height: top + height,
    },
    top: {
      top: 0,
      left: left,
      width: targetRect.width - left,
      height: top,
    },
    right: {
      left: left + width,
      top: top,
      width: targetRect.width - (left + width),
      height: targetRect.height - top,
    },
    bottom: {
      left: 0,
      top: top + currentCenterRect.height,
      width: left + currentCenterRect.width,
      height: targetRect.height - (top + height),
    },
  };
}

export function cutImage(
  src: string,
  XY: [number, number],
  WH: [number, number],
  devicePixelRatio = window.devicePixelRatio || 1,
) {
  return new Promise<HTMLCanvasElement>((resolve) => {
    const image = new Image();
    const [dx, dy] = XY.map((v) => v * devicePixelRatio);
    const [dw, dh] = WH.map((v) => v * devicePixelRatio);
    const canvas = document.createElement('canvas');

    image.onload = () => {
      const context = canvas.getContext('2d');
      canvas.width = dw;
      canvas.height = dh;
      context?.drawImage(image, dx, dy, dw, dh, 0, 0, dw, dh);
      resolve(canvas);
    };
    image.src = src;
  });
}

export function downloadFile(href: string, fileName: string) {
  const link = document.createElement('a');

  link.download = fileName;
  link.href = href;
  link.click();
  link.remove();
}
