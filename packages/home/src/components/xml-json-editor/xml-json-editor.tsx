import React, { useRef } from 'react';
import * as monaco from 'monaco-editor';
import DrawerRoute from '../drawer-route';
import { useTranslation, useStoreSelector, useStoreDispatch, useTheme } from '../../hooks';
import { setJsonXml } from '../../store/slices/app-slice';
import { Box } from '@mui/material';
import CodeEditor from '../code-editor';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';

const xmlBuilder = new XMLBuilder({
  format: true,
});
const xmlParser = new XMLParser();

function XmlJsonEditor() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { jsonXml } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const editorModeRef = useRef('');

  const handleOnMount = (mode: 'left' | 'right') => (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.onDidFocusEditorText(() => {
      editorModeRef.current = mode;
    });
  };

  const handleOnChangeLeft = (v: string) => {
    if (editorModeRef.current !== 'left') return null;
    try {
      dispatch(
        setJsonXml({
          left: v,
          right: xmlBuilder.build(JSON.parse(v)),
        }),
      );
    } catch (e) {
      return null;
    }
  };

  const handleOnChangeRight = (v: string) => {
    if (editorModeRef.current !== 'right') return null;
    try {
      dispatch(
        setJsonXml({
          left: JSON.stringify(xmlParser.parse(v), null, 2),
          right: v,
        }),
      );
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.xml_json_editor')}>
      <Box sx={{ ...globalStyle.fc, flex: 1 }}>
        <Box sx={{ ...globalStyle.frc, flex: 1 }}>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor
              language="json"
              value={jsonXml.left}
              onMount={handleOnMount('left')}
              onChange={handleOnChangeLeft}
            />
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor
              language="xml"
              value={jsonXml.right}
              onMount={handleOnMount('right')}
              onChange={handleOnChangeRight}
            />
          </Box>
        </Box>
      </Box>
    </DrawerRoute>
  );
}

export default XmlJsonEditor;
