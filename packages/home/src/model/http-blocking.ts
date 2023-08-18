export enum HttpResponseHeaderOperation {
  SET = 'set',
  APPEND = 'append',
}

export enum HttpBlockingActionType {
  MODIFY = 'modify',
}

export type HttpResponseHeader = {
  header: string;
  value: string;
  operation: HttpResponseHeaderOperation;
};

export type HttpBlockingAction = {
  type: HttpBlockingActionType;
  responseHeaders: HttpResponseHeader[];
  responseData: string;
};

export type HttpBlockingCondition = {
  regexFilter: string;
  requestMethods: string[];
};

export type HttpBlockingItem = {
  id: string;
  priority: number;
  action: HttpBlockingAction;
  condition: HttpBlockingCondition;
};
