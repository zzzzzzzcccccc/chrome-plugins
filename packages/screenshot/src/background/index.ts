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
        captureVisibleTab().then(sendResponse);
        break;
      case MessageMethod.openOCRResult:
        createWindow({ ...msg.data }).then(sendResponse);
        break;
      default:
        return null;
    }
  }
});
