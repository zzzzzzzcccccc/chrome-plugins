import React, { useRef, useEffect } from 'react';
import { useOCRResultContext } from '../../context';
import { Wrapper } from './styled';
import * as ocr from '@paddlejs-models/ocrdet';

export default function OCRResultApp() {
  const { url, width, height } = useOCRResultContext();
  const imageRef = useRef<HTMLImageElement | null>(null);

  const mounted = async () => {
    if (!imageRef.current) return;
    await ocr.load();
    const result = await ocr.detect(imageRef.current);
    console.log(result);
  };

  useEffect(() => {
    mounted();
  }, []);

  return (
    <Wrapper>
      <img src={url} style={{ width, height }} ref={imageRef} />
    </Wrapper>
  );
}
