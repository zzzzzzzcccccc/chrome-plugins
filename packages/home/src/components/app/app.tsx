import React from 'react';
import AppHead from '../app-head';
import { Grid, Box } from '@mui/material';
import { cards } from '../../model/card-model';
import { useLocation, Routes, Outlet, Route } from 'react-router-dom';
import Setting from '../setting';
import JsonEditor from '../json-editor';
import Base64Editor from '../base64-editor';
import StringEditor from '../string-editor';
import HTMLToJSXEditor from '../html-to-jsx-editor';

function Layout() {
  return (
    <>
      <AppHead />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {cards.map((card, index) => {
            const { render, ...props } = card;
            return (
              <Grid key={index} {...props}>
                {render()}
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Outlet />
    </>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        <Route path="setting" element={<Setting />} />
        <Route path="json-editor" element={<JsonEditor />} />
        <Route path="base64-editor" element={<Base64Editor />} />
        <Route path="string-editor" element={<StringEditor />} />
        <Route path="html-to-jsx-editor" element={<HTMLToJSXEditor />} />
      </Route>
    </Routes>
  );
}
