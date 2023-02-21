import inject from './inject';
import { onMessage } from '@chrome-plugin/common';
import { MessageEvent, MessageMethod, MessageTo } from '../model';

onMessage<MessageEvent>((msg, _, sendResponse) => {
  if (msg.to === MessageTo.contentScript) {
    switch (msg.method) {
      case MessageMethod.createCustomScreenShot:
        inject.create();
        sendResponse(undefined);
        break;
      default:
        return null;
    }
  }
});
