import React, { createContext, useState, useMemo } from 'react';
import { globalStyle, primaryColorMapper } from './config';
import { useMediaQuery, CssBaseline } from '@mui/material';
import { ThemeProvider as MThemeProvider, createTheme, Theme } from '@mui/material/styles';
import GlobalStyles from './global-styles';
import { useInitialize } from '../../hooks';
import { storage } from '../../utils';
import { SESSION_KEYS } from '../../constants';

export interface IThemeContext {
  mode: 'light' | 'dark' | 'system';
  primaryColorMapper: Record<string, Record<string, string>>;
  colorRange: string;
  primaryColor: string;
  globalStyle: typeof globalStyle;
  isDark: boolean;
  theme: Theme;
  appSize: number;
  updateConfiguration: (payload: Partial<Configuration>) => void;
}

const initialContext: IThemeContext = {
  mode: 'system',
  primaryColorMapper,
  colorRange: '600',
  primaryColor: 'deepOrange',
  globalStyle,
  isDark: false,
  theme: createTheme(),
  appSize: 48,
  updateConfiguration: () => console.warn('please using ThemeProvider first!!!'),
};

export const ThemeContext = createContext(initialContext);

type Configuration = Pick<IThemeContext, 'mode' | 'colorRange' | 'primaryColor' | 'appSize'>;

export default function ThemeProvider(props: { children?: React.ReactNode }) {
  const { renderType } = useInitialize();

  const configurationStorage = storage.get<Configuration>(SESSION_KEYS.theme);

  const [configuration, setConfiguration] = useState<Configuration>({
    mode: configurationStorage?.mode || initialContext.mode,
    colorRange: configurationStorage?.colorRange || initialContext.colorRange,
    primaryColor: configurationStorage?.primaryColor || initialContext.primaryColor,
    appSize: configurationStorage?.appSize || initialContext.appSize,
  });

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const isDark = useMemo(() => {
    return configuration.mode === 'system' ? prefersDarkMode : configuration.mode === 'dark';
  }, [configuration.mode, prefersDarkMode]);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: initialContext.primaryColorMapper[configuration.primaryColor][configuration.colorRange],
        },
      },
    });
  }, [configuration.primaryColor, configuration.colorRange, isDark]);

  const convertGlobalStyle = useMemo(
    () => ({
      ...globalStyle,
      glass: {
        ...globalStyle.glass,
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
      },
    }),
    [isDark],
  );

  const updateConfiguration = (payload: Partial<Configuration>) => {
    setConfiguration((pre) => {
      const current = { ...pre, ...payload };
      storage.set(SESSION_KEYS.theme, current);
      return current;
    });
  };

  const value = {
    theme,
    globalStyle: convertGlobalStyle,
    isDark,
    primaryColorMapper: initialContext.primaryColorMapper,
    ...configuration,
    updateConfiguration,
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles renderType={renderType} isDark={isDark} />
      <ThemeContext.Provider value={value}>
        <MThemeProvider theme={theme}>{props.children}</MThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
