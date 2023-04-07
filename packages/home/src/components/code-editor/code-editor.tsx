import React from 'react';
import * as monaco from 'monaco-editor';
import MonacoEditor, { loader, Monaco } from '@monaco-editor/react';
import { useTranslation, useTheme } from '../../hooks';
import { CodeEditorProps } from './types';

loader.config({
  paths: {
    vs: 'vs',
  },
});

const initialOptions: CodeEditorProps['options'] = {
  minimap: {
    enabled: false,
  },
  tabSize: 2,
};

export default function CodeEditor(props: CodeEditorProps) {
  const { value = '', language, onMount, onChange, options = initialOptions } = props;

  const t = useTranslation();
  const { isDark } = useTheme();

  const handleOnMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    onMount?.(editor, monaco);
  };

  const handleOnChange = (value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) => {
    onChange?.(value || '', ev);
  };

  return (
    <MonacoEditor
      loading={t('loading')}
      language={language}
      value={value}
      theme={isDark ? 'vs-dark' : 'light'}
      options={options}
      onMount={handleOnMount}
      onChange={handleOnChange}
    />
  );
}
