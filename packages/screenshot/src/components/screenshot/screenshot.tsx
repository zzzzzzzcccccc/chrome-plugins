import React, { useRef } from 'react';
import { ScreenshotProps } from '.';
import { useScreenshot } from '../../hooks';
import { cssPrefix, Wrapper } from './styled';
import { useInjectContext } from '../../context';
import { Rect } from '@chrome-plugin/common';
import { screenshotEnd } from './helper';

export default function Screenshot(props: ScreenshotProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);

  const { updateContext, moveEnd, moving, remove } = useInjectContext();

  const handleOnMoving = () => {
    if (!moving) {
      updateContext?.({ moveEnd: false, moving: true });
    }
  };

  const handleOnMoveEnd = async (centerRect: Rect) => {
    updateContext?.({ moveEnd: true, moving: false });
    if (!centerRef.current) return;
    await screenshotEnd(centerRect, centerRef.current);
    remove?.();
  };

  const { handleOnMouseStart, centerRect, extraRect } = useScreenshot({
    target: targetRef.current,
    onMoving: handleOnMoving,
    onMoveEnd: handleOnMoveEnd,
    disabled: moveEnd,
  });

  return (
    <Wrapper ref={targetRef} onMouseDown={handleOnMouseStart}>
      {(Object.keys(extraRect) as Array<keyof typeof extraRect>).map((key) => (
        <div
          role={`screenshot-${key}`}
          key={key}
          className={`${cssPrefix}-item ${cssPrefix}-${key}`}
          style={{ ...extraRect[key] }}
        />
      ))}
      <div
        role="screenshot-center"
        className={`${cssPrefix}-item ${cssPrefix}-center`}
        style={{ ...centerRect }}
        ref={centerRef}
      />
      {props.children}
    </Wrapper>
  );
}
