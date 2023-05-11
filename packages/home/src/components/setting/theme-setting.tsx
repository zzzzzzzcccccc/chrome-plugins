import React from 'react';
import { Button, ButtonGroup, Typography, Box, Paper, Slider } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { useTranslation, useTheme } from '../../hooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLOR_RANGES } from '../../constants';

export default function ThemeSetting() {
  const t = useTranslation();
  const { mode, globalStyle, isDark, primaryColor, colorRange, appSize, primaryColorMapper, updateConfiguration } =
    useTheme();

  const getButtonVariant = (target: string) => (target === mode ? 'contained' : 'outlined');

  const renderMode = () => {
    return (
      <>
        <Typography variant="subtitle1" sx={{ pb: 1 }}>
          {t('mode')}
        </Typography>
        <ButtonGroup>
          <Button
            endIcon={<LightModeIcon />}
            sx={{ ...globalStyle.ttn }}
            variant={getButtonVariant('light')}
            onClick={() => updateConfiguration({ mode: 'light' })}
          >
            <span>{t('setting.theme.light')}</span>
          </Button>
          <Button
            endIcon={<DarkModeOutlinedIcon />}
            sx={{ ...globalStyle.ttn }}
            variant={getButtonVariant('dark')}
            onClick={() => updateConfiguration({ mode: 'dark' })}
          >
            {t('setting.theme.dark')}
          </Button>
          <Button
            endIcon={<SettingsSuggestOutlinedIcon />}
            sx={{ ...globalStyle.ttn }}
            variant={getButtonVariant('system')}
            onClick={() => updateConfiguration({ mode: 'system' })}
          >
            {t('setting.theme.system')}
          </Button>
        </ButtonGroup>
      </>
    );
  };

  const renderColorRange = () => {
    return (
      <>
        <Typography variant="subtitle1" sx={{ pt: 1, pb: 1 }}>
          {t('setting.theme.color_range')}
        </Typography>
        <Box sx={{ pl: 2, pr: 2 }}>
          <Slider
            valueLabelDisplay="auto"
            step={1}
            max={9}
            valueLabelFormat={(v) => `${(v + 1) * 10}%`}
            value={COLOR_RANGES.indexOf(colorRange)}
            onChange={(_, v) => updateConfiguration({ colorRange: COLOR_RANGES[v as number] })}
          />
        </Box>
      </>
    );
  };

  const renderColor = () => {
    return (
      <>
        <Typography variant="subtitle1" sx={{ pb: 0.5 }}>
          {t('setting.theme.color')}
        </Typography>
        <Box sx={{ ...globalStyle.fr, flexWrap: 'wrap' }}>
          {Object.keys(primaryColorMapper).map((key) => {
            const main = primaryColorMapper[key][colorRange];
            const active = key === primaryColor;
            return (
              <Paper
                tabIndex={0}
                sx={{ backgroundColor: main, width: 50, height: 50, m: 0.5, cursor: 'pointer', ...globalStyle.fcc }}
                onClick={() => updateConfiguration({ primaryColor: key })}
                key={key}
              >
                {active && <CheckCircleIcon sx={{ color: isDark ? '#000' : '#fff' }} />}
              </Paper>
            );
          })}
        </Box>
      </>
    );
  };

  const renderAppSize = () => {
    return (
      <>
        <Typography variant="subtitle1" sx={{ pb: 0.5, pt: 1 }}>
          {t('setting.theme.app_size')}
        </Typography>
        <Box sx={{ pl: 2, pr: 2 }}>
          <Slider
            value={appSize}
            step={1}
            min={24}
            max={100}
            valueLabelDisplay="auto"
            onChange={(_, v) => updateConfiguration({ appSize: v as number })}
          />
        </Box>
      </>
    );
  };

  return (
    <>
      {renderMode()}
      {renderColorRange()}
      {renderColor()}
      {renderAppSize()}
    </>
  );
}
