import React, { useRef } from 'react';
import { ScreenshotProps } from '.';
import { useScreenshot } from '../../hooks';
import { Wrapper, cssPrefix } from './styled';
import { useInjectContext } from '../../context';
import { sendMessageByRunTime } from '@chrome-plugin/common';
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
      // const currentRect = centerRef.current?.getBoundingClientRect()
      const { devicePixelRatio, innerWidth, innerHeight } = window;
      const image = new Image();
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      image.onload = () => {
        canvas.width = innerWidth * devicePixelRatio;
        canvas.height = innerHeight * devicePixelRatio;
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;
        context?.scale(devicePixelRatio, devicePixelRatio);
        context?.drawImage(image, 0, 0, innerWidth, innerHeight);

        const screenshotData = canvas.toDataURL('image/png');
        const link = document.createElement('a');

        link.download = 'screenshot.png';
        link.href = screenshotData;
        link.click();
      };
      image.src = screenImgUrl;
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
