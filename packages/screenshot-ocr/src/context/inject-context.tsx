import React, { createContext, useContext, useState } from 'react';
import { ChromeTab } from '@chrome-plugin/common';

export interface IInjectContext {
  target: HTMLDivElement | null;
  shadowRoot: ShadowRoot | null;
  tab: ChromeTab | null;
  remove?: () => void;
  moving?: boolean;
  moveEnd?: boolean;
  updateContext?: (payload: Partial<Omit<IInjectContext, 'updateContext'>>) => void;
}

const initialContext: IInjectContext = {
  target: null,
  shadowRoot: null,
  tab: null,
  moving: false,
  moveEnd: false,
};

export const InjectContext = createContext(initialContext);

export const useInjectContext = () => {
  return useContext(InjectContext);
};

export function InjectContextProvider(props: Omit<IInjectContext, 'updateContext'> & { children?: React.ReactNode }) {
  const { children, ...defaultContext } = props;
  const [context, setContext] = useState(defaultContext);

  const updateContext = (payload: Partial<Omit<IInjectContext, 'updateContext'>>) => {
    setContext((prev) => ({
      ...prev,
      ...payload,
    }));
  };

  return <InjectContext.Provider value={{ ...context, updateContext }}>{children}</InjectContext.Provider>;
}
