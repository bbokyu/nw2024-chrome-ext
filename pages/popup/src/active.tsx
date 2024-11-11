// pages/popup/src/Popup.tsx

import '@src/active.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import type { ComponentPropsWithoutRef } from 'react';
import Popup from './Popup';

// import { useGetVibes } from './useGetVibes';

const active = () => {
  const logo = 'popup/logo.svg';
  const onImageClick = () => {
    // Handle the button click (e.g., open a new tab or show a message)
  };

  return (
    <div className={`App`}>
      <header className={`App-header`}>
        <h1 className="header">Aurora</h1>

        <button className="image-button" onClick={onImageClick}>
          <img src={chrome.runtime.getURL(logo)} className="image-button" alt="logo" />
        </button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occurred</div>);
