import { useStoreSelector } from './use-store';
import { DEFAULT_MENU_LIST } from '../constants';

export default function useMenus() {
  const { list: storeList, active } = useStoreSelector((state) => state.menu);
  const list = [...DEFAULT_MENU_LIST, ...storeList];

  return {
    active,
    list,
  };
}
