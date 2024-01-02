import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  Button,
  Tooltip,
  Popover,
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTheme, useTranslation } from '../../hooks';
import { timer, formatDate } from '../../utils';

const defaultFormValue = {
  current: new Date().getTime() + '',
  unit: 'ms',
  result: new Date().toLocaleString(),
};

function RealTime() {
  const t = useTranslation();
  const [dateInstance, setInstance] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [formData, setFormData] = useState(defaultFormValue);
  const { theme, globalStyle } = useTheme();

  const { month, date, day, hours, minute, seconds, timestamp, localeString } = useMemo(
    () => formatDate(dateInstance),
    [dateInstance],
  );

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFormData((prev) => ({ ...prev, current: timestamp + '', result: localeString }));
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
  };

  const handleOnChange = <T,>(filed: string, value: T) => {
    setFormData((prev) => {
      const data = { ...prev, [filed]: value };
      try {
        if (data.unit === 's') {
          return { ...data, result: new Date(+data.current * 1000).toLocaleString() };
        } else {
          return { ...data, result: new Date(+data.current).toLocaleString() };
        }
      } catch (e) {
        return data;
      }
    });
  };

  useEffect(() => {
    const timerId = timer.setInterval(() => setInstance(new Date()), 1000 / 60);

    return () => {
      timer.clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <Tooltip title={t('timestamp_formatting')}>
        <Button
          aria-describedby={anchorEl ? 'date-format' : undefined}
          variant="text"
          sx={{ p: 0, borderRadius: 0, ...globalStyle.ttn }}
          onClick={handleOnClick}
        >
          <Typography sx={{ ml: 2, color: theme.palette.text.primary }} variant="body1">
            {month}/{date} {hours}:{minute}:{seconds} {t(`day${day}`)}
          </Typography>
        </Button>
      </Tooltip>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleOnClose}
        id={anchorEl ? 'date-format' : undefined}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Typography variant="body1" sx={{ pl: 1, pt: 1 }}>
          {t('timestamp_formatting')}
        </Typography>
        <Box component="form" autoComplete="off" sx={{ p: 1 }}>
          <Stack spacing={2}>
            <Box sx={{ ...globalStyle.frc }}>
              <TextField
                sx={{ flex: 1 }}
                autoFocus
                variant="standard"
                size="small"
                label={t('timestamp_target')}
                value={formData.current}
                onChange={(event) => handleOnChange('current', event.target.value)}
              />
              <FormControl variant="standard" size="small" sx={{ width: 120 }}>
                <InputLabel id="date-unit-label">{t('timestamp_unit')}</InputLabel>
                <Select
                  labelId="date-unit-label"
                  label={t('timestamp_unit')}
                  value={formData.unit}
                  onChange={(event) => handleOnChange('unit', event.target.value)}
                >
                  <MenuItem value="ms">{t('timestamp_unit_millisecond')}</MenuItem>
                  <MenuItem value="s">{t('timestamp_unit_second')}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              variant="standard"
              size="small"
              label={t('timestamp_result')}
              value={formData.result}
              InputProps={{ readOnly: true }}
            />
          </Stack>
        </Box>
      </Popover>
    </>
  );
}

export default RealTime;
