export enum MessageTo {
  popup = 'popup',
  contentScript = 'contentScript',
  background = 'background',
  OCRResult = 'OCRResult',
}

export enum MessageMethod {
  createCustomScreenShot = 'createCustomScreenShot',
  captureVisibleTab = 'captureVisibleTab',
  openOCRResult = 'openOCRResult',
  imageOCR = 'imageOCR',
}

export interface MessageEvent<T = undefined> {
  to: MessageTo;
  method: MessageMethod;
  data?: T;
}
