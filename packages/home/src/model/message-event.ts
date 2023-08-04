export enum MessageTo {
  popup = 'popup',
  contentScript = 'contentScript',
  background = 'background',
}

export enum MessageMethod {}

export interface MessageEvent<T = undefined> {
  to: MessageTo;
  method: MessageMethod;
  data?: T;
}
