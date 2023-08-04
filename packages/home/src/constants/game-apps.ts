import { AppItem } from '../store/slices/menu-slice';
import ICONS from './icons';
import SVGS from './svgs';

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
  {
    icon: {
      target: `#${SVGS.ngaBBS}`,
      type: 'svg',
    },
    title: 'nga_bbs',
    url: 'https://bbs.nga.cn',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.epic}`,
      type: 'svg',
    },
    title: 'epic_games',
    url: 'https://store.epicgames.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.gog}`,
      type: 'svg',
    },
    title: 'gog',
    url: 'https://www.gog.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.ea}`,
      type: 'svg',
    },
    title: 'ea',
    url: 'https://www.ea.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.ubisoft}`,
      type: 'svg',
    },
    title: 'ubisoft',
    url: 'https://www.ubisoft.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.blizzard}`,
      type: 'svg',
    },
    title: 'blizzard',
    url: 'https://www.blizzard.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.mihoyo,
      type: 'image',
    },
    title: 'mi_ho_yo',
    url: 'https://www.mihoyo.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.tencentGame,
      type: 'image',
    },
    title: 'tencent_game',
    url: 'https://game.qq.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.game163,
      type: 'image',
    },
    title: 'game_163',
    url: 'https://game.163.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.nexusMod,
      type: 'image',
    },
    title: 'nexus_mod',
    url: 'https://www.nexusmods.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.reddit}`,
      type: 'svg',
    },
    title: 'reddit',
    url: 'https://www.reddit.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.ign}`,
      type: 'svg',
    },
    title: 'ign',
    url: 'https://www.ign.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.curseForge}`,
      type: 'svg',
    },
    title: 'curse_forge',
    url: 'https://www.curseforge.com',
    jumpMethod: 'remote',
  },
];

export default GAME_APPS;
