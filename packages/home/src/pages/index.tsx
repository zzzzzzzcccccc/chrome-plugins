import React from 'react';
import Script from 'next/script';
import { BASE_SASS_LIB_URL } from '../constants';
import { Head, App } from '../components';

export default function Home() {
  return (
    <>
      <Head />
      <App />
      <Script type="text/javascript" src={BASE_SASS_LIB_URL} defer />
    </>
  );
}
