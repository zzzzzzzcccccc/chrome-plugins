import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import routers from './routers';

export default function App() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        {routers.map((record) => (
          <Route key={record.path} path={record.path} element={record.element} />
        ))}
      </Route>
    </Routes>
  );
}
