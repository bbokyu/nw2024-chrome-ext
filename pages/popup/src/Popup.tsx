// pages/popup/src/Popup.tsx

import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useGetVibes } from './useGetVibes';
import type { Genre } from './genres';
import { getRandomSong } from './genres';

const Popup = () => {
  const { pageHTML, screenshotUrl, musicRecommendation } = useGetVibes();

  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';

  const [showPlay, setPlay] = useState(true);
  const [showMain, setShowMain] = useState(true);
  const xsymbol = 'popup/xsymbol.svg';
  const skip_button = 'popup/skip.svg';
  const play_button = showPlay ? 'popup/play.svg' : 'popup/pause.svg';
  const logo_active = 'popup/logo_active.svg';

  const onImageClick = () => setShowMain(!showMain);
  const onPlayPause = () => setPlay(!showPlay);

  const Active = () => {
    return (
      // <div className={'App-active'}>
      //   <img
      //     style={{ position: 'absolute', top: '0%', left: '0%', width: '70px', height: 'autofill' }}
      //     src={chrome.runtime.getURL(logo_active)}
      //     className="logo-active"
      //     alt="logo"
      //   />
      //   <button style={{ position: 'absolute', top: '5%', right: '5%' }} className="exit-button" onClick={onImageClick}>
      //     <img src={chrome.runtime.getURL(xsymbol)} className="exit-button" alt="exit" />
      //   </button>
      //   <button
      //     style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%, -50%)' }}
      //     className="play-button"
      //     onClick={onImageClick}>
      //     <img src={chrome.runtime.getURL(play_button)} className="play-button" alt="play" />
      //   </button>
      //   <button
      //     style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%, -50%)' }}
      //     className="play-button"
      //     onClick={onPlayPause}>
      //     <img src={chrome.runtime.getURL(play_button)} className="play-button" alt="play" />
      //   </button>
      //   <button
      //     style={{ position: 'absolute', top: '77%', left: '65%', transform: 'translate(-50%, -50%)' }}
      //     className="skip-button"
      //     onClick={onImageClick}>
      //     <img src={chrome.runtime.getURL(skip_button)} className="skip-button" alt="skip" />
      //   </button>
      //   <div style={{ position: 'absolute', top: '59%', left: '5%' }} className="gradient-line"></div>
      // </div>
      <div className="w-full flex-row justify-center bg-black mb-10">
        {/* header */}
        <div className="w-full flex justify-between items-center">
          <img
            className="w-10 flex items-center "
            src={chrome.runtime.getURL(logo_active)}
            alt="csdcvsdv"
            height={12}
          />
          <button className="exit-button" onClick={onImageClick}>
            <img src={chrome.runtime.getURL(xsymbol)} className="exit-button" alt="exit" />
          </button>
        </div>

        {/* body */}
        <div className="w-full flex-row justify-center items-center ">
          <p className="text-white font-light text-xl">{genre}</p>
          <div className="justify-center items-center w-full">
            <img
              src={chrome.runtime.getURL('popup/coool.gif')}
              alt="Your GIF"
              height={50}
              className="w-32 ml-[88px] justify-center items-center"
            />
          </div>
          <AudioButton genre={genre}>Play Music!</AudioButton>
          <div className="w-10 bg-black"></div>
        </div>
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

  const Demo = () => {
    return (
      <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'} h-screen overflow-auto`}>
        <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
          {/* <ToggleButton>Toggle theme</ToggleButton> */}

          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </header>

        <AudioButton genre={genre}>Play Music!</AudioButton>

        <div className="p-4">
          {/* {pageHTML && (
        <div className="mt-4">
          <h3 className="font-bold">Extracted Page HTML:</h3>
          <textarea value={pageHTML} readOnly rows={10} cols={30} className="w-full p-2 border" />
        </div>
      )} */}
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

  // State to manage the current genre
  const [genre, setGenre] = useState<Genre>('sad'); // Initialize to 'sad' or any default genre

  // Function to sanitize musicRecommendation
  const sanitizeGenre = (str: string): Genre | null => {
    // Remove leading and trailing punctuation and whitespace
    const sanitized = str.replace(/^[^\w]+|[^\w]+$/g, '').toLowerCase() as Genre;
    // Check if the sanitized string matches one of the predefined genres
    const validGenres: Genre[] = ['happy', 'calm', 'sad', 'energetic', 'dramatic', 'romantic', 'focus'];
    return validGenres.includes(sanitized) ? sanitized : null;
  };

  // Effect to update genre based on musicRecommendation
  useEffect(() => {
    if (musicRecommendation) {
      const newGenre = sanitizeGenre(musicRecommendation);
      if (newGenre) {
        setGenre(newGenre);
      } else {
        console.warn(`Invalid music recommendation: "${musicRecommendation}"`);
        // Optionally, set to a default genre if the recommendation is invalid
        // setGenre('happy');
      }
    }
  }, [musicRecommendation]);

  return (
    <div className={`App`}>
      {/* Show the Active component initially */}
      {/* <Demo /> */}
      {showMain ? <Main /> : <Active />}
    </div>
  );
};

const AudioButton = (props: ComponentPropsWithoutRef<'button'> & { genre: Genre }) => {
  const { genre, children, ...restProps } = props;

  const [audioFile, setAudioFile] = useState(getRandomSong(genre));
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audioRef without an Audio instance
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeDuration = 1000; // duration in ms for fade in/out

  // Create a new Audio instance whenever audioFile changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(audioFile);
    audioRef.current.volume = 1; // Reset volume
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [audioFile]);

  const fadeOut = async () => {
    if (audioRef.current) {
      for (let volume = 1; volume >= 0; volume -= 0.1) {
        audioRef.current.volume = volume;
        await new Promise(resolve => setTimeout(resolve, fadeDuration / 10));
      }
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1; // Reset volume for the next track
    }
  };

  const fadeIn = async () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play();
      for (let volume = 0; volume <= 1; volume += 0.1) {
        audioRef.current.volume = volume;
        await new Promise(resolve => setTimeout(resolve, fadeDuration / 10));
      }
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Update audio when genre changes
  useEffect(() => {
    const updateAudio = async () => {
      if (isPlaying) {
        await fadeOut();
        const newAudioFile = getRandomSong(genre);
        setAudioFile(newAudioFile);
        await fadeIn();
      } else {
        const newAudioFile = getRandomSong(genre);
        setAudioFile(newAudioFile);
      }
    };
    updateAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  // Clean up event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleAudioEnd = () => setIsPlaying(false);
      audio.addEventListener('ended', handleAudioEnd);
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        className={
          restProps.className +
          ' ' +
          'font-bold py-2 px-6 rounded shadow hover:scale-105 transition-transform duration-200 '
        }
        onClick={handlePlayPause}>
        <img
          src={chrome.runtime.getURL(isPlaying ? 'popup/pause.svg' : 'popup/play.svg')}
          alt={isPlaying ? 'Pause' : 'Play'}
          width={40}
          height={40}
        />
      </button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occurred</div>);
