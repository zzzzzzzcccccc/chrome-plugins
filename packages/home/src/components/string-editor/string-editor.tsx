import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box } from '@mui/material';
import { setString } from '../../store/slices/app-slice';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';

export default function StringEditor() {
  const { globalStyle, isDark } = useTheme();
  const t = useTranslation();
  const { string } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const textStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : undefined,
  };

  const handleLeftOnChange = (v: string) => {
    dispatch(setString({ left: v }));
    try {
      dispatch(setString({ right: encodeURIComponent(v) }));
    } catch (e) {
      return null;
    }
  };

  const handleRightOnChange = (v: string) => {
    dispatch(setString({ right: v }));
    try {
      dispatch(setString({ left: decodeURIComponent(v) }));
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.string')}>
      <Box sx={{ ...globalStyle.fr, flex: 1 }}>
        <textarea style={textStyle} value={string.left} onChange={(e) => handleLeftOnChange(e.target.value)} />
        <textarea style={textStyle} value={string.right} onChange={(e) => handleRightOnChange(e.target.value)} />
      </Box>
    </DrawerRoute>
  );
}
