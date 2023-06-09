import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box } from '@mui/material';
import { setBase64 } from '../../store/slices/app-slice';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import CryptoJS from 'crypto-js';

export default function Base64Editor() {
  const { globalStyle, isDark } = useTheme();
  const t = useTranslation();
  const { base64 } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const textStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : undefined,
  };

  const handleLeftOnchange = (v: string) => {
    try {
      dispatch(setBase64({ left: v, right: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(v)) }));
    } catch (e) {
      return null;
    }
  };

  const handleRightOnChange = (v: string) => {
    try {
      dispatch(setBase64({ left: CryptoJS.enc.Base64.parse(v).toString(CryptoJS.enc.Utf8), right: v }));
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.base64')}>
      <Box sx={{ ...globalStyle.fr, flex: 1 }}>
        <textarea style={textStyle} value={base64.left} onChange={(e) => handleLeftOnchange(e.target.value)} />
        <textarea style={textStyle} value={base64.right} onChange={(e) => handleRightOnChange(e.target.value)} />
      </Box>
    </DrawerRoute>
  );
}
