import React, { useRef, useState } from 'react';
import { TagInputProps } from './types';
import { Box, InputBase, Chip } from '@mui/material';
import { useTheme } from '../../hooks';

function TagInput(props: TagInputProps) {
  const { value, onChange, inputProps, className } = props;
  const { globalStyle } = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [target, setTarget] = useState('');

  const emitOnChange = (v: string[] = []) => onChange?.(v);

  const focusInput = () => inputRef.current?.focus();

  const cleanTarget = () => setTarget('');

  const handleOnDelete = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    emitOnChange(value.filter((_, i) => i !== index));
    focusInput();
  };

  const pushTag = (v: string) => {
    const current = v.trim();
    if (!current) return;
    emitOnChange([...value, current]);
    cleanTarget();
  };

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(event.target.value);
    inputProps?.onChange?.(event);
  };

  const handleOnInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    pushTag(target);
    inputProps?.onBlur?.(event);
  };

  const handleOnInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyBoardMapper: Record<string, () => void> = {
      Enter: () => {
        event.stopPropagation();
        event.preventDefault();
        pushTag(target);
      },
      Tab: () => {
        event.stopPropagation();
        event.preventDefault();
        pushTag(target);
      },
      Backspace: () => {
        event.stopPropagation();
        if (!target && value.length) {
          event.preventDefault();
          emitOnChange(value.filter((_, i) => i !== value.length - 1));
        }
      },
    };
    keyBoardMapper[event.key]?.();
    inputProps?.onKeyDown?.(event);
  };

  const handleOnWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    focusInput();
  };

  return (
    <Box className={className} sx={{ ...globalStyle.fr, flexWrap: 'wrap' }} onClick={handleOnWrapperClick}>
      {value.map((s, index) => (
        <Chip
          title={s}
          label={s}
          key={index}
          size="small"
          color="info"
          variant="outlined"
          onDelete={handleOnDelete(index)}
        />
      ))}
      <InputBase
        {...inputProps}
        inputRef={inputRef}
        size="small"
        value={target}
        onChange={handleOnInputChange}
        onBlur={handleOnInputBlur}
        onKeyDown={handleOnInputKeyDown}
      />
    </Box>
  );
}

export default TagInput;
