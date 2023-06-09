import React, { useEffect } from 'react';
import useInitialize from './use-initialize';
import { useStoreSelector, useStoreDispatch } from './use-store';
import { KeyCode } from '../utils';
import { KEYBOARD_KEYS } from '../constants';
import { setAppState, setContextMenu } from '../store/slices/app-slice';

export default function useLayout() {
  const { pushKeyboardHandler } = useInitialize();
  const { openSetting, openSearch, contextMenu } = useStoreSelector((state) => state.app);
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
        }
      }
    };
    return pushKeyboardHandler(handler);
  }, [dispatch, pushKeyboardHandler, openSetting, openSearch]);

  return {
    handleOnContextMenu,
  };
}
