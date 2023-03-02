import { getQueryVariable } from '@chrome-plugin/common';

export function getUrlParams() {
  const width = +getQueryVariable('width');
  const height = +getQueryVariable('height');
  const url = getQueryVariable('url');

  return {
    width,
    height,
    url,
  };
}
