import React from 'react';

export interface AppIconProps {
  className?: string;
  style?: React.CSSProperties;
  target: string;
  type: 'svg' | 'image';
  width?: number;
  height?: number;
}
