import { useContext } from 'react';
import { DrawerContext } from '../context';

export default function useDrawer() {
  return useContext(DrawerContext);
}
