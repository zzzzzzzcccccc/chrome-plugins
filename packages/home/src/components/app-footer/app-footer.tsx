import React from 'react';
import { Box, Divider } from '@mui/material';
import Menus from './menus';
import MoreActions from './more-actions';
import { useTheme } from '../../hooks';

function AppFooter() {
  const { globalStyle } = useTheme();

  return (
    <Box sx={{ width: '100%', ...globalStyle.fcc }}>
      <Box sx={{ ...globalStyle.glass, borderRadius: 4, p: 1, ...globalStyle.frc }}>
        <Menus />
        <Divider sx={{ ml: 1, mr: 1 }} orientation="vertical" flexItem />
        <MoreActions />
      </Box>
    </Box>
  );
}

export default AppFooter;
