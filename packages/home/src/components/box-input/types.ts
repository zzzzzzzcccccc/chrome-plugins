import React from 'react';
import { BoxProps } from '@mui/material';

export interface BoxInputProps {
  children?: React.ReactNode;
  value?: string;
  onChange?: (v: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultEdit?: boolean;
  boxProps?: BoxProps;
  placeholder?: string;
  readonly?: boolean;
}
