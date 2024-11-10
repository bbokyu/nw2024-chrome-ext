import { toggleTheme } from '@src/toggleTheme';

console.log('content script loaded');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_PAGE_HTML') {
    const pageHTML = document.documentElement.outerHTML;
    sendResponse({ html: pageHTML });
  }
});

void toggleTheme();
