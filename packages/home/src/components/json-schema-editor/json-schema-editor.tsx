import React from 'react';
import DrawerRoute from '../drawer-route';
import { useStoreDispatch, useStoreSelector, useTheme, useTranslation } from '../../hooks';
import { setSchema } from '../../store/slices/app-slice';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
          right: await transformToSchema({ target: JSON.parse(v), mode }),
          mode,
        }),
      );
    } catch (e) {
      dispatch(setSchema({ left: v, right: '', mode }));
      return null;
    }
  };

  const handleModeOnChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    handleOnChangeLeft(schema.left, { mode: value });
  };

  const renderMode = () => {
    return (
      <FormControl>
        <InputLabel id="schema-mode">{t('mode')}</InputLabel>
        <Select
          sx={{ width: 200 }}
          labelId="schema-mode"
          label={t('mode')}
          value={schema.mode}
          size="small"
          onChange={handleModeOnChange}
        >
          <MenuItem value="json">Json</MenuItem>
          <MenuItem value="mysql">Mysql</MenuItem>
          <MenuItem value="generic">JsonMetaType</MenuItem>
          <MenuItem value="mongoose">Mongoose</MenuItem>
          <MenuItem value="bigquery">Bigquery</MenuItem>
          <MenuItem value="graphql">Graphql</MenuItem>
          <MenuItem value="typescript">Typescript</MenuItem>
          <MenuItem value="javascript">Javascript</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="kotlin">Kotlin</MenuItem>
          <MenuItem value="go">Go</MenuItem>
          <MenuItem value="rust">Rust</MenuItem>
          <MenuItem value="php">PHP</MenuItem>
          <MenuItem value="swift">Swift</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="c++">C++</MenuItem>
          <MenuItem value="csharp">C#</MenuItem>
          <MenuItem value="ruby">Ruby</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <DrawerRoute title={t('develop.json_schema_editor')}>
      <Box sx={{ ...globalStyle.fr, p: 1 }}>{renderMode()}</Box>
      <Box sx={{ flex: 1, ...globalStyle.fr }}>
        <Box sx={{ flex: 1, height: '100%' }}>
          <CodeEditor language="json" value={schema.left} onChange={handleOnChangeLeft} />
        </Box>
        <Box sx={{ flex: 1, height: '100%' }}>
          <CodeEditor language={getRightLanguage(schema.mode)} value={schema.right} options={{ readOnly: true }} />
        </Box>
      </Box>
    </DrawerRoute>
  );
}

function getRightLanguage(mode: string) {
  if (['generic', 'mongoose', 'bigquery'].indexOf(mode) > -1) {
    return 'json';
  }
  if (['c++'].indexOf(mode) > -1) {
    return 'cpp';
  }
  return mode;
}

export default JsonSchemaEditor;
