import { Ionicons } from '@expo/vector-icons';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { DrawerParamList } from '../types/navigation';

import { handleSOS } from './SOSButton';

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

      <TouchableOpacity style={styles.button} onPress={handleSOS}>
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