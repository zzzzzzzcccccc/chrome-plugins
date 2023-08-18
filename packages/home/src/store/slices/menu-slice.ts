import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppCardProps } from '../../components/app-card';
import { SVGS } from '../../constants';

export interface AppItem {
  title: string;
  icon: AppCardProps['icon'];
  url: string;
  jumpMethod: 'internal' | 'remote';
  parentId: string;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: AppCardProps['icon'];
}

export interface MenuState {
  active: string;
  list: MenuItem[];
  apps: AppItem[];
}

const initialState: MenuState = {
  active: SVGS.develop,
  list: [],
  apps: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<MenuState['active']>) => {
      state.active = action.payload;
    },
    addMenu: (state, action: PayloadAction<{ item: MenuItem; type?: 'push' | 'unshift' }>) => {
      const { type = 'push', item } = action.payload;
      state.list[type](item);
    },
    removeMenu: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.list = state.list.filter((record) => record.id !== id);
      state.apps = state.apps.filter((record) => record.parentId !== id);
    },
    addRemoteApp: (state, action: PayloadAction<{ item: Omit<AppItem, 'jumpMethod'>; type?: 'push' | 'unshift' }>) => {
      const { item, type = 'push' } = action.payload;
      state.apps[type]({ ...item, jumpMethod: 'remote' });
    },
    removeRemoteApp: (state, action: PayloadAction<{ url: string }>) => {
      const { url } = action.payload;
      state.apps = state.apps.filter((record) => record.url !== url);
    },
  },
});

export const { setActive, addMenu, removeMenu, addRemoteApp, removeRemoteApp } = menuSlice.actions;

export default menuSlice.reducer;
