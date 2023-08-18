import React from 'react';

export interface AppCardProps {
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
  menus?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  icon: {
    target: string;
    type: 'svg' | 'image';
    style?: React.CSSProperties;
    className?: string;
  };
  style?: React.CSSProperties;
  enableTab?: boolean;
}
