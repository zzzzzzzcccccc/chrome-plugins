import appReducer from './slices/app-slice';
import feedbackReducer from './slices/feedback-slice';
import menuReducer from './slices/menu-slice';

const reducers = {
  app: appReducer,
  feedback: feedbackReducer,
  menu: menuReducer,
};

export { reducers };
