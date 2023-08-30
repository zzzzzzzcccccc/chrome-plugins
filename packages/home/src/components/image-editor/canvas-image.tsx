import React, { useEffect, useRef } from 'react';
import { imagePixiImageEditorInstance } from '../../utils';
import { CanvasImageProps } from './types';

function CanvasImage(props: CanvasImageProps) {
  const { width, height } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = imagePixiImageEditorInstance.createApp();
    if (app?.view) {
      containerRef.current.appendChild(app.view as any);
    }

    return () => {
      imagePixiImageEditorInstance.destroy();
    };
  }, []);

  return <div style={{ width, height }} ref={containerRef}></div>;
}

export default CanvasImage;
