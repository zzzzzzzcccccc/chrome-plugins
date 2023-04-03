import React from 'react';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { useTranslation, useTheme } from '../../hooks';

export default function ThemeSetting() {
  const t = useTranslation();
  const { mode, updateTheme, globalStyle } = useTheme();

  const getButtonVariant = (target: string) => (target === mode ? 'contained' : 'outlined');

  return (
    <>
      <Typography sx={{ pb: 1, color: 'primary.main' }} variant="subtitle2">
        {t('setting.theme')}
      </Typography>
      <ButtonGroup>
        <Button
          endIcon={<LightModeIcon />}
          sx={{ ...globalStyle.ttn }}
          variant={getButtonVariant('light')}
          onClick={() => updateTheme('light')}
        >
          <span>{t('setting.theme.light')}</span>
        </Button>
        <Button
          endIcon={<DarkModeOutlinedIcon />}
          sx={{ ...globalStyle.ttn }}
          variant={getButtonVariant('dark')}
          onClick={() => updateTheme('dark')}
        >
          {t('setting.theme.dark')}
        </Button>
        <Button
          endIcon={<SettingsSuggestOutlinedIcon />}
          sx={{ ...globalStyle.ttn }}
          variant={getButtonVariant('system')}
          onClick={() => updateTheme('system')}
        >
          {t('setting.theme.system')}
        </Button>
      </ButtonGroup>
    </>
  );
}
