import React from 'react';

export interface AppCardProps {
  title?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  icon: {
    target: string;
    type: 'svg';
    style?: React.CSSProperties;
    className?: string;
  };
}
