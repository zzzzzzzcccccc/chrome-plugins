import React from 'react';
import { ApplicationProps } from './types';
import { Container } from '@mui/material';
import AppCard from '../app-card';
import { useTheme, useTranslation, useAppNavigate } from '../../hooks';
import { AppItem } from '../../store/slices/menu-slice';

const Application = (props: ApplicationProps) => {
  const { apps, enableTab } = props;
  const t = useTranslation();
  const { appJump } = useAppNavigate();
  const { appSize, globalStyle } = useTheme();

  const handleOnClick =
    (app: AppItem) => (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      event.stopPropagation();
      appJump(app.url, app.jumpMethod);
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
          />
        );
      })}
    </Container>
  );
};

export default Application;
