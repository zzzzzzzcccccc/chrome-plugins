import { AppItem } from '../store/slices/menu-slice';
import ICONS from './icons';

const SHOP_APPS: AppItem[] = [
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

export default SHOP_APPS;
