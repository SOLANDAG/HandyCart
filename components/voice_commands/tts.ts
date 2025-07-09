import * as Speech from 'expo-speech';

export const performTTS = (text, options = {}) => {
  if (text && text.trim()) {
    Speech.speak(text, {
      language: 'en-US',
      rate: 1.0,
      pitch: 1.0,
      ...options,
    });
  }
};