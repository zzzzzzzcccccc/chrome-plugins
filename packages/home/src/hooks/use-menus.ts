import { useStoreSelector } from './use-store';
import { DEFAULT_APP_LIST, DEFAULT_MENU_LIST } from '../constants';
import { setActive } from '../store/slices/menu-slice';

export default function useMenus() {
  const { list: storeList, active, apps: storeApps } = useStoreSelector((state) => state.menu);
  const list = [...DEFAULT_MENU_LIST, ...storeList];
  const apps = [...DEFAULT_APP_LIST, ...storeApps];

  return {
    active,
    list,
    apps,
    setActive,
  };
}
