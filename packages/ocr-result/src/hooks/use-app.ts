import { useRef, useState, useEffect } from 'react';
import { sleep } from '@chrome-plugin/common';
import * as ocr from '@paddle-js-models/ocr';

type ImageMetaData = { width: number; height: number; base64: string; target: string };

const getSourceData = () => {
  const sourceDom = document.getElementById('source-message') as HTMLTextAreaElement;
  if (!sourceDom || !sourceDom.value) {
    return null;
  }
  return JSON.parse(sourceDom.value) as ImageMetaData;
};

export default function useApp() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imageMetaData, setImageMetaData] = useState<ImageMetaData | null>(null);
  const [loadingModel, setLoadingModel] = useState(true);
  const [loadingOcr, setLoadingOcr] = useState(false);
  const [ocrText, setOcrText] = useState('');

  useEffect(() => {
    const ocrImage = async () => {
      if (!imageRef.current || !canvasRef.current) {
        return '';
      }
      setLoadingOcr(true);
      const res = await ocr.recognize(imageRef.current as HTMLImageElement, {
        canvas: canvasRef.current as HTMLCanvasElement,
      });
      setLoadingOcr(false);
      if (res.text?.length) {
        return res.text.reduce((all, cur) => all + `<p>${cur}</p>`);
      }
      return '';
    };

    const mounted = async () => {
      if (!imageRef.current || imageRef.current.src) return;
      await sleep(2000);
      setImageMetaData(getSourceData());
      await ocr.init();
      setLoadingModel(false);
      const text = await ocrImage();
      setOcrText(text);
    };

    mounted();
  }, []);

  return {
    imageMetaData,
    imageRef,
    canvasRef,
    loadingModel,
    loadingOcr,
    ocrText,
  };
}
