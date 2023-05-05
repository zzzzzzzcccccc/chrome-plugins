import React, { useRef } from 'react';
import DrawerRoute from '../drawer-route';
import { Box } from '@mui/material';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import { setHtmlToJSX } from '../../store/slices/app-slice';
import CodeEditor from '../code-editor';
import HTMLtoJSX from 'htmltojsx';

export default function JsonEditor() {
  const { globalStyle } = useTheme();
  const t = useTranslation();
  const { htmlToJSX } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const htmlToJSXRef = useRef(
    new HTMLtoJSX({
      createClass: false,
    }),
  );

  const handleLeftOnChange = (v: string) => {
    dispatch(setHtmlToJSX({ left: v }));
    try {
      dispatch(setHtmlToJSX({ right: htmlToJSXRef.current.convert(v) }));
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.html_to_jsx')}>
      <Box sx={{ ...globalStyle.fc, flex: 1 }}>
        <Box sx={{ ...globalStyle.frc, flex: 1 }}>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor language="html" value={htmlToJSX.left} onChange={(v) => handleLeftOnChange(v)} />
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor
              language="javascript"
              value={htmlToJSX.right}
              options={{
                minimap: {
                  enabled: false,
                },
                tabSize: 2,
                readOnly: true,
              }}
            />
          </Box>
        </Box>
      </Box>
    </DrawerRoute>
  );
}
