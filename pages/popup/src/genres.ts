// src/data/audioGenres.ts

// Define the type for genre audio files
export type Genre = 'happy' | 'calm' | 'sad' | 'energetic' | 'dramatic' | 'romantic' | 'focus';

// List of files in each genre folder
export const genreAudioFiles: Record<Genre, string[]> = {
  happy: ['./music/happy/happy1.mp3', './music/happy/happy2.mp3', './music/happy/happy3.mp3'],
  calm: ['./music/calm/calm1.mp3', './music/calm/calm2.mp3', './music/calm/calm3.mp3'],
  sad: ['./music/sad/sad1.mp3', './music/sad/sad2.mp3', './music/sad/sad3.mp3'],
  energetic: [
    './music/energetic/energetic1.mp3',
    './music/energetic/energetic2.mp3',
    './music/energetic/energetic3.mp3',
  ],
  dramatic: ['./music/dramatic/dramatic1.mp3', './music/dramatic/dramatic2.mp3', './music/dramatic/dramatic3.mp3'],
  romantic: ['./music/romantic/romantic1.mp3', './music/romantic/romantic2.mp3', './music/romantic/romantic3.mp3'],
  focus: ['./music/focus/focus1.mp3', './music/focus/focus2.mp3', './music/focus/focus3.mp3'],
};

// Function to get a random song from a genre
export const getRandomSong = (genre: Genre): string => {
  const files = genreAudioFiles[genre];
  if (!files || files.length === 0) {
    throw new Error(`No audio files found for genre: ${genre}`);
  }
  const randomIndex = Math.floor(Math.random() * files.length);
  return files[randomIndex];
};
