import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box } from '@mui/material';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import { setLeftJson, setRightJson } from '../../store/slices/app-slice';
import CodeEditor from '../code-editor';

export default function JsonEditor() {
  const { globalStyle } = useTheme();
  const t = useTranslation();
  const { leftJson, rightJson } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  return (
    <DrawerRoute title={t('develop.json_editor')}>
      <Box sx={{ ...globalStyle.fc, flex: 1 }}>
        <Box sx={{ ...globalStyle.frc, flex: 1 }}>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor language="json" value={leftJson} onChange={(v) => dispatch(setLeftJson(v))} />
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor language="json" value={rightJson} onChange={(v) => dispatch(setRightJson(v))} />
          </Box>
        </Box>
      </Box>
    </DrawerRoute>
  );
}
