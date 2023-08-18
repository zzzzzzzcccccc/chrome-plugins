import { AppItem } from '../store/slices/menu-slice';
import ICONS from './icons';
import SVGS from './svgs';

const SHOP_APPS: Omit<AppItem, 'parentId'>[] = [
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
  {
    icon: {
      target: `#${SVGS.amazon}`,
      type: 'svg',
    },
    title: 'amazon',
    url: 'https://www.amazon.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.ebay}`,
      type: 'svg',
    },
    title: 'ebay',
    url: 'https://www.ebay.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.walmart}`,
      type: 'svg',
    },
    title: 'walmart',
    url: 'https://www.walmart.com',
    jumpMethod: 'remote',
  },
];

export default SHOP_APPS;
