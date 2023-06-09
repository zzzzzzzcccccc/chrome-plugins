import { AppItem } from '../store/slices/menu-slice';
import ICONS from './icons';

const GAME_APPS: AppItem[] = [
  {
    icon: {
      target: ICONS.steam,
      type: 'image',
    },
    title: 'steam',
    url: 'https://store.steampowered.com',
    jumpMethod: 'remote',
  },
];

export default GAME_APPS;
