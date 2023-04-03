import * as monaco from 'monaco-editor';
import { Monaco } from '@monaco-editor/react';

export interface CodeEditorProps {
  value?: string;
  language?: string;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => void;
  onChange?: (value: string, ev: monaco.editor.IModelContentChangedEvent) => void;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
}
