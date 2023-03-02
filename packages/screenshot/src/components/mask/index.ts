import React from 'react';
import Mask from './mask';

export interface MaskProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default Mask;
