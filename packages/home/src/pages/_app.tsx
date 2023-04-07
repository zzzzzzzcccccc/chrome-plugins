import React from 'react';
import { StoreProvider, InitializeProvider, LanguageProvider, ThemeProvider } from '../context';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InitializeProvider>
      <StoreProvider>
        <LanguageProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </LanguageProvider>
      </StoreProvider>
    </InitializeProvider>
  );
}
