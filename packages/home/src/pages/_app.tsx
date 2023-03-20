import React from 'react';
import { InitializeProvider, LanguageProvider, ThemeProvider } from '../context';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InitializeProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </LanguageProvider>
    </InitializeProvider>
  );
}
