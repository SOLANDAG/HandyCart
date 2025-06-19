import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image } from 'react-native';

import GroceryScreen from '../app/grocery';
import FoodScreen from '../app/food';
import RideScreen from '../app/ride';
import MedicineScreen from '../app/medicine';
import LaundryScreen from '../app/laundry';

import HomeScreen from '../app/index';
import OrderScreen from '../app/order';
import CartScreen from '../app/cart';
import ChatsScreen from '../app/chats';
import EmergencyScreen from '../app/emergency';

import ProfileScreen from '../app/profile';
import SettingsScreen from '../app/settings';
import HistoryScreen from '../app/history';
import PaymentScreen from '../app/payment';
import AboutScreen from '../app/about';
import HelpScreen from '../app/help';

import LayoutWrapper from './LayoutWrapper';
import type { DrawerParamList } from '../types/navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'saddlebrown',
        drawerLabelStyle: { fontSize: 18 },
        drawerType: 'front',
      }}
    >

      {[
        
        { name: 'Grocery', component: GroceryScreen },
        { name: 'Food', component: FoodScreen },
        { name: 'Ride', component: RideScreen },
        { name: 'Medicine', component: MedicineScreen },
        { name: 'Laundry', component: LaundryScreen },

        { name: 'Order', component: OrderScreen },
        { name: 'Cart', component: CartScreen },
        { name: 'Home', component: HomeScreen },
        { name: 'Chats', component: ChatsScreen },
        { name: 'Emergency', component: EmergencyScreen }
      ].map(({ name, component }) => (
        <Drawer.Screen
          key={name}
          name={name as keyof DrawerParamList}
          options={{ drawerItemStyle: { display: 'none' } }}
          children={() => <LayoutWrapper>{React.createElement(component)}</LayoutWrapper>}
        />
      ))}

      <Drawer.Screen
        name="Profile"
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />
        }}
        children={() => <LayoutWrapper><ProfileScreen /></LayoutWrapper>}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />
        }}
        children={() => <LayoutWrapper><SettingsScreen /></LayoutWrapper>}
      />
      <Drawer.Screen
        name="History"
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />
        }}
        children={() => <LayoutWrapper><HistoryScreen /></LayoutWrapper>}
      />
      <Drawer.Screen
        name="Payment"
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="card-outline" size={size} color={color} />
        }}
        children={() => <LayoutWrapper><PaymentScreen /></LayoutWrapper>}
      />
      <Drawer.Screen
        name="About"
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />
        }}
        children={() => <LayoutWrapper><AboutScreen /></LayoutWrapper>}
      />
      <Drawer.Screen
        name="Help"
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />
        }}
        children={() => <LayoutWrapper><HelpScreen /></LayoutWrapper>}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.profileSection}>
        <Image source={require('../assets/images/profile-placeholder.png')} style={styles.profileImage} />
        <Text style={styles.username}>Username</Text> 
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Log Out"
        labelStyle={styles.logoutLabel}
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color="saddlebrown" />}
        onPress={() => console.log('Log Out pressed')}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: { flex: 1 },
  profileSection: { alignItems: 'center', marginVertical: 30 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: 'bold', color: 'saddlebrown' },
  logoutLabel: { fontSize: 18, color: 'saddlebrown' }
});
