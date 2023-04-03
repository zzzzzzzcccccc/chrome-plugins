import React, { useState } from 'react';
import { CardProps } from './types';
import { Paper } from '@mui/material';
import { Input } from './styles';
import { useTheme } from '../../hooks';

export default function Card(props: CardProps) {
  const { children, value, onSubmitTitle, placeholder } = props;

  const { globalStyle } = useTheme();

  const [editing, setEditing] = useState(false);
  const [actualValue, setActualValue] = useState(value || '');

  const handleOnMouseEnter = () => {
    setEditing(true);
  };

  const handleOnChange = (v: string) => {
    setActualValue(v);
  };

  const handleOnBlur = (v: string) => {
    if (editing) {
      const current = v.trim();
      setActualValue(current);
      setEditing(false);
      onSubmitTitle?.(current);
    }
  };

  return (
    <Paper sx={{ ...globalStyle.fcc, p: 1 }}>
      <Input
        readOnly={!editing}
        value={actualValue}
        onMouseEnter={handleOnMouseEnter}
        onBlur={(e) => handleOnBlur(e.target.value)}
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder={placeholder}
      />
      {children}
    </Paper>
  );
}
