import { onMessage } from '@chrome-plugin/common';
import { ChromeMessage, ChromeMessageMethod, ChromeMessageTo, HttpBlockingItem } from '../model';
import { CHROME_MESSAGE_NAME_SPACE } from '../constants';

(function () {
  onMessage<ChromeMessage<HttpBlockingItem[]>, any>((message, messageSender, sendResponse) => {
    if (message.to === ChromeMessageTo.CONTENT_SCRIPT) {
      switch (message.method) {
        case ChromeMessageMethod.REMOVE_HTTP_BLOCKING_RULES:
          window.postMessage({ [CHROME_MESSAGE_NAME_SPACE]: message }, '*');
          sendResponse(undefined);
          break;
        case ChromeMessageMethod.UPDATE_HTTP_BLOCKING_RULES:
          window.postMessage({ [CHROME_MESSAGE_NAME_SPACE]: message }, '*');
          sendResponse(undefined);
          break;
      }
    }
  });
})();
