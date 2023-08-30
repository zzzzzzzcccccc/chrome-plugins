import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box } from '@mui/material';
import { useTheme, useTranslation } from '../../hooks';
import WorkArea from './work-area';
import EditorArea from './editor-area';

function ImageEditor() {
  const t = useTranslation();
  const { globalStyle } = useTheme();

  return (
    <DrawerRoute title={t('develop.image_editor')}>
      <Box sx={{ ...globalStyle.fc, flex: 1, width: '100%', overflow: 'hidden' }}>
        <WorkArea />
        <EditorArea />
      </Box>
    </DrawerRoute>
  );
}

export default ImageEditor;
