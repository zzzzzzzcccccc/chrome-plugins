import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box } from '@mui/material';
import { setLeftBase64, setRightBase64 } from '../../store/slices/app-slice';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import CryptoJS from 'crypto-js';

export default function Base64Editor() {
  const { globalStyle, isDark } = useTheme();
  const t = useTranslation();
  const { leftBase64, rightBase64 } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const textStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : undefined,
  };

  const handleLeftOnchange = (v: string) => {
    dispatch(setLeftBase64(v));
    try {
      dispatch(setRightBase64(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(v))));
    } catch (e) {
      return null;
    }
  };

  const handleRightOnChange = (v: string) => {
    dispatch(setRightBase64(v));
    try {
      dispatch(setLeftBase64(CryptoJS.enc.Base64.parse(v).toString(CryptoJS.enc.Utf8)));
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.base64')}>
      <Box sx={{ ...globalStyle.fr, flex: 1 }}>
        <textarea style={textStyle} value={leftBase64} onChange={(e) => handleLeftOnchange(e.target.value)} />
        <textarea style={textStyle} value={rightBase64} onChange={(e) => handleRightOnChange(e.target.value)} />
      </Box>
    </DrawerRoute>
  );
}
