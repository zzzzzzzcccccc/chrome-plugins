import React from 'react';
import { Head, App } from '../components';
import { HashRouter } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Head />
      <HashRouter>
        <App />
      </HashRouter>
    </>
  );
}
