import React from 'react';
import { useAppNavigate, useTranslation } from '../../hooks';
import { AppCardProps } from '../app-card';

export interface AppItem {
  title: string;
  icon: AppCardProps['icon'];
  url?: string;
  onClick?: () => void;
}

const iconStyle: React.CSSProperties = {
  width: 48,
  height: 48,
};

export function useDevelopApps(): AppItem[] {
  const t = useTranslation();
  const { toJsonEditor, toBase64Editor, toStringEditor, toHTMLToJSXEditor } = useAppNavigate();

  return [
    {
      icon: {
        target: '#develop',
        type: 'svg',
        style: iconStyle,
      },
      title: t('develop.json_editor'),
      onClick: toJsonEditor,
    },
    {
      icon: {
        target: '#base64',
        type: 'svg',
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
  ];
}
