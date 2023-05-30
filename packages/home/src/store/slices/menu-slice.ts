import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppCardProps } from '../../components/app-card';
import { DEVELOP_APPS, SHOP_APPS, GAME_APPS, MEDIA_APPS } from '../../constants';

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
  active: 'develop',
  list: [
    {
      id: 'develop',
      title: 'develop.title',
      icon: {
        target: '#develop',
        type: 'svg',
      },
      apps: DEVELOP_APPS,
    },
    {
      id: 'shop',
      title: 'shop.title',
      icon: {
        target: '#shop',
        type: 'svg',
      },
      apps: SHOP_APPS,
    },
    {
      id: 'game',
      title: 'game.title',
      icon: {
        target: '#game',
        type: 'svg',
      },
      apps: GAME_APPS,
    },
    {
      id: 'media',
      title: 'media.title',
      icon: {
        target: '#media',
        type: 'svg',
      },
      apps: MEDIA_APPS,
    },
  ],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<MenuState['active']>) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = menuSlice.actions;

export default menuSlice.reducer;
