import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../types/navigation';

export default function Footer() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const state = useNavigationState(state => state);
  const currentRouteName = state.routes[state.index].name;

  const isHome = currentRouteName === 'Home';
  const isProfile = currentRouteName === 'Profile';
  const isAbout = currentRouteName === 'About';

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Ionicons
          name={isHome ? 'home' : 'home-outline'}
          size={32}
          color="saddlebrown"
        />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Ionicons
          name={isProfile ? 'person' : 'person-outline'}
          size={32}
          color="saddlebrown"
        />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
        <Ionicons
          name={isAbout ? 'information-circle' : 'information-circle-outline'}
          size={32}
          color="saddlebrown"
        />
        <Text style={styles.label}>About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'beige',
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
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: 'saddlebrown',
    marginTop: 5,
    fontWeight: '600'
  },
});
