import React from 'react';
import { Develop } from '../components';
import { GridLG, GridMD, GridSM, GridXS } from './grid-model';

export interface CardItem {
  render: () => React.ReactNode;
  item: boolean;
  lg?: GridLG;
  md?: GridMD;
  sm?: GridSM;
  xs?: GridXS;
}

export const cards: CardItem[] = [
  {
    render: () => <Develop />,
    item: true,
    lg: 4,
    md: 6,
    sm: 12,
    xs: 12,
  },
];
