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

function Layout() {
  const { globalStyle } = useTheme();

  useLayout();

  return (
    <>
      <Background url="./images/bg.jpg" />
      <Box sx={{ ...globalStyle.fc, width: '100%', height: '100%' }}>
        <AppHead />
        <AppContainer />
        <AppFooter />
        <AppSearch />
        <Setting />
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
