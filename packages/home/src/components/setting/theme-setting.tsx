import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
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
