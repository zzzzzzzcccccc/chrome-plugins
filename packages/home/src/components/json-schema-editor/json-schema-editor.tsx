import React from 'react';
import DrawerRoute from '../drawer-route';
import { useStoreDispatch, useStoreSelector, useTheme, useTranslation } from '../../hooks';
import { setSchema } from '../../store/slices/app-slice';
import { Box } from '@mui/material';
import CodeEditor from '../code-editor';
import { transformToSchema } from '../../utils';

function JsonSchemaEditor() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { schema } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const handleOnChangeLeft = async (v: string, { mode = schema.mode }: Record<string, any>) => {
    try {
      dispatch(
        setSchema({
          left: v,
          right: transformToSchema({ target: JSON.parse(v), mode }),
          mode,
        }),
      );
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.json_schema_editor')}>
      <Box sx={{ ...globalStyle.fr, p: 1 }}></Box>
      <Box sx={{ flex: 1, ...globalStyle.fr }}>
        <Box sx={{ flex: 1, height: '100%' }}>
          <CodeEditor language="json" value={schema.left} onChange={handleOnChangeLeft} />
        </Box>
        <Box sx={{ flex: 1, height: '100%' }}>
          <CodeEditor language="json" value={schema.right} options={{ readOnly: true }} />
        </Box>
      </Box>
    </DrawerRoute>
  );
}

export default JsonSchemaEditor;
