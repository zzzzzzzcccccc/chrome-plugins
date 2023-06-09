import React from 'react';
import { Box } from '@mui/material';
import AppHead from '../app-head';
import AppContainer from '../app-container';
import AppFooter from '../app-footer';
import Background from '../background';
import { Outlet } from 'react-router-dom';
import { useLayout, useTheme } from '../../hooks';
import AppSearch from '../app-search';
import Setting from '../setting';
import Toast from '../toast';
import ContextMenu from '../context-menu';

function Layout() {
  const { globalStyle, backgroundUrl } = useTheme();
  const { handleOnContextMenu } = useLayout();

  return (
    <>
      <Background url={backgroundUrl} />
      <Box sx={{ ...globalStyle.fc, width: '100%', height: '100%' }} onContextMenu={handleOnContextMenu}>
        <AppHead />
        <AppContainer />
        <AppFooter />
        <AppSearch />
        <Setting />
        <Outlet />
      </Box>
      <ContextMenu />
      <Toast />
    </>
  );
}

export default Layout;
