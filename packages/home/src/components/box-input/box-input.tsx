import React from 'react';
import { BoxInputProps } from './types';
import { Box, Typography } from '@mui/material';
import { useTheme, useToggle } from '../../hooks';

function BoxInput(props: BoxInputProps) {
  const { value = '', children, defaultEdit = false, boxProps, onChange, placeholder = '', readonly = false } = props;
  const { theme } = useTheme();
  const { value: edit, toggle: toggleEdit, close: closeEdit } = useToggle(defaultEdit);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readonly) return;
    e.stopPropagation();
    toggleEdit();
  };

  const handleOnInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    closeEdit();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange?.(e.target.value, e);
  };

  return (
    <Box {...boxProps} onClick={handleOnClick}>
      {edit ? (
        <input
          style={{ width: '100%' }}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          onClick={handleOnInputClick}
          autoFocus
          value={value}
          onChange={handleOnChange}
        />
      ) : !value ? (
        <Typography sx={{ color: theme.palette.grey['600'] }} noWrap variant="body2">
          {placeholder}
        </Typography>
      ) : (
        children
      )}
    </Box>
  );
}

export default BoxInput;
