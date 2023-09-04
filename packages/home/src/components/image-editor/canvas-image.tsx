import React, { useEffect, useRef } from 'react';
import { imagePixiImageEditorInstance } from '../../utils';
import { CanvasImageProps } from './types';
import { useTheme } from '../../hooks';

function CanvasImage(props: CanvasImageProps) {
  const { width, height } = props;
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        imagePixiImageEditorInstance.pushImage(files[i]);
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const app = imagePixiImageEditorInstance.createApp({ theme });

    app?.view && containerRef.current.appendChild(app.view as any);

    return () => {
      imagePixiImageEditorInstance.destroy();
    };
  }, [theme]);

  return <div style={{ width, height }} ref={containerRef} onDragOver={handleOnDragOver} onDrop={handleOnDrop} />;
}

export default CanvasImage;
