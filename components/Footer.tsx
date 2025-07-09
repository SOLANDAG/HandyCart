import { Ionicons } from '@expo/vector-icons';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { DrawerParamList } from '../types/navigation';

import { performTTS } from '../components/voice_commands/tts';

export const sendSOS = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required for SOS.');
        performTTS("Location access was denied. SOS failed.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const message = `🚨 SOS!!! HELP!!!\nMy location: https://maps.google.com/?q=${latitude},${longitude}`;

      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const contact = '09171234567'; // replace with chosen contacts once in the SMS
        performTTS(`Sending SOS to ${contact}.`); // change this to contact name
        await SMS.sendSMSAsync([contact], message); 
      } else {
        performTTS("Your device cannot send SMS.");
        Alert.alert('SMS Not Available', 'Your device cannot send SMS.');
      }
    } catch (error) {
      console.error(error);
      performTTS("Error. Failed to send SOS.");
      Alert.alert('Error', 'Failed to send SOS.');
    }
};

export default function Footer() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const state = useNavigationState(state => state);
  const currentRouteName = state.routes[state.index].name;

  const isHome = currentRouteName === 'Home';
  const isOrder = currentRouteName === 'Order';
  const isCart = currentRouteName === 'Cart';
  const isChats = currentRouteName === 'Chats';
  const isEmergency = currentRouteName === 'Emergency';

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Order')}>
        <Ionicons name={isOrder ? 'cube' : 'cube-outline'} size={32} color="saddlebrown" />
        <Text style={styles.label}>Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
        <Ionicons name={isCart ? 'cart' : 'cart-outline'} size={32} color="saddlebrown" />
        <Text style={styles.label}>Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Ionicons name={isHome ? 'home' : 'home-outline'} size={32} color="saddlebrown" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chats')}>
        <Ionicons name={isChats ? 'chatbubble' : 'chatbubble-outline'} size={32} color="saddlebrown" />
        <Text style={styles.label}>Chats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={sendSOS}>
        <Ionicons name={isEmergency ? 'warning' : 'warning-outline'} size={32} color="crimson" />
        <Text style={styles.label}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    paddingBottom: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 12,
    color: 'saddlebrown',
    marginTop: 5,
    fontWeight: '600'
  },
});