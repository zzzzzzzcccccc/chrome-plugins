export function getScreenWidthHeight() {
  const body = document.body;
  const { scrollWidth, scrollHeight, offsetWidth, offsetHeight } = body;
  return {
    width: scrollWidth > offsetWidth ? scrollWidth : offsetWidth,
    height: scrollHeight > offsetHeight ? scrollHeight : offsetHeight,
  };
}
