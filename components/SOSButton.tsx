import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default function SOSButton() {
  const handleSOS = async () => {
    try {
      // 1. Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required to send your location.');
        return;
      }

      // 2. Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

      // 3. Send SMS
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(
          ['09171234567'], // <- Replace with your emergency contact number
          `🚨 HELP!!! SOS Alert!!!\nI need help. Here's my location: ${locationUrl}`
        );
        Alert.alert('SOS Sent', 'Emergency SMS sent successfully.');
      } else {
        Alert.alert('SMS not available on this device');
      }
    } catch (error) {
      console.error('SOS error:', error);
      Alert.alert('Error', 'Failed to send SOS message.');
    }
  };

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