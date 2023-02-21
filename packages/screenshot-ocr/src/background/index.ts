import { captureVisibleTab, onMessage } from '@chrome-plugin/common';
import { MessageEvent, MessageMethod, MessageTo } from '../model';

onMessage<MessageEvent, string>((msg, messageSender, sendResponse) => {
  if (msg.to === MessageTo.background) {
    switch (msg.method) {
      case MessageMethod.captureVisibleTab:
        captureVisibleTab().then((s) => {
          sendResponse(s);
        });
        break;
      default:
        return null;
    }
  }
});
