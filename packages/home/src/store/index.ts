import { store, persist } from './store';
import { AppState } from './slices/app-slice';
import { FeedbackState } from './slices/feedback-slice';
import { MenuState } from './slices/menu-slice';
import { MusicState } from './slices/music-slice';

export type StoreState = {
  app: AppState;
  menu: MenuState;
  feedback: FeedbackState;
  music: MusicState;
};
export type StoreDispatch = typeof store.dispatch;

export { persist };

export default store;
