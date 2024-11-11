import { useEffect, useState } from 'react';

import { GoogleGenerativeAI } from '@google/generative-ai';

const KEY = import.meta.env.GEMINI_KEY || 'AIzaSyBAgUWEGs23FqiQAXD0uWwKezzIzOQEDpY'; // ill turn it off once we're done presenting

const genAI = new GoogleGenerativeAI(KEY as string);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const prompt = `
Task Description:

You are an AI assistant designed to enhance a user's experience by recommending the most suitable mood of music based on their current activity. You will receive two inputs:

1. Screenshot of the user's current browser page.
2. HTML code of the entire page.

Your Objectives:

- Analyze the content of the screenshot and HTML code to understand the general context of what the user is viewing.
- Determine the primary theme or activity type (e.g., study, relaxation, entertainment).
- Recommend one of the following six moods to match the overall activity: **Happy, Calm, Sad, Energetic, Dramatic, Focus**.

Examples:

- For uplifting or joyful content, output: happy
- For serene or peaceful content, output: calm
- For melancholic or emotional content, output: sad
- For action-packed or dynamic content (e.g., fighting manga), output: energetic
- For intense or suspenseful content, output: dramatic
- For romantic or love-themed content (e.g., romance manga), output: romantic
- For academic or concentrated activities, output: focus

Instructions:

1. Content Analysis:
  - Examine prominent keywords or themes within the content without being overly sensitive to minor changes.
  - Determine the general purpose or theme (e.g., study, relaxation, entertainment) without overanalyzing specifics.

2. Mood Recommendation:
  - Based on the overall content purpose, select only one of the six main moods.
  - Do not include multiple moods or variations; output a single mood only.

Output Format:

- Output only a single mood name from the list: **happy, calm, sad, energetic, dramatic, romantic, focus**.
- Example output: "calm"

Note: Focus solely on producing one clear mood recommendation from the six specified moods based on the overall activity or theme of the content. Avoid sensitivity to small changes or specific details. Do not add any punctuation, dots, comma, or quotes to the output.

End of Prompt
`;

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

        let html = '';
        if (tabId) {
          // Request page HTML from content script
          chrome.tabs.sendMessage(tabId, { type: 'GET_PAGE_HTML' }, response => {
            if (chrome.runtime.lastError) {
              console.error('Error fetching page HTML:', chrome.runtime.lastError);
              return;
            }

            html = response?.html;
            if (html) setPageHTML(html);
          });

          // Request screenshot from background script
          chrome.runtime.sendMessage({ type: 'TAKE_SCREENSHOT' }, screenshotResponse => {
            if (chrome.runtime.lastError) {
              console.error('Error taking screenshot:', chrome.runtime.lastError);
              return;
            }
            const screenshot = screenshotResponse?.screenshotUrl;

            // we only call the API if we have a screenshot, html is optional
            if (screenshot) {
              setScreenshotUrl(screenshot);
              // sendDataToAPI(html, screenshot);
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

  const sendDataToAPI = async (html: string, screenshot: string) => {
    const base64Data = screenshot.split(',')[1];
    const imageObject = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg',
      },
    };

    // Generate content using the prompt and the image object
    const result = await model.generateContent([{ text: prompt }, imageObject]);

    // Return the generated text
    setMusicRecommendation(result.response.text());
    return result.response.text();
  };

  return { pageHTML, screenshotUrl, musicRecommendation };
}
