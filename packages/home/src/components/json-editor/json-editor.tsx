import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '../../hooks';
import CodeEditor from '../code-editor';

export default function JsonEditor() {
  const { globalStyle } = useTheme();

  const [value, setValue] = useState(`{"a": "123123", "b": "qwerty"}`);

  const handleOnChange = (v: string) => {
    setValue(v);
  };

  return (
    <Box sx={{ ...globalStyle.fcc, flex: 1 }}>
      <Box sx={{ flex: 1 }}>
        <CodeEditor language="json" value={value} onChange={handleOnChange} />
      </Box>
    </Box>
  );
}
