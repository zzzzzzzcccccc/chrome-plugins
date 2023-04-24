import React from 'react';
import { Box, Container } from '@mui/material';
import Develop from './develop';
import { useTheme } from '../../hooks';

function AppContainer() {
  const { globalStyle } = useTheme();

  const containers = [Develop];

  return (
    <Box sx={{ flex: 1, width: '100%', ...globalStyle.fr, flexWrap: 'nowrap' }}>
      {containers.map((Component, index) => (
        <Box key={index} sx={{ width: '100%', height: '100%' }}>
          <Container sx={{ ...globalStyle.fr, flexWrap: 'wrap' }}>
            <Component />
          </Container>
        </Box>
      ))}
    </Box>
  );
}

export default AppContainer;
