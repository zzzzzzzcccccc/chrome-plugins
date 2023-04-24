import { ThemeConfig } from './theme-provider';
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

export const globalStyle = {
  fr: {
    display: 'flex',
    flexDirection: 'row',
  },
  frc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fc: {
    display: 'flex',
    flexDirection: 'column',
  },
  fcc: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ttn: {
    textTransform: 'none',
  },
  glass: {
    '&::before': {
      content: `''`,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      filter: 'blur(10px)',
      zIndex: -1,
    },
  },
};

export const themeMapper = {
  light: lightTheme,
  dark: darkTheme,
};
