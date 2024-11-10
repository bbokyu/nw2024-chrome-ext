// pages/popup/src/Popup.tsx

import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';

import { useGetVibes } from './useGetVibes';

const Popup = () => {
  const { pageHTML, screenshotUrl, musicRecommendation } = useGetVibes();

  // const theme = useStorage(exampleThemeStorage);
  // const isLight = theme === 'light';
  const logo = 'popup/logo.svg';
  const onImageClick = () => {
    // Handle the button click (e.g., open a new tab or show a message)
    chrome.tabs.create({ url: 'https://your-target-url.com' });
  };

  return (
    <div className={`App`}>
      <header className={`App-header`}>
        {/* <StartButton>Toggleffdf theme</StartButton> */}

        <button className="image-button" onClick={onImageClick}>
          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </button>
      </header>

      <div className="p-4">
        {pageHTML && (
          <div className="mt-4">
            <h3 className="font-bold">Extracted Page HTML:</h3>
            <textarea value={pageHTML} readOnly rows={10} cols={30} className="w-full p-2 border" />
          </div>
        )}
        {screenshotUrl && (
          <div className="mt-4">
            <h3 className="font-bold">Screenshot:</h3>
            <img src={screenshotUrl} alt="Screenshot" style={{ maxWidth: '100%' }} />
          </div>
        )}
        {musicRecommendation && (
          <div className="mt-4">
            <h3 className="font-bold">Music Recommendation:</h3>
            <p>{musicRecommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// const StartButton = (props: ComponentPropsWithoutRef<'button'>) => {
//   const theme = useStorage(exampleThemeStorage);
//   return (
//     <button
//       className={
//         props.className +
//         ' ' +
//         'font-bold py-1 px-4 rounded shadow hover:scale-105 ' +
//         (theme === 'light' ? 'bg-white text-black shadow-black' : 'bg-black text-white')
//       }
//       onClick={exampleThemeStorage.toggle}>
//       {props.children}
//     </button>
//   );
// };

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occurred</div>);
