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
      iv: CryptoJS.enc.Utf8.parse(aes.iv),
      // @ts-ignore
      mode: CryptoJS.mode[aes.mode],
      // @ts-ignore
      padding: CryptoJS.pad[aes.pad],
    }),
    [aes],
  );

  const textStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : undefined,
  };

  const handleLeftOnchange = (v: string) => {
    dispatch(setAes({ left: v }));
    try {
      dispatch(setAes({ right: CryptoJS.AES.encrypt(v, aes.secret, cfg).toString() }));
    } catch (e) {
      return null;
    }
  };

  const handleRightOnChange = (v: string) => {
    dispatch(setAes({ right: v }));
    try {
      dispatch(setAes({ left: CryptoJS.AES.decrypt(v, aes.secret, cfg).toString(CryptoJS.enc.Utf8) }));
    } catch (e) {
      return null;
    }
  };

  const beforeOnChange = () => {
    if (aes.left) {
      handleLeftOnchange(aes.left);
      return;
    }
    if (aes.right) {
      handleRightOnChange(aes.right);
    }
  };

  const handleModeOnChange = (event: SelectChangeEvent) => {
    dispatch(setAes({ mode: event.target.value }));
    beforeOnChange();
  };

  const handlePadOnChange = (event: SelectChangeEvent) => {
    dispatch(setAes({ pad: event.target.value }));
    beforeOnChange();
  };

  const handleSecretOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAes({ secret: event.target.value }));
    beforeOnChange();
  };

  const handleIvOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAes({ iv: event.target.value }));
    beforeOnChange();
  };

  const renderMode = () => {
    return (
      <FormControl>
        <InputLabel id="aes-mode">{t('develop.aes.mode')}</InputLabel>
        <Select
          labelId="aes-mode"
          label={t('develop.aes.mode')}
          value={aes.mode}
          size="small"
          onChange={handleModeOnChange}
        >
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
        <InputLabel id="aes-pad">{t('develop.aes.pad')}</InputLabel>
        <Select
          labelId="aes-pad"
          label={t('develop.aes.pad')}
          value={aes.pad}
          size="small"
          onChange={handlePadOnChange}
        >
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
          label={t('develop.aes.secret')}
          size="small"
          onChange={handleSecretOnChange}
        />
      </FormControl>
    );
  };

  const renderIv = () => {
    return (
      <FormControl>
        <TextField
          variant="outlined"
          value={aes.iv}
          label={t('develop.aes.iv')}
          size="small"
          onChange={handleIvOnChange}
        />
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
