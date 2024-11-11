// pages/popup/src/Popup.tsx

import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import type { ComponentPropsWithoutRef } from 'react';
// import active from './active';
import { useState } from 'react';

// import { useGetVibes } from './useGetVibes';

const Popup = () => {
  // const { pageHTML, screenshotUrl, musicRecommendation } = useGetVibes();

  // const theme = useStorage(exampleThemeStorage);
  // const isLight = theme === 'light';

  const xsymbol = 'popup/xsymbol.svg';
  const logo_active = 'popup/logo_active.svg';
  const [showMain, setShowMain] = useState(true);
  const onImageClick = () => setShowMain(!showMain);

  const Active = () => {
    return (
      <div className={`App-active`}>
        <img src={chrome.runtime.getURL(logo_active)} className="logo-active" alt="logo" />
        <button className="exit-button" onClick={onImageClick}>
          <img src={chrome.runtime.getURL(xsymbol)} className="exit-button" alt="exit" />
        </button>
      </div>
    );
  };
  const Main = () => {
    return (
      <header className={`App-header`}>
        <h1 className="header">Aurora</h1>
        <button className="image-button" onClick={onImageClick}>
          <img src={chrome.runtime.getURL(logo_active)} className="image-button" alt="logo" />
        </button>
      </header>
    );
  };

  return (
    <div className={`App`}>
      {/* Show the Active component initially */}
      {showMain ? <Main /> : <Active />}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occurred</div>);
