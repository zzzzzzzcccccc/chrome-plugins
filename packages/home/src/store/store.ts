import { configureStore, Middleware, combineReducers, Reducer } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { reducers } from './reducer';
import { SESSION_KEYS } from '../constants';

export type PersistConfiguration = Record<string, { config?: PersistConfig<any>; reducer: Reducer }>;

const isServer = typeof window === 'undefined';
const isDevelopment = process?.env?.NODE_ENV === 'development';
const createNoopStorage = {
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: any, value: any) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
};
const middlewares: Middleware[] = [];
const persistConfig: PersistConfiguration = {
  app: {
    config: {
      version: 1,
      key: `${SESSION_KEYS.store}:app`,
      storage: isServer ? createNoopStorage : createWebStorage('local'),
      blacklist: [
        'readFile',
        'openSetting',
        'openSearch',
        'openCollectWebsiteForm',
        'activeSetting',
        'contextMenu',
        'activeBrowserTab',
      ],
    },
    reducer: reducers.app,
  },
  feedback: {
    reducer: reducers.feedback,
  },
  menu: {
    config: {
      version: 1,
      key: `${SESSION_KEYS.store}:menu`,
      storage: isServer ? createNoopStorage : createWebStorage('local'),
      blacklist: [],
    },
    reducer: reducers.menu,
  },
};

if (!isServer && isDevelopment) {
  middlewares.push(
    require('redux-logger').createLogger({
      collapsed: true,
    }),
  );
}

export const store = configureStore({
  reducer: combineReducers(
    Object.keys(persistConfig).reduce((acc, key) => {
      const configuration = persistConfig[key];
      if (configuration.config) {
        acc[key] = persistReducer(configuration.config, configuration.reducer);
      } else {
        acc[key] = configuration.reducer;
      }
      return acc;
    }, {} as Record<string, Reducer>),
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
  devTools: !isServer && isDevelopment,
});

export const persist = persistStore(store);
