import { getCurrentTab, onMessage, sendMessageByCurrentTab, registerContentScripts } from './chrome';
import { getScreenWidthHeight } from './element';
import { mathCenterRect, mathExtraRect } from './helper';

export type { ChromeTab } from './chrome';
export type { Rect, Point } from './helper';

export {
  getCurrentTab,
  onMessage,
  sendMessageByCurrentTab,
  registerContentScripts,
  getScreenWidthHeight,
  mathCenterRect,
  mathExtraRect,
};
