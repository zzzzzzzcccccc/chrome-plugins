import {
  getCurrentTab,
  onMessage,
  sendMessageByCurrentTab,
  sendMessageByRunTime,
  registerContentScripts,
  captureVisibleTab,
  createWindow,
  getRuntimeURL,
  setLocalStorage,
  getLocalStorage,
  createContextMenus,
  onContextMenus,
  onInstalled,
} from './chrome';
export type {
  ChromeTab,
  RegisteredContentScript,
  CaptureVisibleTabOptions,
  MessageSender,
  SendResponse,
  ChromeWindow,
  ChromeWindowCreateData,
  ChromeOnClickData,
} from './chrome';

import { getScreenWidthHeight, canvasToBlob, canvasToBase64 } from './element';

import {
  mathCenterRect,
  mathExtraRect,
  getLoadedImage,
  cutImage,
  downloadFile,
  getQueryVariable,
  sleep,
  copy,
} from './helper';
export type { Rect, Point } from './helper';

export {
  getCurrentTab,
  onMessage,
  sendMessageByCurrentTab,
  sendMessageByRunTime,
  registerContentScripts,
  captureVisibleTab,
  createWindow,
  getRuntimeURL,
  setLocalStorage,
  getLocalStorage,
  createContextMenus,
  onContextMenus,
  onInstalled,
  getScreenWidthHeight,
  canvasToBlob,
  canvasToBase64,
  mathCenterRect,
  mathExtraRect,
  getLoadedImage,
  cutImage,
  downloadFile,
  getQueryVariable,
  sleep,
  copy,
};
