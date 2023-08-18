import React, { useState, useEffect } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import routers from './routers';
import { createHashHistory } from 'history';
import { useStoreDispatch } from '../../hooks';
import { setAppState } from '../../store/slices/app-slice';

const history = typeof window !== 'undefined' ? createHashHistory() : null;

export default function App() {
  const [update, setUpdate] = useState({ location: history!.location, action: history!.action });
  const dispatch = useStoreDispatch();

  useEffect(() => {
    history?.listen((update) => {
      setUpdate(update);
      dispatch(setAppState({ lastPathname: update.location.pathname }));
    });
  }, [dispatch]);

  return (
    <Router location={update.location} navigationType={update.action} navigator={history!}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routers.map((record) => (
            <Route key={record.path} path={record.path} element={record.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
