import React from 'react';
import AppIcon from '../app-icon';
import { Box, Button, Tooltip } from '@mui/material';
import { useStoreDispatch, useStoreSelector, useTheme, useTranslation } from '../../hooks';
import { setAppState } from '../../store/slices/app-slice';

function Menus() {
  const { theme } = useTheme();
  const t = useTranslation();
  const { activeMenu } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const menuList = [
    {
      id: 'develop',
      title: t('develop.title'),
    },
  ];

  const handleOnClick = (id: string) => {
    dispatch(setAppState({ activeMenu: id }));
  };

  return (
    <Box>
      {menuList.map((record) => {
        const active = activeMenu === record.id;
        return (
          <Tooltip key={record.id} title={record.title} aria-label={record.title}>
            <Button sx={{ minWidth: 'auto', p: 0, borderRadius: 0 }} onClick={() => handleOnClick(record.id)}>
              <AppIcon
                type="svg"
                target={`#${record.id}`}
                style={{
                  width: 36,
                  height: 36,
                  color: active ? theme.palette.primary.main : theme.palette.text.primary,
                }}
              />
            </Button>
          </Tooltip>
        );
      })}
    </Box>
  );
}

export default Menus;
