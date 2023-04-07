import { configureStore, Middleware } from '@reduxjs/toolkit';

import combinedReducers from './reducer';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  middlewares.push(
    createLogger({
      collapsed: true,
    }),
  );
}

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
});
