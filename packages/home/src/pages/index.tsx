import React from 'react';
import Script from 'next/script';
import { BASE_SASS_LIB_URL } from '../constants';
import { Head, App } from '../components';
import { HashRouter } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Head />
      <HashRouter>
        <App />
      </HashRouter>
      <Script type="text/javascript" src={BASE_SASS_LIB_URL} defer />
    </>
  );
}
