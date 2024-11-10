import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TAKE_SCREENSHOT') {
    chrome.tabs.captureVisibleTab({ format: 'png' }, dataUrl => {
      sendResponse({ screenshotUrl: dataUrl });
    });

    return true; // Indicates response will be sent asynchronously
  }
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
