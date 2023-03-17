import { ThemeConfig } from './theme-provider';
import { createTheme } from '@mui/material/styles';

export const lightTheme: ThemeConfig = createTheme({});

export const darkTheme: ThemeConfig = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const themeMapper = {
  light: lightTheme,
  dark: darkTheme,
};
