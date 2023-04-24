import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Box, IconButton, Divider, Typography } from '@mui/material';
import { DrawerRouteProps } from './types';
import { useTheme, useAppNavigate } from '../../hooks';
import CloseIcon from '@mui/icons-material/Close';

export default function DrawerRoute(props: DrawerRouteProps) {
  const { title, children } = props;

  const { globalStyle } = useTheme();
  const { back } = useAppNavigate();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [width, setWidth] = useState(document.body.clientWidth);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    back();
  };

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, []);

  useEffect(() => {
    const removeTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const handler = () => {
      removeTimer();
      timerRef.current = setTimeout(() => setWidth(document.body.clientWidth), 500);
    };

    const rb = new ResizeObserver(handler);

    rb.observe(document.body);

    return () => {
      removeTimer();
      rb.disconnect();
    };
  }, []);

  return (
    <Drawer open={open} anchor="right" onClose={onClose}>
      <Box sx={{ ...globalStyle.fc, width, height: '100%' }}>
        <Box sx={{ ...globalStyle.frc, p: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
            {title}
          </Typography>
          <IconButton color="primary" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {children}
      </Box>
    </Drawer>
  );
}
