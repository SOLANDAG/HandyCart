import { useState } from 'react';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';

import { performTTS } from './tts';
import { processVoiceCommand } from './voiceCommand';

const ASSEMBLYAI_API_KEY = 'd55f34d3bbbe447e8394ca2e0812ca55';

export const startSTT = (navigation: any) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingObj, setRecordingObj] = useState(null);

  const startRecording = async () => {
    try {
      performTTS("Recording.");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecordingObj(recording);
      setIsRecording(true);

    } catch (error) {
      Alert.alert('Recording Error', error.message);
      performTTS(error.message);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recordingObj.stopAndUnloadAsync();
      const uri = recordingObj.getURI();
      setRecordingObj(null);

      performTTS("Recording stopped. Now processing.");

      const file = await fetch(uri);
      const blob = await file.blob();

      const uploadRes = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
        },
        body: blob,
      });

      const { upload_url } = await uploadRes.json();

      const transcriptRes = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ audio_url: upload_url }),
      });

      const { id } = await transcriptRes.json();

      let finalTranscript = '';
      while (true) {
        const pollingRes = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
          headers: { authorization: ASSEMBLYAI_API_KEY },
        });

        const data = await pollingRes.json();

        if (data.status === 'completed') {
          finalTranscript = data.text;

          // fallback if empty
          if (finalTranscript.length === 0) {
            finalTranscript = "No command given. Please try again.";
            Alert.alert('Transcription', finalTranscript);
            performTTS(finalTranscript);
          }
          // else process command
          else {
            processVoiceCommand({
                transcription: finalTranscript,
                navigation,
                onSearch: (query) => {
                    console.log('Do search with:', query);
                },
            });
          }
          break;
        } else if (data.status === 'error') {
          Alert.alert('Error', data.error || 'Something went wrong');
          performTTS(data.error || 'Something went wrong');
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Something went wrong');
      performTTS(data.error || 'Something went wrong');
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};