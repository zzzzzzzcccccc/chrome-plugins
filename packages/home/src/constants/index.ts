import { AppItem } from '../store/slices/menu-slice';

export const HTTP_TIME_OUT = 10000;
export const SESSION_KEYS = {
  theme: '__theme__',
  language: '__language__',
  recentKeyword: '__recent_keyword__',
};
export const CSS_NAME_SPACE = '__zc-home';
export const COLOR_RANGES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
export const ICONS = {
  md5: './images/icons/md5.jpeg',
  base64: './images/icons/base64.png',
  aes: './images/icons/aes.png',
  sha: './images/icons/sha.png',
  taoBao: './images/icons/taobao.png',
  tmall: './images/icons/tmall.png',
  jd: './images/icons/jd.png',
  steam: './images/icons/steam.png',
};
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

export const DEVELOP_APPS: AppItem[] = [
  {
    icon: {
      target: '#json',
      type: 'svg',
    },
    title: 'develop.json_editor',
    url: '/json-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: ICONS.base64,
      type: 'image',
    },
    title: 'develop.base64',
    url: '/base64-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: '#string',
      type: 'svg',
    },
    title: 'develop.string',
    url: '/string-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: '#html',
      type: 'svg',
    },
    title: 'develop.html_to_jsx',
    url: '/html-to-jsx-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: ICONS.md5,
      type: 'image',
    },
    title: 'develop.md5',
    url: '/md5-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: ICONS.aes,
      type: 'image',
    },
    title: 'develop.aes',
    url: '/aes-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: ICONS.sha,
      type: 'image',
    },
    title: 'develop.sha',
    url: '/sha-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: '#rabbit',
      type: 'svg',
    },
    title: 'develop.rabbit',
    url: '',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: '#readFile',
      type: 'svg',
    },
    title: 'develop.read_file',
    url: '/rabbit-editor',
    jumpMethod: 'internal',
  },
];
export const SHOP_APPS: AppItem[] = [
  {
    icon: {
      target: ICONS.taoBao,
      type: 'image',
    },
    title: 'taobao',
    url: 'https://world.taobao.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.tmall,
      type: 'image',
    },
    title: 'tmall',
    url: 'https://www.tmall.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.jd,
      type: 'image',
    },
    title: 'jd',
    url: 'https://jd.com',
    jumpMethod: 'remote',
  },
];
export const GAME_APPS: AppItem[] = [
  {
    icon: {
      target: ICONS.steam,
      type: 'image',
    },
    title: 'steam',
    url: 'https://store.steampowered.com/',
    jumpMethod: 'remote',
  },
];
export const MEDIA_APPS: AppItem[] = [
  {
    icon: {
      target: '#youtube',
      type: 'svg',
    },
    title: 'youtube',
    url: 'https://www.youtube.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: '#bilibili',
      type: 'svg',
    },
    title: 'bilibili',
    url: 'https://www.bilibili.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: '#tiktok',
      type: 'svg',
    },
    title: 'tiktok',
    url: 'https://www.tiktok.com',
    jumpMethod: 'remote',
  },
];
