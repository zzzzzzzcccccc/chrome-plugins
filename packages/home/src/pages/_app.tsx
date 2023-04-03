import React from 'react';
import { InitializeProvider, LanguageProvider, ThemeProvider, DrawerProvider } from '../context';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InitializeProvider>
      <LanguageProvider>
        <ThemeProvider>
          <DrawerProvider>
            <Component {...pageProps} />
          </DrawerProvider>
        </ThemeProvider>
      </LanguageProvider>
    </InitializeProvider>
  );
}
