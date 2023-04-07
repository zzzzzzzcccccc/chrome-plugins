import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export default function AppHead() {
  const t = useTranslation();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Tooltip title={t('setting')}>
            <IconButton color="inherit" onClick={() => navigate('/setting')}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
