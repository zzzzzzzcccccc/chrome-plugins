type Result = {
  image: HTMLImageElement | null;
  error: Error | null;
};

export default function loadImage(target: string) {
  return new Promise<Result>((resolve) => {
    if (!target) {
      resolve({ image: null, error: new Error('no found target') });
      return;
    }
    const image = new Image();
    image.src = target;
    image.onload = () => {
      resolve({ image, error: null });
    };
    image.onerror = () => {
      resolve({ image: null, error: new Error('no found target') });
    };
  });
}
