// pages/popup/src/useGetVibes.ts

import { useEffect, useState } from 'react';

export function useGetVibes() {
  const [pageHTML, setPageHTML] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [musicRecommendation, setMusicRecommendation] = useState('');

  useEffect(() => {
    // Function to capture HTML and screenshot
    const captureData = () => {
      // Query the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tabId = tabs[0]?.id;
        if (tabId) {
          // Request page HTML from content script
          chrome.tabs.sendMessage(tabId, { type: 'GET_PAGE_HTML' }, response => {
            if (chrome.runtime.lastError) {
              console.error('Error fetching page HTML:', chrome.runtime.lastError);
              return;
            }
            const html = response?.html;
            if (html) {
              setPageHTML(html); // Update state to display in popup

              // Request screenshot from background script
              chrome.runtime.sendMessage({ type: 'TAKE_SCREENSHOT' }, screenshotResponse => {
                if (chrome.runtime.lastError) {
                  console.error('Error taking screenshot:', chrome.runtime.lastError);
                  return;
                }
                const screenshot = screenshotResponse?.screenshotUrl;
                if (screenshot) {
                  setScreenshotUrl(screenshot); // Update state to display in popup

                  // Send data to the Gemini Model API
                  sendDataToAPI(html, screenshot);
                }
              });
            }
          });
        }
      });
    };

    // Initial capture
    captureData();

    // Set up interval to capture every 10 seconds
    const interval = setInterval(() => {
      captureData();
    }, 10000); // 10000ms = 10 seconds

    return () => clearInterval(interval);
  }, []);

  const sendDataToAPI = (html: string, screenshot: string) => {
    fetch('https://your-gemini-model-api-endpoint.com/get-music-recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html, screenshot }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response
        setMusicRecommendation(data.recommendation);
      })
      .catch(error => {
        console.error('Error sending data to API:', error);
      });
  };

  return { pageHTML, screenshotUrl, musicRecommendation };
}
