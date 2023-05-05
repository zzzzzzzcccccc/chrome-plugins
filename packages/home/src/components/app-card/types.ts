import React from 'react';

export interface AppCardProps {
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  icon: {
    target: string;
    type: 'svg' | 'image';
    style?: React.CSSProperties;
    className?: string;
  };
}
