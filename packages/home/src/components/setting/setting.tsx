import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Drawer, IconButton, Tooltip, Divider, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import ThemeSetting from './theme-setting';
import TranslationsSetting from './translations-setting';
import { useTranslation, useTheme } from '../../hooks';

const settingComponents = [ThemeSetting, TranslationsSetting];

export default function Setting() {
  const t = useTranslation();
  const { globalStyle } = useTheme();

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((v) => !v);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Tooltip title={t('setting')}>
              <IconButton color="inherit" onClick={toggleOpen}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={toggleOpen}>
        <Box sx={{ width: 300 }}>
          <Box sx={{ ...globalStyle.frc, p: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
              {t('setting')}
            </Typography>
            <IconButton color="primary" onClick={toggleOpen}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {settingComponents.map((Component, index) => (
            <Box sx={{ pl: 2, pr: 2, pb: index === settingComponents.length - 1 ? 0 : 2 }} key={index}>
              <Component />
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
