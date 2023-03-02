import inject from './inject';
import { onMessage, getLocalStorage } from '@chrome-plugin/common';
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

async function handleImageOCR() {
  const localData = await getLocalStorage(['base64', 'width', 'height', 'target']);
  const source = document.getElementById('source-message') as HTMLTextAreaElement;
  if (!localData || window.location.href.indexOf(localData.target) === -1 || !source) {
    return;
  }
  source.value = JSON.stringify(localData);
}

handleImageOCR();
