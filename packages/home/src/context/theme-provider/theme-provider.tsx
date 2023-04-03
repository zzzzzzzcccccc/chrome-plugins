import React, { createContext, useState, useMemo } from 'react';
import { lightTheme, darkTheme, themeMapper, globalStyle } from './config';
import { useMediaQuery, CssBaseline } from '@mui/material';
import { ThemeProvider as MThemeProvider, Theme as MTheme } from '@mui/material/styles';
import GlobalStyles from './global-styles';
import { useInitialize } from '../../hooks';
import { storage } from '../../utils';
import { SESSION_KEYS } from '../../constants';

export type ThemeConfig = MTheme;
export type GlobalStyle = Record<string, React.CSSProperties>;

export interface IThemeContext {
  mode: 'light' | 'dark' | 'system';
  theme: ThemeConfig;
  updateTheme: (payload: IThemeContext['mode']) => void;
  globalStyle: GlobalStyle;
  isDark: boolean;
}

const initialContext: IThemeContext = {
  mode: 'system',
  theme: lightTheme,
  updateTheme: () => console.warn('please using ThemeProvider first!!!'),
  globalStyle: {},
  isDark: false,
};

export const ThemeContext = createContext(initialContext);

export default function ThemeProvider(props: { children?: React.ReactNode }) {
  const { renderType } = useInitialize();
  const [mode, setMode] = useState<IThemeContext['mode']>(
    storage.get<IThemeContext['mode']>(SESSION_KEYS.theme) || initialContext.mode,
  );
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const updateTheme = (payload: IThemeContext['mode']) => {
    storage.set<IThemeContext['mode']>(SESSION_KEYS.theme, payload);
    setMode(payload);
  };

  const theme = useMemo(() => {
    return mode === 'system' ? (prefersDarkMode ? darkTheme : lightTheme) : themeMapper[mode];
  }, [mode, prefersDarkMode]);

  const isDark = useMemo(() => {
    return mode === 'system' ? prefersDarkMode : mode === 'dark';
  }, [mode, prefersDarkMode]);

  const value = {
    mode,
    theme,
    updateTheme,
    globalStyle,
    isDark,
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles renderType={renderType} />
      <ThemeContext.Provider value={value}>
        <MThemeProvider theme={theme}>{props.children}</MThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
