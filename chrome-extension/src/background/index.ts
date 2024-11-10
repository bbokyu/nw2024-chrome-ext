import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

// chrome-extension/src/background/index.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TAKE_SCREENSHOT') {
    chrome.tabs.captureVisibleTab({ format: 'jpeg' }, dataUrl => {
      if (chrome.runtime.lastError) {
        console.error('Error capturing screenshot:', chrome.runtime.lastError);
        sendResponse({ screenshotUrl: null });
        return;
      }
      sendResponse({ screenshotUrl: dataUrl });
    });
    return true; // Indicates response will be sent asynchronously
  }
  return false;
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
