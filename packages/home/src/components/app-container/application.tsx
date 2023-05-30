import React from 'react';
import { ApplicationProps } from './types';
import AppCard from '../app-card';
import { useTheme, useTranslation, useAppNavigate } from '../../hooks';
import { AppItem } from '../../store/slices/menu-slice';

function Application(props: ApplicationProps) {
  const { apps } = props;
  const t = useTranslation();
  const { appJump } = useAppNavigate();
  const { appSize } = useTheme();

  const handleOnClick = (app: AppItem) => () => {
    appJump(app.url, app.jumpMethod);
  };

  return (
    <>
      {apps.map((app, index) => {
        return (
          <AppCard
            onClick={handleOnClick(app)}
            key={index}
            icon={{ ...app.icon, style: { width: appSize, height: appSize } }}
            title={t(app.title) as string}
          />
        );
      })}
    </>
  );
}

export default Application;
