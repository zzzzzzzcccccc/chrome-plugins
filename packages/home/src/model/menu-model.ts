import React from 'react';

export interface Menu {
  path: string;
  svg: {
    id: string;
    style?: React.CSSProperties;
  };
  title?: React.ReactNode;
}
