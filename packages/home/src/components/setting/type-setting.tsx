import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  FormHelperText,
} from '@mui/material';
import { useTranslation, useTheme, useStoreSelector, useToast, useStoreDispatch } from '../../hooks';
import { addMenu } from '../../store/slices/menu-slice';
import { SVGS } from '../../constants';
import AppIcon from '../app-icon';

function TypeSetting() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { show } = useToast();
  const { list } = useStoreSelector((state) => state.menu);
  const dispatch = useStoreDispatch();
  const [value, setValue] = useState({
    title: '',
    iconTarget: '',
  });
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const listTitles = list.map((item) => t(item.title));

  const getErrors = (target = value) => {
    const result: typeof errors = [];
    if (!target.title.trim()) {
      result.push({ field: 'title', message: t('add_type.title_required') });
    }
    if (!target.iconTarget) {
      result.push({ field: 'iconTarget', message: t('add_type.icon_target_required') });
    }
    return result;
  };

  const validateProps = (field: string) => ({
    error: errors.filter((r) => r.field === field).length > 0,
    helperText: errors.find((r) => r.field === field)?.message || '',
  });

  const handleOnChange = (payload: Record<string, string>) => {
    setValue((prev) => {
      const current = { ...prev, ...payload };
      setErrors(getErrors(current));
      return current;
    });
  };

  const handleOnSubmit = () => {
    const errors = getErrors();
    if (errors.length) {
      setErrors(errors);
      return;
    }
    if (listTitles.indexOf(value.title) > -1) {
      show({ message: t('add_type.title_existed'), type: 'warning' });
      return;
    }
    dispatch(
      addMenu({
        item: {
          id: new Date().toISOString(),
          title: value.title,
          icon: {
            target: value.iconTarget,
            type: 'svg',
          },
        },
      }),
    );
    show({ message: t('add_type.success'), type: 'success' });
  };

  const renderAddType = () => {
    return (
      <>
        <Typography variant="subtitle1" sx={{ pb: 1, ...globalStyle.frc, justifyContent: 'space-between' }}>
          {t('add_type')}
          <Button sx={{ ...globalStyle.ttn }} onClick={handleOnSubmit}>
            {t('add_type.submit')}
          </Button>
        </Typography>
        <Box component="form" autoComplete="off">
          <Stack spacing={2}>
            <TextField
              {...validateProps('title')}
              autoFocus
              variant="standard"
              size="small"
              value={value?.title || ''}
              fullWidth
              label={t('add_type.title')}
              onChange={(e) => handleOnChange({ title: e.target.value })}
            />
            <FormControl variant="standard" size="small" fullWidth error={validateProps('iconTarget').error}>
              <InputLabel id="add-type-icon">{t('add_type.icon')}</InputLabel>
              <Select
                labelId="add-type-icon"
                value={value.iconTarget}
                onChange={(e) => handleOnChange({ iconTarget: e.target.value })}
              >
                {Object.keys(SVGS).map((key) => {
                  const id = (SVGS as Record<string, string>)[key];
                  return (
                    <MenuItem key={id} value={id} sx={{ ...globalStyle.fcc }}>
                      <AppIcon target={`#${id}`} type="svg" style={{ width: 26, height: 26 }} />
                    </MenuItem>
                  );
                })}
              </Select>
              {validateProps('iconTarget').helperText && (
                <FormHelperText>{validateProps('iconTarget').helperText}</FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Box>
      </>
    );
  };

  return <>{renderAddType()}</>;
}

export default TypeSetting;
