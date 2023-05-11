import React, { useMemo } from 'react';
import DrawerRoute from '../drawer-route';
import { Box, Select, MenuItem, InputLabel, FormControl, TextField, SelectChangeEvent } from '@mui/material';
import { setAes } from '../../store/slices/app-slice';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import CryptoJS from 'crypto-js';

export default function AESEditor() {
  const { globalStyle, isDark } = useTheme();
  const t = useTranslation();
  const { aes } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const cfg = useMemo(
    () => ({
      iv: CryptoJS.enc.Hex.parse(aes.iv),
      mode: (CryptoJS.mode as any)[aes.mode],
      padding: (CryptoJS.pad as any)[aes.pad],
    }),
    [aes],
  );

  const textStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : undefined,
  };

  const handleLeftOnchange = (v: string, { secret = aes.secret, ...aesCfg }: Record<string, any> = {}) => {
    dispatch(setAes({ left: v }));
    try {
      dispatch(setAes({ right: CryptoJS.AES.encrypt(v, secret, { ...cfg, ...aesCfg }).toString() }));
    } catch (e) {
      return null;
    }
  };

  const handleRightOnChange = (v: string, { secret = aes.secret, ...aesCfg }: Record<string, any> = {}) => {
    dispatch(setAes({ right: v }));
    try {
      dispatch(setAes({ left: CryptoJS.AES.decrypt(v, secret, { ...cfg, ...aesCfg }).toString(CryptoJS.enc.Utf8) }));
    } catch (e) {
      return null;
    }
  };

  const afterOnChange = (options: Record<string, any> = {}) => {
    if (aes.left) {
      handleLeftOnchange(aes.left, options);
      return;
    }
    if (aes.right) {
      handleRightOnChange(aes.right, options);
    }
  };

  const handleModeOnChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    dispatch(setAes({ mode: value }));
    afterOnChange({ mode: (CryptoJS.mode as any)[value] });
  };

  const handlePadOnChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    dispatch(setAes({ pad: value }));
    afterOnChange({ pad: (CryptoJS.pad as any)[value] });
  };

  const handleSecretOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setAes({ secret: value }));
    afterOnChange({ secret: value });
  };

  const handleIvOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setAes({ iv: value }));
    afterOnChange({ iv: CryptoJS.enc.Hex.parse(value) });
  };

  const renderMode = () => {
    return (
      <FormControl>
        <InputLabel id="aes-mode">{t('mode')}</InputLabel>
        <Select labelId="aes-mode" label={t('mode')} value={aes.mode} size="small" onChange={handleModeOnChange}>
          <MenuItem value="CBC">CBC</MenuItem>
          <MenuItem value="CFB">CFB</MenuItem>
          <MenuItem value="OFB">OFB</MenuItem>
          <MenuItem value="ECB">ECB</MenuItem>
          <MenuItem value="CFB">CFB</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const renderPad = () => {
    return (
      <FormControl>
        <InputLabel id="aes-pad">{t('pad')}</InputLabel>
        <Select labelId="aes-pad" label={t('pad')} value={aes.pad} size="small" onChange={handlePadOnChange}>
          <MenuItem value="Pkcs7">Pkcs7</MenuItem>
          <MenuItem value="AnsiX923">AnsiX923</MenuItem>
          <MenuItem value="Iso10126">Iso10126</MenuItem>
          <MenuItem value="Iso97971">Iso97971</MenuItem>
          <MenuItem value="ZeroPadding">ZeroPadding</MenuItem>
          <MenuItem value="NoPadding">NoPadding</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const renderSecret = () => {
    return (
      <FormControl>
        <TextField
          variant="outlined"
          value={aes.secret}
          label={t('secret')}
          size="small"
          onChange={handleSecretOnChange}
        />
      </FormControl>
    );
  };

  const renderIv = () => {
    return (
      <FormControl>
        <TextField variant="outlined" value={aes.iv} label={t('iv')} size="small" onChange={handleIvOnChange} />
      </FormControl>
    );
  };

  return (
    <DrawerRoute title={t('develop.aes')}>
      <Box sx={{ p: 1, ...globalStyle.frc }}>
        {renderMode()}
        {renderPad()}
        {renderSecret()}
        {renderIv()}
      </Box>
      <Box sx={{ flex: 1, ...globalStyle.fr }}>
        <textarea style={textStyle} value={aes.left} onChange={(e) => handleLeftOnchange(e.target.value)} />
        <textarea style={textStyle} value={aes.right} onChange={(e) => handleRightOnChange(e.target.value)} />
      </Box>
    </DrawerRoute>
  );
}
