import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/app-slice';
import feedbackReducer from './slices/feedback-slice';
import menuReducer from './slices/menu-slice';

export default combineReducers({
  app: appReducer,
  feedback: feedbackReducer,
  menu: menuReducer,
});
