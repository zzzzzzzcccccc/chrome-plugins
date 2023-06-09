import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { setSha } from '../../store/slices/app-slice';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import CryptoJS from 'crypto-js';

export default function MD5Editor() {
  const { globalStyle, isDark } = useTheme();
  const t = useTranslation();
  const { sha } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const textStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : undefined,
  };

  const handleLeftOnchange = (v: string, { mode = sha.mode }: Record<string, any> = {}) => {
    try {
      dispatch(setSha({ left: v, right: (CryptoJS as any)[mode](v).toString() }));
    } catch (e) {
      return null;
    }
  };

  const afterOnChange = (options: Record<string, any> = {}) => {
    if (sha.left) {
      handleLeftOnchange(sha.left, options);
    }
  };

  const handleModeOnChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    dispatch(setSha({ mode: value }));
    afterOnChange({ mode: value });
  };

  const renderMode = () => {
    return (
      <FormControl>
        <InputLabel id="sha-mode">{t('mode')}</InputLabel>
        <Select labelId="sha-mode" label={t('mode')} value={sha.mode} size="small" onChange={handleModeOnChange}>
          <MenuItem value="SHA1">SHA-1</MenuItem>
          <MenuItem value="SHA224">SHA-224</MenuItem>
          <MenuItem value="SHA256">SHA-256</MenuItem>
          <MenuItem value="SHA384">SHA-384</MenuItem>
          <MenuItem value="SHA512">SHA-512</MenuItem>
          <MenuItem value="SHA3">SHA-3</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <DrawerRoute title={t('develop.sha')}>
      <Box sx={{ p: 1, ...globalStyle.frc }}>{renderMode()}</Box>
      <Box sx={{ ...globalStyle.fr, flex: 1 }}>
        <textarea style={textStyle} value={sha.left} onChange={(e) => handleLeftOnchange(e.target.value)} />
        <textarea style={textStyle} value={sha.right} readOnly />
      </Box>
    </DrawerRoute>
  );
}
