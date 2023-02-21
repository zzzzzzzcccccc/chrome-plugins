export enum MessageTo {
  popup = 'popup',
  contentScript = 'contentScript',
  background = 'background',
}

export enum MessageMethod {
  createCustomScreenShot = 'createCustomScreenShot',
  captureVisibleTab = 'captureVisibleTab',
}

export interface MessageEvent<T = undefined> {
  to: MessageTo;
  method: MessageMethod;
  data?: T;
}
