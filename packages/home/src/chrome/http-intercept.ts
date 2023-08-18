import escapeRegExp from 'lodash/escapeRegExp';
import { ChromeMessage, ChromeMessageMethod, ChromeMessageTo, HttpBlockingItem } from '../model';
import { CHROME_MESSAGE_NAME_SPACE, HTTP_STATUS_SUCCESS, HTTP_STATUS_TEXT_SUCCESS } from '../constants';

type MockPayload = {
  url: string | URL;
  method: string;
};

export default (function () {
  const [originXHROpen, originXHRSend, originFetch] = [
    window.XMLHttpRequest.prototype.open,
    window.XMLHttpRequest.prototype.send,
    window.fetch,
  ];
  let rules: HttpBlockingItem[] = [];

  const setRules = (payload: HttpBlockingItem[]) => (rules = payload);
  const clearRules = () => (rules = [] as HttpBlockingItem[]);

  const logger = ({ url, method }: MockPayload) => {
    const timestamp = new Date().toISOString();
    console.info(
      `[${timestamp}]%c[Tab Manager][http-intercept][${method}]:${url instanceof URL ? url.href : url}`,
      'color: #1890ff;',
    );
  };

  const diffUrl = (regexFilter: string, url: string | URL) => {
    const currentUrl = url instanceof URL ? url.href : url;
    if (regexFilter === currentUrl) {
      return true;
    }
    if (regexFilter.indexOf(currentUrl) > -1) {
      return true;
    }
    return new RegExp(escapeRegExp(regexFilter)).test(currentUrl);
  };

  const matcherHttpBlocking = ({ method = 'get', url }: MockPayload) => {
    if (!rules?.length) {
      return undefined;
    }
    return rules.find(
      (rule) =>
        rule.condition.requestMethods.indexOf(method.toLocaleLowerCase()) > -1 &&
        diffUrl(rule.condition.regexFilter, url),
    );
  };

  const onMessage = (event: MessageEvent<Record<string, ChromeMessage<HttpBlockingItem[]>>>) => {
    const { data } = event;
    const message = data[CHROME_MESSAGE_NAME_SPACE];
    if (message && message.to === ChromeMessageTo.CONTENT_SCRIPT) {
      const { method, data: payload } = message;
      switch (method) {
        case ChromeMessageMethod.UPDATE_HTTP_BLOCKING_RULES:
          setRules(payload);
          break;
        case ChromeMessageMethod.REMOVE_HTTP_BLOCKING_RULES:
          clearRules();
          break;
      }
    }
  };

  const interceptXHR = () => {
    const writeXHRPrototypes = ['status', 'statusText', 'response', 'responseText', 'readyState'];
    window.XMLHttpRequest.prototype.open = function (...args: any[]) {
      const [method, url] = args;
      const httpBlockingItem = matcherHttpBlocking({ method, url });
      if (httpBlockingItem) {
        // @ts-ignore
        this.__httpBlockingItem = httpBlockingItem;
        logger({ method, url });
      }
      originXHROpen.apply(this, args as Parameters<XMLHttpRequest['open']>);
    };
    window.XMLHttpRequest.prototype.send = function (...args: any[]) {
      // @ts-ignore
      const rule = this.__httpBlockingItem as HttpBlockingItem | undefined;
      if (rule) {
        writeXHRPrototypes.forEach((key) => Object.defineProperty(this, key, { writable: true }));
        setTimeout(() => {
          // @ts-ignore
          this.status = HTTP_STATUS_SUCCESS;
          // @ts-ignore
          this.statusText = HTTP_STATUS_TEXT_SUCCESS;
          // @ts-ignore
          this.readyState = XMLHttpRequest.DONE;
          // @ts-ignore
          this.response = rule.action.responseData;
          // @ts-ignore
          this.responseText = rule.action.responseData;
          this.getAllResponseHeaders = () =>
            rule.action.responseHeaders.map(({ header, value }) => `${header}: ${value}`).join('\n');
          this.getResponseHeader = (key: string) =>
            rule.action.responseHeaders.find(({ header }) => header === key)?.value || null;
          this.dispatchEvent(new Event('readystatechange'));
          this.dispatchEvent(new Event('loadend'));
          // @ts-ignore
          delete this.__httpBlockingItem;
        }, 0);
      } else {
        originXHRSend.apply(this, args as Parameters<XMLHttpRequest['send']>);
      }
    };
  };

  const interceptFetch = () => {
    window.fetch = (input, init) => {
      let method = 'get';
      let url: string | URL = '';
      if (typeof input === 'string') {
        url = input;
      }
      if (input instanceof Request) {
        method = input.method;
        url = input.url;
      }
      if (init) {
        method = init.method || method;
      }
      const rule = matcherHttpBlocking({ method, url });
      if (!rule) {
        return originFetch(input, init);
      }
      logger({ method, url });
      return new Promise<Response>((resolve) => {
        setTimeout(() => {
          resolve(
            new Response(rule.action.responseData, {
              status: 200,
              statusText: 'OK',
              headers: rule.action.responseHeaders.reduce((headers, { header, value }) => {
                headers.set(header, value);
                return headers;
              }, new Headers()),
            }),
          );
        }, 0);
      });
    };
  };

  const intercept = () => {
    interceptXHR();
    interceptFetch();
    window.addEventListener('message', onMessage);
  };

  const unIntercept = () => {
    window.XMLHttpRequest.prototype.open = originXHROpen;
    window.XMLHttpRequest.prototype.send = originXHRSend;
    window.fetch = originFetch;
    window.removeEventListener('message', onMessage);
    clearRules();
  };

  intercept();

  return {
    unIntercept,
  };
})();
