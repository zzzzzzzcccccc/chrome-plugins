import React, { useRef } from 'react';
import { ScreenshotProps } from '.';
import { useScreenshot } from '../../hooks';
import { Wrapper, cssPrefix } from './styled';
import { useInjectContext } from '../../context';

export default function Screenshot(props: ScreenshotProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);

  const { updateContext, moveEnd, moving } = useInjectContext();

  const { handleOnMouseStart, centerRect, extraRect } = useScreenshot({
    target: targetRef.current,
    onMoving: () => {
      if (!moving) {
        updateContext?.({ moveEnd: false, moving: true });
      }
    },
    onMoveEnd: () => {
      updateContext?.({ moveEnd: true, moving: false });
    },
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
