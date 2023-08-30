import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useInitialize } from '../../hooks';
import CanvasImage from './canvas-image';

function EditorArea() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { pushOnResizeHandler } = useInitialize();
  const [boxRect, setBoxRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current;
      }
    };
    const handler = () => {
      clearTimer();
      timerRef.current = setTimeout(() => {
        if (boxRef.current) {
          setBoxRect(boxRef.current.getBoundingClientRect());
        }
      }, 500);
    };
    const unbind = pushOnResizeHandler(handler);

    handler();

    return () => {
      clearTimer();
      unbind();
    };
  }, [pushOnResizeHandler]);

  return (
    <Box ref={boxRef} sx={{ flex: 1, width: '100%' }}>
      {boxRect && <CanvasImage width={boxRect.width} height={boxRect.height} />}
    </Box>
  );
}

export default EditorArea;
