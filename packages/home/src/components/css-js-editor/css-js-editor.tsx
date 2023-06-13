import React from 'react';
import DrawerRoute from '../drawer-route';
import { useStoreDispatch, useStoreSelector, useTheme, useTranslation } from '../../hooks';
import { Box } from '@mui/material';
import CodeEditor from '../code-editor';
import { setCssJs } from '../../store/slices/app-slice';
import postcss from 'postcss';
import postcssJs from 'postcss-js';

function CssJsEditor() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const dispatch = useStoreDispatch();
  const { cssJs } = useStoreSelector((state) => state.app);

  const handleOnChangeLeft = (v: string) => {
    try {
      dispatch(
        setCssJs({
          left: v,
          right: `const styles = ${JSON.stringify(postcssJs.objectify(postcss.parse(v)), null, 2)}`,
        }),
      );
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.css_js_editor')}>
      <Box sx={{ ...globalStyle.fc, flex: 1 }}>
        <Box sx={{ ...globalStyle.frc, flex: 1 }}>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor language="less" value={cssJs.left} onChange={handleOnChangeLeft} />
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor language="javascript" value={cssJs.right} options={{ readOnly: true }} />
          </Box>
        </Box>
      </Box>
    </DrawerRoute>
  );
}

export default CssJsEditor;
