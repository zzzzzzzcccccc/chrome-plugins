import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { SVGProvider } from '../components';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <SVGProvider />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
