import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import { http } from '../../common';
import { Keyboard, KeyCode, getPlatform, getQueryVariable } from '../../utils';

export interface IInitializeContext {
  loaded: boolean;
  renderType: 'popup' | 'full';
  platform: string;
  isMac: boolean;
  updateContext: (payload: InitializeProviderContext) => InitializeProviderContext | null;
  pushKeyboardHandler: (cb: (keyCode: KeyCode, event: KeyboardEvent) => void) => void;
  removeKeyboardHandler: (cb: (keyCode: KeyCode, event: KeyboardEvent) => void) => void;
}

export type InitializeProviderContext = Omit<
  IInitializeContext,
  'updateContext' | 'pushKeyboardHandler' | 'removeKeyboardHandler'
>;

const initialContext: IInitializeContext = {
  loaded: false,
  renderType: 'full',
  platform: 'unknown',
  isMac: false,
  updateContext: () => null,
  pushKeyboardHandler: () => null,
  removeKeyboardHandler: () => null,
};

export const InitializeContext = createContext(initialContext);

export default function InitializeProvider(props: { children?: React.ReactNode }) {
  const [context, setContext] = useState<InitializeProviderContext>({
    loaded: initialContext.loaded,
    renderType: initialContext.renderType,
    platform: initialContext.platform,
    isMac: initialContext.isMac,
  });
  const keyboardRef = useRef<Keyboard<HTMLElement> | null>(null);

  const updateContext = (payload: Partial<InitializeProviderContext>) => {
    const current = payload;
    setContext((prev) => {
      return { ...prev, ...payload };
    });
    return current as InitializeProviderContext;
  };

  const removeKeyboardHandler = useCallback((cb: (keyCode: KeyCode, event: KeyboardEvent) => void) => {
    keyboardRef.current?.remove(cb);
  }, []);

  const pushKeyboardHandler = useCallback(
    (cb: (keyCode: KeyCode, event: KeyboardEvent) => void) => {
      keyboardRef.current?.add(cb);

      return () => {
        removeKeyboardHandler(cb);
      };
    },
    [removeKeyboardHandler],
  );

  useEffect(() => {
    const mounted = () => {
      const renderType = getQueryVariable<IInitializeContext['renderType']>('render_type');
      const platform = getPlatform();
      http.initialize();
      updateContext({ loaded: true, renderType: renderType || 'full', platform, isMac: platform === 'mac' });
    };

    mounted();
  }, []);

  useEffect(() => {
    keyboardRef.current = new Keyboard(document.body, {
      eventName: 'keydown',
      keyCodes: [
        ['meta', 's'],
        ['alt', 's'],
        ['meta', 'o'],
        ['alt', 'o'],
      ],
    });
    keyboardRef.current.start();
    return () => {
      keyboardRef.current?.stop();
    };
  }, []);

  return (
    <InitializeContext.Provider value={{ ...context, updateContext, pushKeyboardHandler, removeKeyboardHandler }}>
      {context.loaded ? props.children : null}
    </InitializeContext.Provider>
  );
}
