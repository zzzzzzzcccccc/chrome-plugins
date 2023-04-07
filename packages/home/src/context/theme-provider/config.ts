import { ThemeConfig, GlobalStyle } from './theme-provider';
import { createTheme } from '@mui/material/styles';
import { deepOrange, cyan, indigo, teal } from '@mui/material/colors';

export const lightTheme: ThemeConfig = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: indigo[500],
    },
  },
});

export const darkTheme: ThemeConfig = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: teal[500],
    },
  },
});

export const globalStyle: GlobalStyle = {
  fr: {
    display: 'flex',
    flexDirection: 'row',
  },
  frc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fc: {
    display: 'flex',
    flexDirection: 'column',
  },
  fcc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ttn: {
    textTransform: 'none',
  },
};

export const themeMapper = {
  light: lightTheme,
  dark: darkTheme,
};
