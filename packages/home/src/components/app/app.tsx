import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Setting from '../setting';
import JsonEditor from '../json-editor';
import Base64Editor from '../base64-editor';
import StringEditor from '../string-editor';
import HTMLToJSXEditor from '../html-to-jsx-editor';

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
