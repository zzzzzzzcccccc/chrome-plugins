import { store, persist } from './store';
import { AppState } from './slices/app-slice';
import { FeedbackState } from './slices/feedback-slice';
import { MenuState } from './slices/menu-slice';

export type StoreState = {
  app: AppState;
  menu: MenuState;
  feedback: FeedbackState;
};
export type StoreDispatch = typeof store.dispatch;

export { persist };

export default store;
