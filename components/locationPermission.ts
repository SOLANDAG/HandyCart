import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { Alert, Platform } from 'react-native';
import { performTTS } from '../components/voice_commands/tts';

export async function requestLocationPermission()  {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission Error', 'Permission to access location was denied. Tracking and SOS services are disabled.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            // redirect to settings
            text: 'Open Settings',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
        ]
      );
    performTTS('Location access was denied. Please enable in settings to use tracking and SOS.');
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
}
