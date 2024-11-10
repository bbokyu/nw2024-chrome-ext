import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';

const Popup = () => {
  const [pageHTML, setPageHTML] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');

  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';

  const takeScreenshot = () => {
    chrome.runtime.sendMessage({ type: 'TAKE_SCREENSHOT' }, response => {
      setScreenshotUrl(response.screenshotUrl);
    });
  };

  const takeHTML = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PAGE_HTML' }, response => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
            return;
          }
          if (response?.html) {
            setPageHTML(response.html);
          } else {
            console.error('No response received for GET_PAGE_HTML');
          }
        });
      }
    });
  };

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'} h-screen overflow-auto`}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <ToggleButton>Toggle theme</ToggleButton>

        <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
      </header>

      <div className="h-screen overflow-auto ">
        <button onClick={takeHTML}>Extract Page HTML</button> <br />
        <button onClick={takeScreenshot}>Take Screenshot</button>
        {pageHTML && (
          <div className="mt-4">
            <h3>Extracted Page HTML:</h3>
            <textarea value={pageHTML} readOnly rows={10} cols={20} />
          </div>
        )}
        {screenshotUrl && (
          <div className="mt-4">
            <h3>Screenshot:</h3>
            <img src={screenshotUrl} alt="Screenshot" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </div>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorage(exampleThemeStorage);
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold py-1 px-4 rounded shadow hover:scale-105 ' +
        (theme === 'light' ? 'bg-white text-black shadow-black' : 'bg-black text-white')
      }
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
