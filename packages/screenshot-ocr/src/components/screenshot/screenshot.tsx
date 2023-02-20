import React from 'react';
import { ScreenshotProps } from '.';
import useScreenshot from './hooks/use-screenshot';
import { Wrapper, cssPrefix } from './styled';

export default function Screenshot(props: ScreenshotProps) {
  const { handleOnMouseStart, targetRef, centerRef, centerRect, extraRect } = useScreenshot<HTMLDivElement>();
  return (
    <Wrapper ref={targetRef} onMouseDown={handleOnMouseStart}>
      <div role="screenshot-top" className={`${cssPrefix}-item ${cssPrefix}-top`} style={{ ...extraRect.top }} />
      <div role="screenshot-left" className={`${cssPrefix}-item ${cssPrefix}-left`} style={{ ...extraRect.left }} />
      <div role="screenshot-right" className={`${cssPrefix}-item ${cssPrefix}-right`} style={{ ...extraRect.right }} />
      <div
        role="screenshot-bottom"
        className={`${cssPrefix}-item ${cssPrefix}-bottom`}
        style={{ ...extraRect.bottom }}
      />
      <div
        role="screenshot-center"
        className={`${cssPrefix}-item ${cssPrefix}-center`}
        style={{ ...centerRect }}
        ref={centerRef}
      />
    </Wrapper>
  );
}
