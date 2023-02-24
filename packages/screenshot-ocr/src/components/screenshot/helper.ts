import {
  canvasToBlob,
  ChromeWindowCreateData,
  cutImage,
  Rect,
  sendMessageByRunTime,
  ChromeWindow,
} from '@chrome-plugin/common';
import { MessageEvent, MessageMethod, MessageTo } from '../../model';

export async function screenshotEnd(centerRect: Rect, centerElement: HTMLDivElement): Promise<ChromeWindow> {
  centerElement.style.border = '0';

  const screenImgUrl = await sendMessageByRunTime<MessageEvent, string>({
    to: MessageTo.background,
    method: MessageMethod.captureVisibleTab,
  });

  const { innerWidth, innerHeight } = window;
  const [ocrW, ocrH] = [Math.floor(innerWidth * 0.8), Math.floor(innerHeight * 0.8)];
  const [ocrL, ocrT] = [Math.floor((innerWidth - ocrW) / 2), Math.floor(innerHeight - ocrH)];
  const { left = 0, top = 0, width = 0, height = 0 } = centerElement.getBoundingClientRect() || {};

  const canvas = await cutImage(screenImgUrl, [left, top], [width, height]);
  const url = await canvasToBlob(canvas);
  return await sendMessageByRunTime<MessageEvent<ChromeWindowCreateData>, ChromeWindow>({
    to: MessageTo.background,
    method: MessageMethod.openOCRResult,
    data: {
      width: ocrW,
      height: ocrH,
      top: ocrT,
      left: ocrL,
      type: 'popup',
      url: `/ocr-result.html?url=${encodeURIComponent(url)}&width=${centerRect.width}&height=${centerRect.height}`,
    },
  });
}
