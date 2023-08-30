import ICONS from './icons';
import SVGS from './svgs';
import DEVELOP_APPS from './develop-apps';
import SHOP_APPS from './shop-apps';
import GAME_APPS from './game-apps';
import MEDIA_APPS from './media-apps';
import { AppItem, MenuItem } from '../store/slices/menu-slice';

export const FAVICON_URL = './icon16.png';
export const CHROME_MESSAGE_NAME_SPACE = '___CHROME_TAB_MANAGER___';
export const HTTP_STATUS_SUCCESS = 200;
export const HTTP_STATUS_TEXT_SUCCESS = 'OK';
export const HTTP_TIME_OUT = 10000;
export const SESSION_KEYS = {
  store: '__store__',
  theme: '__theme__',
  language: '__language__',
  recentKeyword: '__recent_keyword__',
  enabledHttpBlocking: '__enabled_http_blocking__',
};
export const CSS_NAME_SPACE = '__zc-home';
export const COLOR_RANGES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
export const KEYBOARD_KEYS = {
  command_s: 'metas',
  alt_s: 'alts',
  command_o: 'metao',
  alt_o: 'alto',
};
export const APP_SEARCH_LRU_CAPACITY = 20;
export const BASE_URL_BY_BAIDU = 'https://www.baidu.com';
export const BASE_URL_BY_GOOGLE = 'https://www.google.com';
export const BASE_URL_BY_BING = 'https://www.bing.com';
export const BASE_URL_BY_YAHOO = 'https://search.yahoo.com';
export const DEFAULT_BACKGROUND_URL_STORE = ['./images/bg/1.jpg', './images/bg/2.jpg'];
export const BASE_SASS_LIB_URL = './sass/sass.min.js';
export const BASE_SASS_LIB_WORKER_URL = `./sass/sass.worker.js`;

export const DEFAULT_MENUS: Record<string, MenuItem> = {
  [SVGS.develop]: {
    id: SVGS.develop,
    title: 'develop.title',
    icon: {
      target: SVGS.develop,
      type: 'svg',
    },
  },
  [SVGS.shop]: {
    id: SVGS.shop,
    title: 'shop.title',
    icon: {
      target: SVGS.shop,
      type: 'svg',
    },
  },
  [SVGS.game]: {
    id: SVGS.game,
    title: 'game.title',
    icon: {
      target: SVGS.game,
      type: 'svg',
    },
  },
  [SVGS.media]: {
    id: SVGS.media,
    title: 'media.title',
    icon: {
      target: SVGS.media,
      type: 'svg',
    },
  },
};
export const DEFAULT_MENU_LIST = Object.keys(DEFAULT_MENUS).reduce((acc, key) => {
  acc.push(DEFAULT_MENUS[key]);
  return acc;
}, [] as MenuItem[]);
export const DEFAULT_APPS: Record<string, AppItem[]> = {
  [SVGS.develop]: DEVELOP_APPS.map((item) => ({ ...item, parentId: SVGS.develop })),
  [SVGS.shop]: SHOP_APPS.map((item) => ({ ...item, parentId: SVGS.shop })),
  [SVGS.game]: GAME_APPS.map((item) => ({ ...item, parentId: SVGS.game })),
  [SVGS.media]: MEDIA_APPS.map((item) => ({ ...item, parentId: SVGS.media })),
};
export const DEFAULT_APP_LIST = Object.keys(DEFAULT_APPS).reduce((acc, key) => {
  acc.push(...DEFAULT_APPS[key]);
  return acc;
}, [] as AppItem[]);
export const DEFAULT_HTTP_METHODS: Record<string, string> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
  HEAD: 'head',
  OPTIONS: 'options',
};
export const DEFAULT_RESPONSE = {
  code: 200,
  data: 'Hello World',
};
export const RESPONSE = 'response';
export const HEADER = 'header';
export const MAX_HTTP_BLOCKING_TOTAL_RULE = 30;
export { ICONS, SVGS, DEVELOP_APPS, SHOP_APPS, GAME_APPS, MEDIA_APPS };
