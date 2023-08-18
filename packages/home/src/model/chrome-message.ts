export enum ChromeMessageTo {
  BACKGROUND = 'BACKGROUND',
  CONTENT_SCRIPT = 'CONTENT_SCRIPT',
}

export enum ChromeMessageMethod {
  UPDATE_HTTP_BLOCKING_RULES = 'UPDATE_HTTP_BLOCKING_RULES',
  REMOVE_HTTP_BLOCKING_RULES = 'REMOVE_HTTP_BLOCKING_RULES',
  UPDATE_HTTP_BLOCKING_ENABLED = 'UPDATE_HTTP_BLOCKING_ENABLED',
  GET_HTTP_BLOCKING_ENABLED = 'GET_HTTP_BLOCKING_ENABLED',
}

export interface ChromeMessage<Data = undefined> {
  to: ChromeMessageTo;
  method: ChromeMessageMethod;
  data: Data;
}
