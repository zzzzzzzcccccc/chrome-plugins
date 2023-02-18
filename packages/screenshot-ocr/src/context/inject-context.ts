import{ createContext, useContext } from 'react';
import { ChromeTab } from '@chrome-plugin/common';

export interface IInjectContext {
  target: HTMLDivElement | null,
  tab: ChromeTab | null;
}

const initialContext: IInjectContext = {
  target: null,
  tab: null,
}

export const InjectContext = createContext(initialContext);

export const useInjectContext = () => {
  return useContext(InjectContext)
}
