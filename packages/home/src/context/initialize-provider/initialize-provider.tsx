import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import { http } from '../../common';
import { Keyboard, KeyCode, getPlatform, getQueryVariable } from '../../utils';

export interface IInitializeContext {
  loaded: boolean;
  renderType: 'popup' | 'full';
  platform: string;
  isMac: boolean;
  isRenderPopup: boolean;
  isRenderFull: boolean;
  updateContext: (payload: InitializeProviderContext) => InitializeProviderContext | null;
  pushKeyboardHandler: (cb: (keyCode: KeyCode, event: KeyboardEvent) => void) => void;
  removeKeyboardHandler: (cb: (keyCode: KeyCode, event: KeyboardEvent) => void) => void;
  removeOnResizeHandler: (cb: () => void) => void;
  pushOnResizeHandler: (cb: () => void) => () => void;
}

export type InitializeProviderContext = Omit<
  IInitializeContext,
  'updateContext' | 'pushKeyboardHandler' | 'removeKeyboardHandler' | 'removeOnResizeHandler' | 'pushOnResizeHandler'
>;

const initialContext: IInitializeContext = {
  loaded: false,
  renderType: 'full',
  platform: 'unknown',
  isMac: false,
  isRenderPopup: false,
  isRenderFull: false,
  updateContext: () => null,
  pushKeyboardHandler: () => null,
  removeKeyboardHandler: () => null,
  removeOnResizeHandler: () => null,
  pushOnResizeHandler: () => () => null,
};

export const InitializeContext = createContext(initialContext);

export default function InitializeProvider(props: { children?: React.ReactNode }) {
  const [context, setContext] = useState<InitializeProviderContext>({
    loaded: initialContext.loaded,
    renderType: initialContext.renderType,
    platform: initialContext.platform,
    isMac: initialContext.isMac,
    isRenderPopup: initialContext.isRenderPopup,
    isRenderFull: initialContext.isRenderFull,
  });
  const keyboardRef = useRef<Keyboard<HTMLElement> | null>(null);
  const onResizeRef = useRef<(() => void)[]>([]);

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

  const removeOnResizeHandler = useCallback((cb: () => void) => {
    onResizeRef.current = onResizeRef.current.filter((item) => item !== cb);
  }, []);

  const pushOnResizeHandler = useCallback(
    (cb: () => void) => {
      if (onResizeRef.current.indexOf(cb) === -1) {
        onResizeRef.current.push(cb);
      }
      return () => removeOnResizeHandler(cb);
    },
    [removeOnResizeHandler],
  );

  useEffect(() => {
    const mounted = () => {
      const renderType = getQueryVariable<IInitializeContext['renderType']>('render_type') || 'full';
      const platform = getPlatform();
      http.initialize();
      updateContext({
        loaded: true,
        renderType,
        platform,
        isMac: platform === 'mac',
        isRenderPopup: renderType === 'popup',
        isRenderFull: renderType === 'full',
      });
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

  useEffect(() => {
    const handler = () => {
      onResizeRef.current.forEach((cb) => cb());
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return (
    <InitializeContext.Provider
      value={{
        ...context,
        updateContext,
        pushKeyboardHandler,
        removeKeyboardHandler,
        pushOnResizeHandler,
        removeOnResizeHandler,
      }}
    >
      {context.loaded ? props.children : null}
    </InitializeContext.Provider>
  );
}
