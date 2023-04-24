import React from 'react';
import { Head, App, Background } from '../components';
import { HashRouter } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Head />
      <HashRouter>
        <Background url="./images/bg.jpg" />
        <App />
      </HashRouter>
    </>
  );
}
