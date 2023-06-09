import React, { useRef } from 'react';
import * as monaco from 'monaco-editor';
import DrawerRoute from '../drawer-route';
import { useTranslation, useStoreSelector, useStoreDispatch, useTheme } from '../../hooks';
import { setJsonYaml } from '../../store/slices/app-slice';
import { Box } from '@mui/material';
import CodeEditor from '../code-editor';
import yaml from 'js-yaml';

function JsonYamlEditor() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { jsonYaml } = useStoreSelector((state) => state.app);
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
        setJsonYaml({
          left: v,
          right: yaml.dump(JSON.parse(v)),
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
        setJsonYaml({
          right: v,
          left: JSON.stringify(yaml.load(v), null, 2),
        }),
      );
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.json_yaml_editor')}>
      <Box sx={{ ...globalStyle.fc, flex: 1 }}>
        <Box sx={{ ...globalStyle.frc, flex: 1 }}>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor
              language="json"
              value={jsonYaml.left}
              onMount={handleOnMount('left')}
              onChange={handleOnChangeLeft}
            />
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            <CodeEditor
              language="yaml"
              value={jsonYaml.right}
              onMount={handleOnMount('right')}
              onChange={handleOnChangeRight}
            />
          </Box>
        </Box>
      </Box>
    </DrawerRoute>
  );
}

export default JsonYamlEditor;
