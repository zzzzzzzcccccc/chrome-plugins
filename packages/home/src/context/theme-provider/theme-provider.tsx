import React, { createContext, useState, useContext, useMemo } from 'react';
import { lightTheme, darkTheme, themeMapper } from './config';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider as MThemeProvider, Theme as MTheme } from '@mui/material/styles';
import GlobalStyles from '../../styles/global-styles';

export type ThemeConfig = MTheme;

export interface IThemeContext {
  mode: 'light' | 'dark' | 'system';
  theme: ThemeConfig;
  updateTheme: (payload: IThemeContext['mode']) => void;
}

const initialContext: IThemeContext = {
  mode: 'system',
  theme: lightTheme,
  updateTheme: () => console.warn('please using ThemeProvider first!!!'),
};

const ThemeContext = createContext(initialContext);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider(props: { children?: React.ReactNode }) {
  const [mode, setMode] = useState<IThemeContext['mode']>(initialContext.mode);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const updateTheme = (payload: IThemeContext['mode']) => setMode(payload);

  const theme = useMemo(() => {
    return mode === 'system' ? (prefersDarkMode ? darkTheme : lightTheme) : themeMapper[mode];
  }, [mode, prefersDarkMode]);

  const value = {
    mode,
    theme,
    updateTheme,
  };

  return (
    <>
      <GlobalStyles />
      <ThemeContext.Provider value={value}>
        <MThemeProvider theme={theme}>{props.children}</MThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
