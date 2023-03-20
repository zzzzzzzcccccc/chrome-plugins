import React, { createContext, useState, useEffect } from 'react';
import { getQueryVariable } from '@chrome-plugin/common';
import { http } from '../../common';

export interface IInitializeContext {
  loaded: boolean;
  renderType: 'popup' | 'full';
  updateContext: (payload: InitializeProviderContext) => InitializeProviderContext | null;
}

export type InitializeProviderContext = Omit<IInitializeContext, 'updateContext'>;

const initialContext: IInitializeContext = {
  loaded: false,
  renderType: 'full',
  updateContext: () => null,
};

export const InitializeContext = createContext(initialContext);

export default function InitializeProvider(props: { children?: React.ReactNode }) {
  const [context, setContext] = useState<InitializeProviderContext>({
    loaded: false,
    renderType: 'full',
  });

  const updateContext = (payload: Partial<InitializeProviderContext>) => {
    const current = payload;
    setContext((prev) => {
      return { ...prev, ...payload };
    });
    return current as InitializeProviderContext;
  };

  useEffect(() => {
    const mounted = () => {
      const renderType = getQueryVariable<IInitializeContext['renderType']>('render_type');
      http.initialize();
      updateContext({ loaded: true, renderType: renderType || 'full' });
    };

    mounted();
  }, []);

  return (
    <InitializeContext.Provider value={{ ...context, updateContext }}>
      {context.loaded ? props.children : null}
    </InitializeContext.Provider>
  );
}
