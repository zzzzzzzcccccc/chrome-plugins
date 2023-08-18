import React from 'react';
import { Box, FormControl, TextField, Select, MenuItem, InputLabel, Stack, FormHelperText } from '@mui/material';
import { FormState, CollectWebsiteFormProps } from './types';
import { useMenus, useTranslation } from '../../hooks';

function CollectWebsiteForm(props: CollectWebsiteFormProps) {
  const { value, onChange, errors = [] } = props;
  const t = useTranslation();
  const { list } = useMenus();

  const handleOnChange = (payload: Partial<FormState>) => {
    onChange?.(payload);
  };

  const validateProps = (field: string) => ({
    error: errors.filter((r) => r.field === field).length > 0,
    helperText: errors.find((r) => r.field === field)?.message || '',
  });

  return (
    <Box sx={{ p: 2 }} component="form" autoComplete="off">
      <Stack spacing={2}>
        <TextField
          {...validateProps('title')}
          autoFocus
          variant="standard"
          size="small"
          value={value?.title || ''}
          fullWidth
          label={t('collect_form.title')}
          onChange={(e) => handleOnChange({ title: e.target.value })}
        />
        <TextField
          {...validateProps('url')}
          variant="standard"
          size="small"
          value={value?.url || ''}
          fullWidth
          label={t('collect_form.url')}
          onChange={(e) => handleOnChange({ url: e.target.value })}
        />
        <FormControl error={validateProps('id').error} variant="standard" size="small" fullWidth>
          <InputLabel id="collect-website-id">{t('collect_form.id')}</InputLabel>
          <Select
            value={value?.id || ''}
            labelId="collect-website-id"
            label={t('collect_form.id')}
            onChange={(e) => handleOnChange({ id: e.target.value })}
          >
            {list.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {t(item.title)}
              </MenuItem>
            ))}
          </Select>
          {validateProps('id').helperText && <FormHelperText>{validateProps('id').helperText}</FormHelperText>}
        </FormControl>
      </Stack>
    </Box>
  );
}

export default CollectWebsiteForm;
