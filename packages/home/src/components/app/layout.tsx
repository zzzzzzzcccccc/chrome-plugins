import React from 'react';
import { Box } from '@mui/material';
import AppHead from '../app-head';
import AppContainer from '../app-container';
import AppFooter from '../app-footer';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../hooks';

function Layout() {
  const { globalStyle } = useTheme();

  return (
    <Box sx={{ ...globalStyle.fc, width: '100%', height: '100%' }}>
      <AppHead />
      <AppContainer />
      <AppFooter />
      <Outlet />
    </Box>
  );
}

export default Layout;
