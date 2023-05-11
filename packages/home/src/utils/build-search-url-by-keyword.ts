import { BASE_URL_BY_BAIDU, BASE_URL_BY_BING, BASE_URL_BY_GOOGLE, BASE_URL_BY_YAHOO } from '../constants';

export default function buildSearchUrlByKeyword(keyword: string, source: string) {
  switch (source) {
    case 'google':
      return `${BASE_URL_BY_GOOGLE}/search?q=${keyword}`;
    case 'baidu':
      return `${BASE_URL_BY_BAIDU}/s?wd=${keyword}`;
    case 'bing':
      return `${BASE_URL_BY_BING}/search?q=${keyword}`;
    case 'yahoo':
      return `${BASE_URL_BY_YAHOO}/search?q=${keyword}`;
  }
}
