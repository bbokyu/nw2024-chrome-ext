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

  const logo = 'popup/logo.svg';
  const [showMain, setShowMain] = useState(true);
  const onImageClick = () => setShowMain(!showMain);

  const Active = () => {
    return (
      <div className={`App`}>
        <header className={`App-header`}>
          <h1 className="header">Aurora2</h1>
        </header>
      </div>
    );
  };
  const Main = () => {
    return (
      <header className={`App-header`}>
        <h1 className="header">Aurora1</h1>
        <button className="image-button" onClick={onImageClick}>
          <img src={chrome.runtime.getURL(logo)} className="image-button" alt="logo" />
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
