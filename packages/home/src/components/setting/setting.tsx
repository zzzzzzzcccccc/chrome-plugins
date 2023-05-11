import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThemeSetting from './theme-setting';
import TranslationsSetting from './translations-setting';
import { useTranslation, useTheme, useStoreSelector, useStoreDispatch } from '../../hooks';
import { CSS_NAME_SPACE } from '../../constants';
import { setAppState } from '../../store/slices/app-slice';

export default function Setting() {
  const t = useTranslation();
  const { globalStyle, theme } = useTheme();
  const dispatch = useStoreDispatch();
  const { openSetting } = useStoreSelector((state) => state.app);

  const [active, setActive] = useState(0);

  const menuList = [
    {
      title: t('setting.theme'),
      id: 'theme',
      component: ThemeSetting,
    },
    {
      title: t('setting.translations'),
      id: 'language',
      component: TranslationsSetting,
    },
  ];
  const Component = menuList[active].component;

  const onClose = () => {
    dispatch(setAppState({ openSetting: false }));
  };

  return (
    <Dialog open={openSetting} onClose={onClose} scroll="paper">
      <DialogTitle sx={{ ...globalStyle.frc }}>
        <Typography variant="body1" sx={{ flex: 1, color: 'primary.main' }}>
          {t('setting')}
        </Typography>
        <IconButton color="primary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ ...globalStyle.fr, height: 360, p: 0, width: 600 }} dividers>
        <List sx={{ height: '100%', overflow: 'auto', pt: 0, width: 160 }}>
          {menuList.map((menu, index) => {
            const selected = index === active;
            const color = selected ? theme.palette.primary.main : undefined;
            return (
              <ListItemButton key={index} selected={selected} onClick={() => setActive(index)}>
                <ListItemIcon>
                  <svg className={`${CSS_NAME_SPACE}-fcc`} style={{ width: 24, height: 24, color }}>
                    <use xlinkHref={`#${menu.id}`} />
                  </svg>
                </ListItemIcon>
                <ListItemText primary={menu.title} sx={{ color }} />
              </ListItemButton>
            );
          })}
        </List>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ p: 2, height: '100%', overflow: 'auto', flex: 1 }}>
          <Component />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
