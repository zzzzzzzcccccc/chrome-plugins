import React from 'react';
import { IconButton, Box } from '@mui/material';
import Card from '../card';
import JsonEditor from '../json-editor';
import { useTheme, useDrawer } from '../../hooks';

export default function Develop() {
  const { theme } = useTheme();
  const { updateData, open } = useDrawer();

  const showJsonEditor = () => {
    updateData({
      title: 'hello world',
      children: <JsonEditor />,
    });
    open();
  };

  return (
    <Card value="Develop">
      <Box>
        <IconButton onClick={showJsonEditor}>
          <svg style={{ width: 48, height: 48, color: theme.palette.primary.main }}>
            <use xlinkHref="#json" />
          </svg>
        </IconButton>
      </Box>
    </Card>
  );
}
