import React from 'react';
import useAppNavigate from './use-app-navigate';
import useTranslation from './use-translation';
import useTheme from './use-theme';
import { AppCardProps } from '../components/app-card';
import { ICONS } from '../constants';

export interface AppItem {
  title: string;
  icon: AppCardProps['icon'];
  url?: string;
  onClick?: () => void;
}

export function useDevelopApps(): AppItem[] {
  const t = useTranslation();
  const {
    toJsonEditor,
    toBase64Editor,
    toStringEditor,
    toHTMLToJSXEditor,
    toMD5Editor,
    toAESEditor,
    toSHAEditor,
    toRabbitEditor,
    toReadFile,
  } = useAppNavigate();
  const { appSize } = useTheme();

  const iconStyle: React.CSSProperties = {
    width: appSize,
    height: appSize,
  };

  return [
    {
      icon: {
        target: '#json',
        type: 'svg',
        style: iconStyle,
      },
      title: t('develop.json_editor'),
      onClick: toJsonEditor,
    },
    {
      icon: {
        target: ICONS.base64,
        type: 'image',
        style: iconStyle,
      },
      title: t('develop.base64'),
      onClick: toBase64Editor,
    },
    {
      icon: {
        target: '#string',
        type: 'svg',
        style: iconStyle,
      },
      title: t('develop.string'),
      onClick: toStringEditor,
    },
    {
      icon: {
        target: '#html',
        type: 'svg',
        style: iconStyle,
      },
      title: t('develop.html_to_jsx'),
      onClick: toHTMLToJSXEditor,
    },
    {
      icon: {
        target: ICONS.md5,
        type: 'image',
        style: iconStyle,
      },
      title: t('develop.md5'),
      onClick: toMD5Editor,
    },
    {
      icon: {
        target: ICONS.aes,
        type: 'image',
        style: iconStyle,
      },
      title: t('develop.aes'),
      onClick: toAESEditor,
    },
    {
      icon: {
        target: ICONS.sha,
        type: 'image',
        style: iconStyle,
      },
      title: t('develop.sha'),
      onClick: toSHAEditor,
    },
    {
      icon: {
        target: '#rabbit',
        type: 'svg',
        style: iconStyle,
      },
      title: t('develop.rabbit'),
      onClick: toRabbitEditor,
    },
    {
      icon: {
        target: '#readFile',
        type: 'svg',
        style: iconStyle,
      },
      title: t('develop.read_file'),
      onClick: toReadFile,
    },
  ];
}
