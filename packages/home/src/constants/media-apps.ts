import { AppItem } from '../store/slices/menu-slice';
import ICONS from './icons';
import SVGS from './svgs';

const MEDIA_APPS: AppItem[] = [
  {
    icon: {
      target: `#${SVGS.youtube}`,
      type: 'svg',
    },
    title: 'youtube',
    url: 'https://www.youtube.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.bilibili}`,
      type: 'svg',
    },
    title: 'bilibili',
    url: 'https://www.bilibili.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.tiktok}`,
      type: 'svg',
    },
    title: 'tiktok',
    url: 'https://www.tiktok.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.vimeo,
      type: 'image',
    },
    title: 'vimeo',
    url: 'https://vimeo.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.netflix}`,
      type: 'svg',
    },
    title: 'netflix',
    url: 'https://www.netflix.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.hulu}`,
      type: 'svg',
    },
    title: 'hulu',
    url: 'https://www.hulu.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.dailymotion}`,
      type: 'svg',
    },
    title: 'dailymotion',
    url: 'https://www.dailymotion.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.spotify,
      type: 'image',
    },
    title: 'spotify',
    url: 'https://open.spotify.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.appleMusic}`,
      type: 'svg',
    },
    title: 'apple_music',
    url: 'https://www.apple.com/apple-music',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.soundCloud,
      type: 'image',
    },
    title: 'sound_cloud',
    url: 'https://soundcloud.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.pandora,
      type: 'image',
    },
    title: 'pandora',
    url: 'https://www.pandora.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.amazonMusic,
      type: 'image',
    },
    title: 'amazon_music',
    url: 'https://music.amazon.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.iqiyi}`,
      type: 'svg',
    },
    title: 'iqiyi',
    url: 'https://www.iqiyi.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.youku}`,
      type: 'svg',
    },
    title: 'youku',
    url: 'https://www.youku.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: ICONS.kuaishou,
      type: 'image',
    },
    title: 'kuaishou',
    url: 'https://www.kuaishou.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.tencentVideo}`,
      type: 'svg',
    },
    title: 'tencent_video',
    url: 'https://v.qq.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.mangotv}`,
      type: 'svg',
    },
    title: 'mango_tv',
    url: 'https://www.mgtv.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.pptv}`,
      type: 'svg',
    },
    title: 'pptv',
    url: 'https://www.pptv.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.netEaseCloud}`,
      type: 'svg',
    },
    title: 'net_ease_cloud',
    url: 'https://music.163.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.tencentMusic}`,
      type: 'svg',
    },
    title: 'tencent_music',
    url: 'https://music.qq.com',
    jumpMethod: 'remote',
  },
];

export default MEDIA_APPS;
