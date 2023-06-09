import React, { useMemo } from 'react';
import DrawerRoute from '../drawer-route';
import { Box, FormControl, TextField } from '@mui/material';
import { setRabbit } from '../../store/slices/app-slice';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch } from '../../hooks';
import CryptoJS from 'crypto-js';

export default function RabbitEditor() {
  const { globalStyle, isDark } = useTheme();
  const t = useTranslation();
  const { rabbit } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const cfg = useMemo(
    () => ({
      iv: CryptoJS.enc.Hex.parse(rabbit.iv),
    }),
    [rabbit],
  );

  const textStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : undefined,
  };

  const handleLeftOnchange = (v: string, { secret = rabbit.secret, ...rabbitCfg }: Record<string, any> = {}) => {
    try {
      dispatch(setRabbit({ left: v, right: CryptoJS.Rabbit.encrypt(v, secret, { ...cfg, ...rabbitCfg }).toString() }));
    } catch (e) {
      return null;
    }
  };

  const handleRightOnChange = (v: string, { secret = rabbit.secret, ...rabbitCfg }: Record<string, any> = {}) => {
    try {
      dispatch(
        setRabbit({
          left: CryptoJS.Rabbit.decrypt(v, secret, { ...cfg, ...rabbitCfg }).toString(CryptoJS.enc.Utf8),
          right: v,
        }),
      );
    } catch (e) {
      return null;
    }
  };

  const afterOnChange = (options: Record<string, any> = {}) => {
    if (rabbit.left) {
      handleLeftOnchange(rabbit.left, options);
      return;
    }
    if (rabbit.right) {
      handleRightOnChange(rabbit.right, options);
    }
  };

  const handleSecretOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setRabbit({ secret: value }));
    afterOnChange({ secret: value });
  };

  const handleIvOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setRabbit({ iv: value }));
    afterOnChange({ iv: CryptoJS.enc.Hex.parse(value) });
  };

  const renderSecret = () => {
    return (
      <FormControl>
        <TextField
          variant="outlined"
          value={rabbit.secret}
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
        <TextField variant="outlined" value={rabbit.iv} label={t('iv')} size="small" onChange={handleIvOnChange} />
      </FormControl>
    );
  };

  return (
    <DrawerRoute title={t('develop.rabbit')}>
      <Box sx={{ ...globalStyle.frc, p: 1 }}>
        {renderSecret()}
        {renderIv()}
      </Box>
      <Box sx={{ ...globalStyle.fr, flex: 1 }}>
        <textarea style={textStyle} value={rabbit.left} onChange={(e) => handleLeftOnchange(e.target.value)} />
        <textarea style={textStyle} value={rabbit.right} onChange={(e) => handleRightOnChange(e.target.value)} />
      </Box>
    </DrawerRoute>
  );
}
