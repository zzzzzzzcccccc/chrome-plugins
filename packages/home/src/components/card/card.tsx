import React from 'react';
import { CardProps } from './types';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '../../hooks';

export default function Card(props: CardProps) {
  const { children, title } = props;

  const { globalStyle } = useTheme();

  return (
    <Paper sx={{ ...globalStyle.fcc, p: 1 }}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
