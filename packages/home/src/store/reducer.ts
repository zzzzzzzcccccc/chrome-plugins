import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/app-slice';
import feedbackReducer from './slices/feedback-slice';

export default combineReducers({
  app: appReducer,
  feedback: feedbackReducer,
});
