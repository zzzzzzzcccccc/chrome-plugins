import React from 'react';
import DrawerRoute from '../drawer-route';
import { useStoreDispatch, useStoreSelector, useTheme, useTranslation } from '../../hooks';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { setCss } from '../../store/slices/app-slice';
import CodeEditor from '../code-editor';
import { transformToCss } from '../../utils';

function CssEditor() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { css } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const handleOnChangeLeft = async (v: string, { mode = css.mode, inline = css.inline }: Record<string, any> = {}) => {
    try {
      dispatch(
        setCss({
          left: v,
          right: await transformToCss({ target: v, mode, inline }),
          inline,
        }),
      );
    } catch (e) {
      return null;
    }
  };

  const handleModeOnChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    dispatch(
      setCss({
        left: '',
        right: '',
        mode: value,
      }),
    );
  };

  const handleInlineOnChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    return handleOnChangeLeft(css.left, { inline: value === '1' });
  };

  const renderMode = () => {
    return (
      <FormControl>
        <InputLabel id="css-mode">{t('css_preprocessor')}</InputLabel>
        <Select
          sx={{ width: 160 }}
          labelId="css-mode"
          label={t('css_preprocessor')}
          value={css.mode}
          size="small"
          onChange={handleModeOnChange}
        >
          <MenuItem value="less">Less</MenuItem>
          <MenuItem value="sass">Sass</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const renderInline = () => {
    return (
      <FormControl>
        <InputLabel id="css-mode">{t('css_inline')}</InputLabel>
        <Select
          sx={{ width: 160 }}
          labelId="css-mode"
          label={t('css_inline')}
          value={css.inline ? '1' : '0'}
          size="small"
          onChange={handleInlineOnChange}
        >
          <MenuItem value="1">{t('on')}</MenuItem>
          <MenuItem value="0">{t('off')}</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <DrawerRoute title={t('develop.css_editor')}>
      <Box sx={{ ...globalStyle.fr, p: 1 }}>
        {renderMode()}
        {renderInline()}
      </Box>
      <Box sx={{ flex: 1, ...globalStyle.fr }}>
        <Box sx={{ flex: 1, height: '100%' }}>
          <CodeEditor language="less" value={css.left} onChange={handleOnChangeLeft} />
        </Box>
        <Box sx={{ flex: 1, height: '100%' }}>
          <CodeEditor language="less" value={css.right} options={{ readOnly: true }} />
        </Box>
      </Box>
    </DrawerRoute>
  );
}

export default CssEditor;
