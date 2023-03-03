import { useRef, useState, useEffect } from 'react';
import { sleep, copy } from '@chrome-plugin/common';
import * as ocr from '@paddle-js-models/ocr';
import { ImageMetaData, getSourceData } from '../helper';

export default function useApp() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [imageMetaData, setImageMetaData] = useState<ImageMetaData | null>(null);
  const [loadingModel, setLoadingModel] = useState(true);
  const [loadingOcr, setLoadingOcr] = useState(false);
  const [ocrResult, setOcrResult] = useState({ text: '', htmlText: '' });

  const copyText = () => {
    if (textRef.current) {
      const text = textRef.current?.innerText.replace(/ /g, '');
      if (text) {
        copy(text);
      }
    }
  };

  const copyHtmlText = () => copy(ocrResult.htmlText);

  useEffect(() => {
    const ocrImage = async () => {
      const result = {
        text: '',
        htmlText: '',
      };
      if (!imageRef.current || !canvasRef.current) {
        return result;
      }
      setLoadingOcr(true);
      const res = await ocr.recognize(imageRef.current as HTMLImageElement, {
        canvas: canvasRef.current as HTMLCanvasElement,
      });
      setLoadingOcr(false);
      if (res.text?.length) {
        result.text = res.text.reduce((all, cur) => all + cur);
        result.htmlText = res.text.reduce((all, cur) => all + `<p>${cur}</p>`);
      }
      return result;
    };

    const mounted = async () => {
      await sleep(2000);
      setImageMetaData(getSourceData());
      await ocr.init();
      setLoadingModel(false);
      const result = await ocrImage();
      setOcrResult(result);
      await sleep(2000);
      copyText();
    };

    mounted();
  }, []);

  return {
    imageMetaData,
    imageRef,
    canvasRef,
    textRef,
    loadingModel,
    loadingOcr,
    ocrResult,
    copyText,
    copyHtmlText,
  };
}
