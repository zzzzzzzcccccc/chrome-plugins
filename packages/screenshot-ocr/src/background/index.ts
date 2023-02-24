import {
  captureVisibleTab,
  onMessage,
  createWindow,
  ChromeWindowCreateData,
  ChromeWindow,
} from '@chrome-plugin/common';
import { MessageEvent, MessageMethod, MessageTo } from '../model';

onMessage<MessageEvent<ChromeWindowCreateData>, string | ChromeWindow>((msg, messageSender, sendResponse) => {
  if (msg.to === MessageTo.background) {
    switch (msg.method) {
      case MessageMethod.captureVisibleTab:
        captureVisibleTab().then((s) => {
          sendResponse(s);
        });
        break;
      case MessageMethod.openOCRResult:
        createWindow({
          url: 'ocr-result.html',
          focused: true,
          ...msg.data,
        }).then((w) => {
          sendResponse(w as ChromeWindow);
        });
        break;
      default:
        return null;
    }
  }
});
