import { Ionicons } from '@expo/vector-icons';
import * as SMS from 'expo-sms';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { performTTS } from '../components/voice_commands/tts';
import { requestLocationPermission } from './locationPermission';

export const handleSOS = async () => {
  try {
    const coords = await requestLocationPermission();
    if (!coords) return;

    const { latitude, longitude } = coords;
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = `🚨 HELP!!! SOS Alert!!!\nI need help. Here's my location: ${locationUrl}`;

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const contact = '09171234567'; // replace with chosen contacts once in the SMS
      performTTS(`Sending SOS to ${contact}.`); // change this to contact name
      await SMS.sendSMSAsync([contact], message); 
    } else {
      performTTS("SMS not available on this device.");
      Alert.alert('SMS Not Available', 'SMS not available on this device.');
    }
  } catch (error) {
    console.error('SOS error:', error);
    performTTS(`Error Sending SOS: ${error}`);
    Alert.alert('Error', 'Failed to send SOS message.');
  }
};

export default function SOSButton() {
  
  return (
    <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
      <Ionicons name="alert-circle" size={40} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    zIndex: 999,
  },
});