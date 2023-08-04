import React from 'react';
import { useStoreSelector, useStoreDispatch, useTheme, useTranslation, useOutSideClick } from '../../hooks';
import { Fade, Paper, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { setContextMenu, setAppState } from '../../store/slices/app-slice';
import { SVGS } from '../../constants';
import AppIcon from '../app-icon';

export default function ContextMenu() {
  const dispatch = useStoreDispatch();
  const { contextMenu } = useStoreSelector((state) => state.app);
  const { globalStyle } = useTheme();
  const t = useTranslation();

  const closeContextMenu = () => {
    dispatch(setContextMenu({ open: false }));
  };

  const targetRef = useOutSideClick<HTMLDivElement>(() => {
    if (contextMenu.open) {
      closeContextMenu();
    }
  });

  const handleOnClick = (id: string) => () => {
    const taskMapper = {
      [SVGS.search]: () => {
        dispatch(setAppState({ openSearch: true }));
      },
      [SVGS.setting]: () => {
        dispatch(setAppState({ openSetting: true, activeSetting: SVGS.theme }));
      },
    };
    taskMapper[id]();
    closeContextMenu();
  };

  const menuList = [
    { id: SVGS.search, title: t('search') },
    { id: SVGS.setting, title: t('setting') },
  ];

  return (
    <Fade in={contextMenu.open} exit={false}>
      <Paper
        ref={targetRef}
        sx={{
          position: 'fixed',
          left: contextMenu.x,
          top: contextMenu.y,
          ...globalStyle.glass,
          ...globalStyle.maxZIndex,
        }}
      >
        <List sx={{ p: 0 }}>
          {menuList.map((record) => (
            <ListItemButton key={record.id} onClick={handleOnClick(record.id)}>
              <ListItemIcon sx={{ minWidth: 'auto' }}>
                <AppIcon target={`#${record.id}`} type="svg" style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary={record.title} sx={{ pl: 0.5 }} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Fade>
  );
}
