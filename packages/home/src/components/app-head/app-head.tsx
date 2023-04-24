import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import RealTime from '../real-time';
import { useTheme, useTranslation, useAppNavigate } from '../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

function AppHead() {
  const { toSetting } = useAppNavigate();
  const t = useTranslation();
  const { globalStyle } = useTheme();

  return (
    <Box
      sx={{
        ...globalStyle.frc,
        ...globalStyle.glass,
        width: '100%',
        height: 30,
        pl: 2,
        pr: 2,
      }}
    >
      <Box sx={{ ...globalStyle.frc, justifyContent: 'flex-end', flex: 1 }}>
        <Tooltip title={t('search')}>
          <IconButton size="small" sx={{ ...globalStyle.fcc }}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('setting')}>
          <IconButton size="small" sx={{ ...globalStyle.fcc }} onClick={toSetting}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <RealTime />
      </Box>
    </Box>
  );
}

export default AppHead;
