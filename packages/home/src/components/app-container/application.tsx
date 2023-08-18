import React from 'react';
import { ApplicationProps } from './types';
import { Container, MenuItem } from '@mui/material';
import AppCard from '../app-card';
import { useTheme, useTranslation, useAppNavigate, useStoreDispatch, useToast } from '../../hooks';
import { AppItem, removeRemoteApp } from '../../store/slices/menu-slice';
import { DEFAULT_APP_LIST } from '../../constants';

const Application = (props: ApplicationProps) => {
  const { apps, enableTab, id } = props;
  const t = useTranslation();
  const dispatch = useStoreDispatch();
  const { show } = useToast();
  const { appJump } = useAppNavigate();
  const { appSize, globalStyle } = useTheme();

  const handleOnClick =
    (app: AppItem) => (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      event.stopPropagation();
      appJump(app.url, app.jumpMethod);
    };

  const handleOnMenuClick = (app: AppItem, callback?: () => void) => (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    callback?.();
  };

  const handleOnDeleteApp = (app: AppItem) => {
    dispatch(removeRemoteApp({ id, url: app.url }));
    show({
      message: t('delete_success'),
      type: 'success',
    });
  };

  const getMenus = (app: AppItem) => {
    if (DEFAULT_APP_LIST.map((i) => i.url).indexOf(app.url) > -1) {
      return null;
    }
    return [
      {
        key: 'delete',
        handler: () => handleOnDeleteApp(app),
      },
    ].map((item) => (
      <MenuItem onClick={handleOnMenuClick(app, item.handler)} key={item.key}>
        {t(item.key)}
      </MenuItem>
    ));
  };

  return (
    <Container sx={{ ...globalStyle.fr, flexWrap: 'wrap' }}>
      {apps.map((app) => {
        return (
          <AppCard
            enableTab={enableTab}
            key={app.url}
            onClick={handleOnClick(app)}
            icon={{ ...app.icon, style: { width: appSize, height: appSize } }}
            title={t(app.title) as string}
            menus={getMenus(app)}
          />
        );
      })}
    </Container>
  );
};

export default Application;
