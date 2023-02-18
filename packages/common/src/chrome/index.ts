export type ChromeTab = chrome.tabs.Tab

export async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tab;
}

export function onMessage<T>(callback?: (msg: T & { currentTab: ChromeTab }) => void) {
  chrome.runtime.onMessage.addListener((message: T & { currentTab: ChromeTab }) => {
    callback?.(message)
  })
}

export async function sendMessageByCurrentTab<T>(message: T) {
  const currentTab = await getCurrentTab()
  if (currentTab) {
    try {
      await chrome.tabs.sendMessage(currentTab.id as number, { ...message, currentTab })
      return [message, currentTab]
    } catch (e) {
      return Promise.reject(`send current tab failed ${e}`)
    }
  } else {
    return Promise.reject('can not found current tab')
  }
}
