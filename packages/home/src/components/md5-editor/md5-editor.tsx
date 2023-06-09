import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box } from '@mui/material';
import { setMd5 } from '../../store/slices/app-slice';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import CryptoJS from 'crypto-js';

export default function MD5Editor() {
  const { globalStyle, isDark } = useTheme();
  const t = useTranslation();
  const { md5 } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const textStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : undefined,
  };

  const handleLeftOnchange = (v: string) => {
    try {
      dispatch(setMd5({ left: v, right: CryptoJS.MD5(v).toString() }));
    } catch (e) {
      return null;
    }
  };

  return (
    <DrawerRoute title={t('develop.md5')}>
      <Box sx={{ ...globalStyle.fr, flex: 1 }}>
        <textarea style={textStyle} value={md5.left} onChange={(e) => handleLeftOnchange(e.target.value)} />
        <textarea style={textStyle} value={md5.right} readOnly />
      </Box>
    </DrawerRoute>
  );
}
