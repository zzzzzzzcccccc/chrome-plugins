import React, { createContext, useState, useEffect, useRef } from 'react';
import { Drawer, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '../../hooks';

export interface DrawerData {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export interface IDrawerContext {
  visible: boolean;
  open: () => void;
  close: () => void;
  data: DrawerData;
  updateData: (payload: DrawerData) => void;
}

export const initialContext: IDrawerContext = {
  visible: false,
  open: () => console.warn('please using DrawerProvider first !!!'),
  close: () => console.warn('please using DrawerProvider first !!!'),
  data: {},
  updateData: () => console.warn('please using DrawerProvider first !!!'),
};

export const DrawerContext = createContext(initialContext);

export default function DrawerProvider({ children }: { children?: React.ReactNode }) {
  const { globalStyle } = useTheme();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(document.body.clientWidth);
  const [data, setData] = useState(initialContext.data);

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const updateData = (payload: DrawerData) => {
    setData((pre) => ({
      ...pre,
      ...payload,
    }));
  };

  const value = {
    visible,
    open,
    close,
    data,
    updateData,
  };

  useEffect(() => {
    const closeTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const handler = () => {
      closeTimer();
      timerRef.current = setTimeout(() => setWidth(document.body.clientWidth), 500);
    };

    const rb = new ResizeObserver(handler);

    rb.observe(document.body);

    return () => {
      rb.disconnect();
      closeTimer();
    };
  }, []);

  return (
    <DrawerContext.Provider value={value}>
      {children}
      <Drawer anchor="right" onClose={close} open={visible}>
        <Box sx={{ ...globalStyle.fcc, width: `${width * 0.8}px`, height: '100%' }}>
          <Box sx={{ ...globalStyle.frc, p: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
              {data.title}
            </Typography>
            <IconButton color="primary" onClick={close}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          {data.children}
        </Box>
      </Drawer>
    </DrawerContext.Provider>
  );
}
