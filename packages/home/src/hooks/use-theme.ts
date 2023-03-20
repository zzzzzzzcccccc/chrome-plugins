import { useContext } from 'react';
import { ThemeContext } from '../context';

export default function useTheme() {
  return useContext(ThemeContext);
}
