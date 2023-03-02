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

type BCanvasRenderingContext2D = CanvasRenderingContext2D & {
  backingStorePixelRatio?: number;
  webkitBackingStorePixelRatio?: number;
  mozBackingStorePixelRatio?: number;
  msBackingStorePixelRatio?: number;
  oBackingStorePixelRatio?: number;
};

export function getPixelRatio(
  context: BCanvasRenderingContext2D | null,
  devicePixelRatio = window.devicePixelRatio || 1,
) {
  if (!context) return 1;
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return devicePixelRatio / backingStore;
}

export function getLoadedImage(src: string) {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(image);
    image.src = src;
  });
}

export async function cutImage(src: string, XY: [number, number], WH: [number, number]) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const ratio = getPixelRatio(context);
  const [dx, dy] = XY.map((v) => v * ratio);
  const [dw, dh] = WH.map((v) => v * ratio);
  const image = await getLoadedImage(src);

  canvas.width = dw;
  canvas.height = dh;
  context?.drawImage(image, dx, dy, dw, dh, 0, 0, dw, dh);

  return canvas;
}

export function downloadFile(href: string, fileName: string) {
  const link = document.createElement('a');

  link.download = fileName;
  link.href = href;
  link.click();
  link.remove();
}

export function getQueryVariable<T = string>(variable: string) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] == variable) {
      return decodeURIComponent(pair[1] || '') as T;
    }
  }
  return '';
}

export function sleep(delay: number) {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(delay), delay);
  });
}

export function base64ToBlobURL(target: string, type: string) {
  const base64Data = target.split(',')[1];
  const binaryData = atob(base64Data);
  const byteArray = new Uint8Array(binaryData.length);

  for (let i = 0; i < binaryData.length; i++) {
    byteArray[i] = binaryData.charCodeAt(i);
  }

  const blob = new Blob([byteArray], { type });

  return URL.createObjectURL(blob);
}
