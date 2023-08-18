import React, { useState } from 'react';
import AppIcon from '../app-icon';
import { Box, Button, Tooltip, Menu, MenuItem } from '@mui/material';
import { useMenus, useStoreDispatch, useTheme, useToast, useTranslation } from '../../hooks';
import { setActive, removeMenu, MenuItem as IMenuItem } from '../../store/slices/menu-slice';
import { DEFAULT_MENUS } from '../../constants';

function Menus() {
  const { theme } = useTheme();
  const t = useTranslation();
  const { show } = useToast();
  const { list, active } = useMenus();
  const dispatch = useStoreDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOnClick = (id: string) => {
    dispatch(setActive(id));
  };

  const handleOnContextMenu = (item: IMenuItem) => (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!DEFAULT_MENUS[item.id]) {
      event.stopPropagation();
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    }
  };

  const handleOnDeleteMenu = (item: IMenuItem) => (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    dispatch(removeMenu({ id: item.id }));
    if (active === item.id) {
      dispatch(setActive(list[0].id));
    }
    setAnchorEl(null);
    show({ message: t('delete_success'), type: 'success' });
  };

  return (
    <Box>
      {list.map((record, index) => {
        const enabled = active === record.id;
        const isFirst = index === 0;
        return (
          <React.Fragment key={record.id}>
            <Tooltip title={t(record.title) as string} aria-label={t(record.title) as string}>
              <Button
                sx={{ minWidth: 'auto', p: 0, borderRadius: 0, ml: isFirst ? 0 : 1 }}
                onContextMenu={handleOnContextMenu(record)}
                onClick={() => handleOnClick(record.id)}
              >
                <AppIcon
                  {...record.icon}
                  target={record.icon.type === 'svg' ? `#${record.icon.target}` : record.icon.target}
                  style={{
                    width: 36,
                    height: 36,
                    color: enabled ? theme.palette.primary.main : theme.palette.text.primary,
                  }}
                />
              </Button>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={handleOnDeleteMenu(record)}>{t('delete')}</MenuItem>
            </Menu>
          </React.Fragment>
        );
      })}
    </Box>
  );
}

export default Menus;
