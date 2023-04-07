import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/app-slice';

export default combineReducers({
  app: appReducer,
});
