import React from 'react';
import { PopperProps } from '@mui/material';

export interface WithPopperProps {
  children: React.ReactElement;
  extra: React.ReactElement;
  popperProps?: PopperProps;
}
