import React from 'react';
import AppIcon from '../app-icon';
import { Box, Button, Tooltip } from '@mui/material';
import { useStoreDispatch, useStoreSelector, useTheme, useTranslation } from '../../hooks';
import { setActive } from '../../store/slices/menu-slice';

function Menus() {
  const { theme } = useTheme();
  const t = useTranslation();
  const { active, list } = useStoreSelector((state) => state.menu);
  const dispatch = useStoreDispatch();

  const handleOnClick = (id: string) => {
    dispatch(setActive(id));
  };

  return (
    <Box>
      {list.map((record, index) => {
        const enabled = active === record.id;
        const isFirst = index === 0;
        return (
          <Tooltip key={record.id} title={t(record.title) as string} aria-label={t(record.title) as string}>
            <Button
              sx={{ minWidth: 'auto', p: 0, borderRadius: 0, ml: isFirst ? 0 : 1 }}
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
        );
      })}
    </Box>
  );
}

export default Menus;
