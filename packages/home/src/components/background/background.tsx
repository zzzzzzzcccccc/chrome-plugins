import React from 'react';
import { Box } from '@mui/material';
import { BackgroundProps } from './types';

function Background(props: BackgroundProps) {
  const { url } = props;
  return (
    <Box
      sx={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
      }}
    />
  );
}

export default Background;
