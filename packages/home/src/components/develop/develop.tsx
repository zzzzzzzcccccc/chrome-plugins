import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import Card from '../card';
import { useTheme, useTranslation } from '../../hooks';
import { Menu } from '../../model/menu-model';
import { useNavigate } from 'react-router-dom';

export default function Develop() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const t = useTranslation();

  const menuList: Menu[] = [
    {
      path: '/json-editor',
      svg: {
        id: '#json',
        style: { width: 48, height: 48, color: theme.palette.primary.main },
      },
      title: t('develop.json_editor'),
    },
    {
      path: '/base64-editor',
      svg: {
        id: '#base64',
        style: { width: 48, height: 48, color: theme.palette.primary.main },
      },
      title: t('develop.base64'),
    },
    {
      path: '/string-editor',
      svg: {
        id: '#string',
        style: { width: 48, height: 48, color: theme.palette.primary.main },
      },
      title: t('develop.string'),
    },
    {
      path: '/html-to-jsx-editor',
      svg: {
        id: '#html',
        style: { width: 48, height: 48, color: theme.palette.primary.main },
      },
      title: t('develop.html_to_jsx'),
    },
  ];

  return (
    <Card title={t('develop.title')}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {menuList.map((menu) => (
          <Tooltip title={menu.title} key={menu.path}>
            <IconButton onClick={() => navigate(menu.path)}>
              <svg style={{ ...menu.svg.style }}>
                <use xlinkHref={menu.svg.id} />
              </svg>
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Card>
  );
}
