export function getScreenWidthHeight() {
  const body = document.body;
  const { scrollWidth, scrollHeight, offsetWidth, offsetHeight } = body;
  return {
    width: scrollWidth > offsetWidth ? scrollWidth : offsetWidth,
    height: scrollHeight > offsetHeight ? scrollHeight : offsetHeight,
  };
}

export function canvasToBlob(target: HTMLCanvasElement) {
  return new Promise<string>((resolve) => {
    target.toBlob((blob) => {
      let url = '';
      if (blob) {
        url = URL.createObjectURL(blob);
      }
      resolve(url);
    });
  });
}

export function canvasToBase64(target: HTMLCanvasElement, type = 'image/png', quality = 1) {
  return target.toDataURL(type, quality);
}
