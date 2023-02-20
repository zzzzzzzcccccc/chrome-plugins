import React, { useEffect, useState } from 'react';
import { Mask, Screenshot } from '../components';
import { getScreenWidthHeight } from '@chrome-plugin/common';
import { useInjectContext } from '../context';

export default function App() {
  const [scrollLayout, setScrollLayout] = useState<{ width: number; height: number }>(getScreenWidthHeight());
  const { moveEnd, moving } = useInjectContext();

  useEffect(() => {
    let timer: NodeJS.Timer | null = null;
    const removeTiler = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const rb = new ResizeObserver(() => {
      removeTiler();
      timer = setTimeout(() => {
        setScrollLayout((prev) => ({ ...prev, ...getScreenWidthHeight() }));
      }, 500);
    });

    rb.observe(document.body);

    return () => {
      removeTiler();
      rb.unobserve(document.body);
    };
  }, []);

  return (
    <>
      <Mask
        style={{
          zIndex: 9999999,
          ...scrollLayout,
          cursor: 'crosshair',
          backgroundColor: moveEnd || moving ? 'transparent' : 'rgb(0, 0, 0, 0.3)',
        }}
      >
        <Screenshot />
      </Mask>
    </>
  );
}
