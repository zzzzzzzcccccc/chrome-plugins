import React, { useMemo } from 'react';
import DrawerRoute from '../drawer-route';
import { useStoreDispatch, useStoreSelector, useTheme, useTranslation } from '../../hooks';
import { setUrlParse } from '../../store/slices/app-slice';
import TagInput from '../tag-input';
import { Box } from '@mui/material';
import { parseURL } from '../../utils';
import CodeEditor from '../code-editor';

function UrlParse() {
  const t = useTranslation();
  const dispatch = useStoreDispatch();
  const { globalStyle } = useTheme();
  const { urlParse } = useStoreSelector((state) => state.app);

  const right = useMemo(() => {
    try {
      return JSON.stringify(urlParse.result, null, 2);
    } catch (e) {
      return '';
    }
  }, [urlParse.result]);

  const handleLeftOnChange = (v: string[]) => {
    dispatch(
      setUrlParse({
        list: v,
        result: v.map((url) => {
          const record = parseURL(url);
          return {
            url,
            validate: !!record,
            protocol: record?.protocol || '',
            domain: record?.domain || '',
            queryParams: record?.queryParams || [],
          };
        }),
      }),
    );
  };

  return (
    <DrawerRoute title={t('develop.url_parse')}>
      <Box sx={{ ...globalStyle.fc, flex: 1, overflow: 'hidden' }}>
        <Box sx={{ ...globalStyle.fr, flex: 1 }}>
          <Box sx={{ width: '50%', height: '100%' }}>
            <Box sx={{ width: '100%', height: '100%', p: 1 }}>
              <TagInput inputProps={{ autoFocus: true }} value={urlParse.list} onChange={handleLeftOnChange} />
            </Box>
          </Box>
          <Box sx={{ width: '50%', height: '100%', overflow: 'hidden' }}>
            <CodeEditor language="json" value={right} options={{ readOnly: true }} />
          </Box>
        </Box>
      </Box>
    </DrawerRoute>
  );
}

export default UrlParse;
