import React from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div>
        <Button>Hello world</Button>
      </div>
    </>
  );
}
