import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppCardProps } from '../../components/app-card';
import { SVGS } from '../../constants';

export interface AppItem {
  title: string;
  icon: AppCardProps['icon'];
  url: string;
  jumpMethod: 'internal' | 'remote';
}

export interface MenuItem {
  id: string;
  title: string;
  apps: AppItem[];
  icon: AppCardProps['icon'];
}

export interface MenuState {
  active: string;
  list: MenuItem[];
}

const initialState: MenuState = {
  active: SVGS.develop,
  list: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<MenuState['active']>) => {
      state.active = action.payload;
    },
    addMenu: (state, action: PayloadAction<{ item: Omit<MenuItem, 'apps'>; type?: 'push' | 'unshift' }>) => {
      const { type = 'push', item } = action.payload;
      state.list[type]({ ...item, apps: [] });
    },
    removeMenu: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.list = state.list.filter((record) => record.id !== id);
    },
    addRemoteApp: (
      state,
      action: PayloadAction<{ item: Omit<AppItem, 'jumpMethod'>; id: string; type?: 'push' | 'unshift' }>,
    ) => {
      const { id, item, type = 'push' } = action.payload;
      if (state.list.map((i) => i.id).indexOf(id) === -1) {
        return;
      }
      state.list = state.list.map((record) => {
        if (record.id === id) {
          record.apps[type]({ ...item, jumpMethod: 'remote' });
        }
        return record;
      });
    },
    removeRemoteApp: (state, action: PayloadAction<{ id: string; url: string }>) => {
      const { id, url } = action.payload;
      state.list = state.list.map((record) => {
        if (record.id === id) {
          record.apps = record.apps.filter((app) => app.url !== url);
        }
        return record;
      });
    },
  },
});

export const { setActive, addMenu, removeMenu, addRemoteApp, removeRemoteApp } = menuSlice.actions;

export default menuSlice.reducer;
