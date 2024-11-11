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

  const [showPlay, setPlay] = useState(true);
  const xsymbol = 'popup/xsymbol.svg';
  const skip_button = 'popup/skip.svg';
  const play_button = showPlay ? 'popup/play.svg' : 'popup/pause.svg';
  const [showMain, setShowMain] = useState(true);
  const logo_active = 'popup/logo_active.svg';

  const onImageClick = () => setShowMain(!showMain);
  const onPlayPause = () => setPlay(!showPlay);
  // const nextSong = () => setShowMain(!showMain);

  const Active = () => {
    return (
      <div className={'App-active'}>
        <img
          style={{ position: 'absolute', top: '0%', left: '0%', width: '70px', height: 'autofill' }}
          src={chrome.runtime.getURL(logo_active)}
          className="logo-active"
          alt="logo"
        />
        <button style={{ position: 'absolute', top: '5%', right: '5%' }} className="exit-button" onClick={onImageClick}>
          <img src={chrome.runtime.getURL(xsymbol)} className="exit-button" alt="exit" />
        </button>
        <button
          style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%, -50%)' }}
          className="play-button"
          onClick={onImageClick}>
          <img src={chrome.runtime.getURL(play_button)} className="play-button" alt="play" />
        </button>
        <button
          style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%, -50%)' }}
          className="play-button"
          onClick={onPlayPause}>
          <img src={chrome.runtime.getURL(play_button)} className="play-button" alt="play" />
        </button>
        <button
          style={{ position: 'absolute', top: '77%', left: '65%', transform: 'translate(-50%, -50%)' }}
          className="skip-button"
          onClick={onImageClick}>
          <img src={chrome.runtime.getURL(skip_button)} className="skip-button" alt="skip" />
        </button>
        <div style={{ position: 'absolute', top: '59%', left: '5%' }} className="gradient-line"></div>
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
