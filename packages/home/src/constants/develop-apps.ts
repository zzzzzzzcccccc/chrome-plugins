import { AppItem } from '../store/slices/menu-slice';
import ICONS from './icons';
import SVGS from './svgs';

const DEVELOP_APPS: AppItem[] = [
  {
    icon: {
      target: `#${SVGS.github}`,
      type: 'svg',
    },
    title: 'github',
    url: 'https://github.com',
    jumpMethod: 'remote',
  },
  {
    icon: {
      target: `#${SVGS.json}`,
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
      target: `#${SVGS.string}`,
      type: 'svg',
    },
    title: 'develop.string',
    url: '/string-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: `#${SVGS.html}`,
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
      target: `#${SVGS.rabbit}`,
      type: 'svg',
    },
    title: 'develop.rabbit',
    url: '/rabbit-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: `#${SVGS.readFile}`,
      type: 'svg',
    },
    title: 'develop.read_file',
    url: '/read-file',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: `#${SVGS.yaml}`,
      type: 'svg',
    },
    title: 'develop.json_yaml_editor',
    url: '/json-yaml-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: `#${SVGS.xml}`,
      type: 'svg',
    },
    title: 'develop.xml_json_editor',
    url: '/xml-json-editor',
    jumpMethod: 'internal',
  },
  {
    icon: {
      target: `#${SVGS.url}`,
      type: 'svg',
    },
    title: 'develop.url_parse',
    url: 'url-parse',
    jumpMethod: 'internal',
  },
];

export default DEVELOP_APPS;
