import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useStoreSelector, useToast } from '../../hooks';

export default function Toast() {
  const { close } = useToast();
  const {
    snackbar: { open, delay, type, message, origin },
  } = useStoreSelector((state) => state.feedback);

  const handleOnClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    close();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={delay}
      message={type ? null : message}
      onClose={handleOnClose}
      anchorOrigin={origin}
    >
      {type && (
        <Alert severity={type} onClose={handleOnClose}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
}
