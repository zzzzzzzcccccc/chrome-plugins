import React, { useState } from 'react';
import { Button, ButtonGroup, Typography, Box, Paper, Slider, Stack, TextField } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation, useTheme, useToast } from '../../hooks';
import { COLOR_RANGES } from '../../constants';
import { loadImage } from '../../utils';

export default function ThemeSetting() {
  const t = useTranslation();
  const {
    mode,
    globalStyle,
    isDark,
    primaryColor,
    colorRange,
    appSize,
    primaryColorMapper,
    backgroundUrlStore,
    backgroundUrl,
    updateConfiguration,
  } = useTheme();
  const { show } = useToast();

  const [customBackgroundUrl, setCustomBackgroundUrl] = useState('');

  const getButtonVariant = (target: string) => (target === mode ? 'contained' : 'outlined');

  const handleBackgroundUrlOnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const value = customBackgroundUrl.trim();
    if (key !== 'Enter') return;
    if (!value) return;
    e.stopPropagation();
    e.preventDefault();
    if (backgroundUrlStore.indexOf(value) > -1) {
      show({
        message: t('setting.theme.custom_background_url.existed'),
        type: 'warning',
      });
      return;
    }
    const { error } = await loadImage(value);
    if (error) {
      show({
        message: t('setting.theme.custom_background_url.no_found'),
        type: 'error',
      });
      return;
    }
    updateConfiguration({ backgroundUrlStore: [value, ...backgroundUrlStore], backgroundUrl: value });
    show({
      message: t('setting.theme.custom_background_url.success'),
      type: 'success',
    });
  };

  const handleBackgroundUrlOnDelete = (url: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const current = backgroundUrlStore.filter((v) => url !== v);
    if (!current.length) {
      show({
        message: t('setting.theme.custom_background_url.delete.failed'),
        type: 'warning',
      });
      return;
    }
    updateConfiguration({
      backgroundUrlStore: current,
      backgroundUrl: current.indexOf(url) > -1 ? backgroundUrl : current[0],
    });
    show({
      message: t('setting.theme.custom_background_url.delete.success'),
      type: 'success',
    });
  };

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

  const renderBackground = () => {
    return (
      <>
        <Box sx={{ ...globalStyle.fr, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">{t('setting.theme.background_url')}</Typography>
          <TextField
            variant="standard"
            onKeyDown={handleBackgroundUrlOnKeyDown}
            value={customBackgroundUrl}
            onChange={(e) => setCustomBackgroundUrl(e.target.value)}
            size="small"
            sx={{ width: 240 }}
            placeholder={t('setting.theme.custom_background_url.placeholder') || ''}
            label={t('setting.theme.custom_background_url')}
          />
        </Box>
        <Stack direction="row" flexWrap="wrap">
          {backgroundUrlStore.map((url, index) => {
            const active = url === backgroundUrl;
            return (
              <Box
                sx={{ ml: index % 4 === 0 ? 0 : 0.5, mt: 0.5, position: 'relative', cursor: 'pointer' }}
                key={index}
                onClick={() => updateConfiguration({ backgroundUrl: url })}
              >
                <img
                  src={url}
                  alt={t('setting.theme.background_url') || ''}
                  loading="lazy"
                  style={{ width: 96, height: 96, display: 'block' }}
                />
                {active && (
                  <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                    <CheckCircleIcon sx={{ color: isDark ? '#000' : '#fff' }} />
                  </Box>
                )}
                <Box sx={{ position: 'absolute', right: 0, top: 0 }} onClick={handleBackgroundUrlOnDelete(url)}>
                  <DeleteIcon sx={{ color: isDark ? '#000' : '#fff' }} />
                </Box>
              </Box>
            );
          })}
        </Stack>
      </>
    );
  };

  return (
    <>
      {renderMode()}
      {renderColorRange()}
      {renderColor()}
      {renderAppSize()}
      {renderBackground()}
    </>
  );
}
