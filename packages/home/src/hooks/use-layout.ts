import React, { useRef, useEffect, useCallback } from 'react';
import useInitialize from './use-initialize';
import useAppNavigate from './use-app-navigate';
import { useStoreSelector, useStoreDispatch } from './use-store';
import { KeyCode } from '../utils';
import { KEYBOARD_KEYS } from '../constants';
import { setAppState, setContextMenu } from '../store/slices/app-slice';

export default function useLayout() {
  const { pushKeyboardHandler } = useInitialize();
  const { pathname, appJump, back } = useAppNavigate();
  const { openSetting, openSearch, contextMenu, lastPathname } = useStoreSelector((state) => state.app);
  const firstRenderRef = useRef(true);
  const dispatch = useStoreDispatch();

  const handleOnContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      setContextMenu({
        open: !contextMenu.open,
        x: e.clientX,
        y: e.clientY,
      }),
    );
  };

  const runLastPage = useCallback(() => {
    if (firstRenderRef.current && pathname === '/' && lastPathname !== '/') {
      appJump(lastPathname);
    }
    firstRenderRef.current = false;
  }, [pathname, lastPathname, appJump]);

  useEffect(() => {
    const handler = (keyCode: KeyCode, event: KeyboardEvent) => {
      if (Array.isArray(keyCode)) {
        switch (keyCode.join('')) {
          case KEYBOARD_KEYS.command_o:
          case KEYBOARD_KEYS.alt_o:
            event.preventDefault();
            dispatch(setAppState({ openSetting: !openSetting }));
            break;
          case KEYBOARD_KEYS.command_s:
          case KEYBOARD_KEYS.alt_s:
            event.preventDefault();
            dispatch(setAppState({ openSearch: !openSearch }));
            break;
          case KEYBOARD_KEYS.command_m:
          case KEYBOARD_KEYS.alt_m:
            event.preventDefault();
            pathname !== '/bilibili-music' ? appJump('/bilibili-music', 'internal') : back();
            break;
        }
      }
    };
    return pushKeyboardHandler(handler);
  }, [dispatch, appJump, back, pushKeyboardHandler, pathname, openSetting, openSearch]);

  useEffect(() => {
    const timer = setTimeout(runLastPage, 0);
    return () => clearTimeout(timer);
  }, [runLastPage]);

  return {
    handleOnContextMenu,
  };
}
