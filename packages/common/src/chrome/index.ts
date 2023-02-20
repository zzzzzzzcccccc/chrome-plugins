import RegisteredContentScript = chrome.scripting.RegisteredContentScript;

export type ChromeTab = chrome.tabs.Tab;

export async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return { tab, error: null };
  } catch (e) {
    return { tab: null, error: e };
  }
}

export function onMessage<T>(callback?: (msg: T & { currentTab: ChromeTab }) => void) {
  chrome.runtime.onMessage.addListener((message: T & { currentTab: ChromeTab }) => {
    callback?.(message);
  });
}

export async function sendMessageByCurrentTab<T>(message: T) {
  const { tab: currentTab, error } = await getCurrentTab();
  if (error || !currentTab) {
    return {
      message,
      currentTab,
      error,
    };
  }
  try {
    await chrome.tabs.sendMessage(currentTab.id as number, { ...message, currentTab });
    return {
      message,
      currentTab,
      error: null,
    };
  } catch (e) {
    return {
      message,
      currentTab,
      error: e,
    };
  }
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
