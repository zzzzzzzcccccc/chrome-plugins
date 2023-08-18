import { onMessage } from '@chrome-plugin/common';
import { ChromeMessage, ChromeMessageTo, ChromeMessageMethod } from '../model';

(function () {
  const enabledMapper = new Map<number, boolean>();

  onMessage<ChromeMessage<{ checked?: boolean; id: number }>, any>((message, messageSender, sendResponse) => {
    if (message.to === ChromeMessageTo.BACKGROUND) {
      switch (message.method) {
        case ChromeMessageMethod.UPDATE_HTTP_BLOCKING_ENABLED:
          enabledMapper.set(message.data.id, !!message.data?.checked);
          sendResponse(enabledMapper.get(message.data.id));
          break;
        case ChromeMessageMethod.GET_HTTP_BLOCKING_ENABLED:
          sendResponse(enabledMapper.get(message.data.id));
          break;
      }
    }
  });
})();
