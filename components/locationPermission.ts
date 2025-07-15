import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { performTTS } from '../components/voice_commands/tts';

export async function requestLocationPermission(): Promise<Location.LocationObjectCoords | null> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Location Error', 'Permission to access location was denied.');
    performTTS('Location access was denied. Please enable location access in settings to continue.');
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
}
