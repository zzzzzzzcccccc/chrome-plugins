import React, { useState, useEffect } from 'react';
import { Box, Drawer, IconButton, Divider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThemeSetting from './theme-setting';
import TranslationsSetting from './translations-setting';
import { useTranslation, useTheme } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const settingComponents = [ThemeSetting, TranslationsSetting];

export default function Setting() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const onClose = () => {
    navigate(-1);
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <Drawer open={open} anchor="right" onClose={onClose}>
      <Box sx={{ width: 300 }}>
        <Box sx={{ ...globalStyle.frc, p: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
            {t('setting')}
          </Typography>
          <IconButton color="primary" onClick={onClose}>
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
  );
}
