import appReducer from './slices/app-slice';
import feedbackReducer from './slices/feedback-slice';
import menuReducer from './slices/menu-slice';
import musicReducer from './slices/music-slice';

const reducers = {
  app: appReducer,
  feedback: feedbackReducer,
  menu: menuReducer,
  music: musicReducer,
};

export { reducers };
