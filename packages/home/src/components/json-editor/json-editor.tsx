import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box } from '@mui/material';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import { setJson } from '../../store/slices/app-slice';
import CodeEditor from '../code-editor';

export default function JsonEditor() {
  const { globalStyle } = useTheme();
  const t = useTranslation();
  const { json } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const handleOnChangeLeft = (v: string) => {
    dispatch(setJson({ left: v }));
  };

  const handleOnChangeRight = (v: string) => {
    dispatch(setJson({ right: v }));
  };

  return (
    <DrawerRoute title={t('develop.json_editor')}>
      <Box sx={{ ...globalStyle.fc, flex: 1 }}>
        <Box sx={{ ...globalStyle.frc, flex: 1 }}>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor language="json" value={json.left} onChange={handleOnChangeLeft} />
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor language="json" value={json.right} onChange={handleOnChangeRight} />
          </Box>
        </Box>
      </Box>
    </DrawerRoute>
  );
}
