import React from 'react';

export interface ConfirmDialogProps {
  open?: boolean;
  title?: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}
