import React, { useRef } from 'react';
import { ScreenshotProps } from '.';
import { useScreenshot } from '../../hooks';
import { Wrapper, cssPrefix } from './styled';
import { useInjectContext } from '../../context';
import { sendMessageByRunTime, cutImage, downloadFile } from '@chrome-plugin/common';
import { MessageTo, MessageEvent, MessageMethod } from '../../model';

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
    onMoveEnd: async () => {
      updateContext?.({ moveEnd: true, moving: false });
      if (!centerRef.current) return;
      const screenImgUrl = await sendMessageByRunTime<MessageEvent, string>({
        to: MessageTo.background,
        method: MessageMethod.captureVisibleTab,
      });
      const { left = 0, top = 0, width = 0, height = 0 } = centerRef.current?.getBoundingClientRect() || {};
      const canvas = await cutImage(screenImgUrl, [left, top], [width, height]);
      downloadFile(canvas.toDataURL('image/png'), 'screenshot.png');
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
