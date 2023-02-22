import {
  getCurrentTab,
  onMessage,
  sendMessageByCurrentTab,
  sendMessageByRunTime,
  registerContentScripts,
  captureVisibleTab,
} from './chrome';
export type {
  ChromeTab,
  RegisteredContentScript,
  CaptureVisibleTabOptions,
  MessageSender,
  SendResponse,
} from './chrome';

import { getScreenWidthHeight } from './element';

import { mathCenterRect, mathExtraRect, cutImage, downloadFile } from './helper';
export type { Rect, Point } from './helper';

export {
  getCurrentTab,
  onMessage,
  sendMessageByCurrentTab,
  sendMessageByRunTime,
  registerContentScripts,
  captureVisibleTab,
  getScreenWidthHeight,
  mathCenterRect,
  mathExtraRect,
  cutImage,
  downloadFile,
};
