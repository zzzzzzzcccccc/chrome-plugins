import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ConfirmDialogProps } from './types';

function ConfirmDialog(props: ConfirmDialogProps) {
  const { open = false, title, body, action, onClose } = props;

  const handleOnClose = () => {
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}
      {body && (
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">{body}</DialogContentText>
        </DialogContent>
      )}
      {action && <DialogActions>{action}</DialogActions>}
    </Dialog>
  );
}

export default ConfirmDialog;
