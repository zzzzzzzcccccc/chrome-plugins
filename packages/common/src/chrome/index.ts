export type RegisteredContentScript = chrome.scripting.RegisteredContentScript;
export type CaptureVisibleTabOptions = chrome.tabs.CaptureVisibleTabOptions;
export type ChromeTab = chrome.tabs.Tab;
export type MessageSender = chrome.runtime.MessageSender;
export type SendResponse<T> = (params: T) => void;
export type ChromeWindow = chrome.windows.Window;
export type ChromeWindowCreateData = chrome.windows.CreateData;
export type ChromeCreateProperties = chrome.contextMenus.CreateProperties;
export type ChromeOnClickData = chrome.contextMenus.OnClickData;

export type OnMessageCallback<T, R> = (message: T, messageSender: MessageSender, sendResponse: SendResponse<R>) => void;

export async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return { tab, error: null };
  } catch (e) {
    return { tab: null, error: e };
  }
}

export function onMessage<T = undefined, R = undefined>(callback: OnMessageCallback<T, R>) {
  chrome.runtime.onMessage.addListener((message, messageSender, sendResponse) => {
    callback(message, messageSender, sendResponse);
    return true;
  });
}

export async function sendMessageByCurrentTab<T = undefined, R = undefined>(message: T) {
  const { tab } = await getCurrentTab();
  if (!tab) return;
  return chrome.tabs.sendMessage<T, R>(tab.id as number, message);
}

export function sendMessageByRunTime<T = undefined, R = undefined>(message: T) {
  return chrome.runtime.sendMessage<T, R>(message);
}

export async function registerContentScripts(targetScripts: RegisteredContentScript[]) {
  try {
    await chrome.scripting.registerContentScripts(targetScripts);
    return {
      targetScripts,
      error: null,
    };
  } catch (e) {
    return {
      targetScripts,
      error: e,
    };
  }
}

export function captureVisibleTab(options: CaptureVisibleTabOptions = {}) {
  const { format = 'png', quality } = options;
  return chrome.tabs.captureVisibleTab({ format, quality });
}

export function createWindow(opt: ChromeWindowCreateData) {
  return chrome.windows.create(opt);
}

export function getRuntimeURL(path: string) {
  return chrome.runtime.getURL(path);
}

export function setLocalStorage(data: { [key: string]: any }) {
  return chrome.storage.local.set(data);
}

export async function getLocalStorage(keys: string | string[]) {
  const result = await chrome.storage.local.get(keys);
  if (typeof keys === 'string') {
    return result[keys];
  }
  return result;
}

export function removeLocalStorage(keys: string | string[]) {
  return chrome.storage.local.remove(keys);
}

export function createContextMenus(payload: ChromeCreateProperties) {
  return chrome.contextMenus.create(payload);
}

export function onContextMenus(cb: (data: ChromeOnClickData, tab?: ChromeTab) => void) {
  chrome.contextMenus.onClicked.addListener(cb);
}

export function onInstalled(cb: () => void) {
  chrome.runtime.onInstalled.addListener(cb);
}
