export type RegisteredContentScript = chrome.scripting.RegisteredContentScript;
export type CaptureVisibleTabOptions = chrome.tabs.CaptureVisibleTabOptions;
export type ChromeTab = chrome.tabs.Tab;
export type MessageSender = chrome.runtime.MessageSender;
export type SendResponse<T> = (params: T) => void;

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

export async function sendMessageByRunTime<T = undefined, R = undefined>(message: T) {
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
