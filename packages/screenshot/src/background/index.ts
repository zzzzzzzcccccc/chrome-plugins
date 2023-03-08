import {
  captureVisibleTab,
  onMessage,
  createWindow,
  ChromeWindowCreateData,
  ChromeWindow,
  createContextMenus,
  onContextMenus,
  sendMessageByCurrentTab,
} from '@chrome-plugin/common';
import { MessageEvent, MessageMethod, MessageTo } from '../model';

const ContextMenusID = 'Screenshot_and_OCR';

createContextMenus({
  title: 'Screenshot and OCR',
  contexts: ['all'],
  id: ContextMenusID,
});

onContextMenus(async (data) => {
  if (data.menuItemId === ContextMenusID) {
    try {
      await sendMessageByCurrentTab<MessageEvent>({
        to: MessageTo.contentScript,
        method: MessageMethod.createCustomScreenShot,
      });
    } catch (e) {
      console.log('screenshot bg sending to content script', e);
    }
  }
});

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
