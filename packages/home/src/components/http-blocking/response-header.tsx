import React from 'react';
import { Box, Typography, IconButton, Stack, Divider } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { ResponseHeaderProps } from './types';
import { useTheme, useTranslation } from '../../hooks';
import BoxInput from '../box-input';

function ResponseHeader(props: ResponseHeaderProps) {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { list = [], onChange, onDelete, onAdd, onDeleteAll, readonly = false } = props;

  const handleOnHeaderChange = (field: string, index: number) => (value: string) => {
    if (readonly) return;
    onChange?.(field, index, value);
  };

  const handleOnDelete = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (readonly) return;
    e.stopPropagation();
    onDelete?.(index);
  };

  const handleOnAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (readonly) return;
    e.stopPropagation();
    onAdd?.();
  };

  const handleOnDeleteAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (readonly) return;
    e.stopPropagation();
    onDeleteAll?.();
  };

  return (
    <>
      <Box sx={{ ...globalStyle.frc, p: 1 }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          {t('key')}
        </Typography>
        <Typography variant="h6" sx={{ flex: 1 }}>
          {t('value')}
        </Typography>
        <Box sx={{ width: 100, ...globalStyle.frc, justifyContent: 'flex-end' }}>
          <IconButton disabled={readonly} color="primary" size="small" onClick={handleOnAdd}>
            <AddIcon />
          </IconButton>
          <IconButton color="primary" size="small" disabled={readonly || !list.length} onClick={handleOnDeleteAll}>
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Stack divider={<Divider />}>
        {list.map((item, index) => {
          return (
            <Box sx={{ ...globalStyle.frc, p: 1 }} key={index}>
              <BoxInput
                readonly={readonly}
                value={item.header}
                boxProps={{ sx: { flex: 1, overflow: 'hidden' } }}
                onChange={handleOnHeaderChange('header', index)}
                placeholder={t('key') as string}
              >
                <Typography variant="body2" noWrap>
                  {item.header}
                </Typography>
              </BoxInput>
              <BoxInput
                readonly={readonly}
                value={item.value}
                boxProps={{ sx: { flex: 1, overflow: 'hidden' } }}
                onChange={handleOnHeaderChange('value', index)}
                placeholder={t('value') as string}
              >
                <Typography variant="body2" noWrap>
                  {item.value}
                </Typography>
              </BoxInput>
              <Box sx={{ width: 100, ...globalStyle.frc, justifyContent: 'flex-end' }}>
                <IconButton disabled={readonly} color="primary" size="small" onClick={handleOnDelete(index)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </>
  );
}

export default ResponseHeader;
