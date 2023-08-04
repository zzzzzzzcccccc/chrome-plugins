import React from 'react';
import { Box } from '@mui/material';
import Menus from './menus';
import { useTheme } from '../../hooks';

function AppFooter() {
  const { globalStyle } = useTheme();

  return (
    <Box sx={{ width: '100%', ...globalStyle.fcc, pb: 2 }}>
      <Box sx={{ ...globalStyle.glass, borderRadius: 4, p: 1, ...globalStyle.frc }}>
        <Menus />
      </Box>
    </Box>
  );
}

export default AppFooter;
