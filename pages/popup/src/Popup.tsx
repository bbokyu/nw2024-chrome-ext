import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';

import { useGetVibes } from './useGetVibes';

import ActiveUI from './ActiveUI';

const Popup = () => {
  const { pageHTML, screenshotUrl, musicRecommendation } = useGetVibes();

  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';

  return (
    // <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'} h-screen overflow-auto`}>
    //   <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
    //     <ToggleButton>Toggle theme</ToggleButton>

    //     <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
    //   </header>

    //   <div className="p-4">
    //     {' '}
    //     {musicRecommendation && (
    //       <div className="mt-4">
    //         <h3 className="font-bold">Music Recommendation:</h3>
    //         <p>{musicRecommendation}</p>
    //       </div>
    //     )}
    //     {/* {pageHTML && (
    //       <div className="mt-4">
    //         <h3 className="font-bold">Extracted Page HTML:</h3>
    //         <textarea value={pageHTML} readOnly rows={10} cols={30} className="w-full p-2 border" />
    //       </div>
    //     )} */}
    //     {screenshotUrl && (
    //       <div className="mt-4">
    //         <h3 className="font-bold">Screenshot:</h3>
    //         <img src={screenshotUrl} alt="Screenshot" style={{ maxWidth: '100%' }} />
    //       </div>
    //     )}
    //   </div>
    // </div>

    <ActiveUI />
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

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occurred</div>);
