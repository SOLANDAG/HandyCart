import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../app/index';
import GroceryScreen from '../app/grocery';
import TransportationScreen from '../app/transportation';
import ProfileScreen from '../app/profile';
import AboutScreen from '../app/about';
import Footer from './Footer';

import type { DrawerParamList, HomeStackParamList, GroceryStackParamList, TransportationStackParamList, ProfileStackParamList, AboutStackParamList } from '../types/navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const GroceryStack = createStackNavigator<GroceryStackParamList>();
const TransportationStack = createStackNavigator<TransportationStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const AboutStack = createStackNavigator<AboutStackParamList>();

function HomeStackScreen() {
  return (
    <>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      </HomeStack.Navigator>
      <Footer />
    </>
  );
}

function GroceryStackScreen() {
  return (
    <>
      <GroceryStack.Navigator screenOptions={{ headerShown: false }}>
        <GroceryStack.Screen name="GroceryMain" component={GroceryScreen} />
      </GroceryStack.Navigator>
      <Footer />
    </>
  );
}

function TransportationStackScreen() {
  return (
    <>
      <TransportationStack.Navigator screenOptions={{ headerShown: false }}>
        <TransportationStack.Screen name="TransportationMain" component={TransportationScreen} />
      </TransportationStack.Navigator>
      <Footer />
    </>
  );
}

function ProfileStackScreen() {
  return (
    <>
      <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      </ProfileStack.Navigator>
      <Footer />
    </>
  );
}

function AboutStackScreen() {
  return (
    <>
      <AboutStack.Navigator screenOptions={{ headerShown: false }}>
        <AboutStack.Screen name="AboutMain" component={AboutScreen} />
      </AboutStack.Navigator>
      <Footer />
    </>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'saddlebrown',
        drawerLabelStyle: { fontSize: 18 },
        drawerType: 'front'
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackScreen} options={{
        drawerIcon: ({ color, size }) => (<Ionicons name="home-outline" size={size} color={color} />),
      }} />
      <Drawer.Screen name="Grocery" component={GroceryStackScreen} options={{
        drawerIcon: ({ color, size }) => (<Ionicons name="cart-outline" size={size} color={color} />),
      }} />
      <Drawer.Screen name="Transportation" component={TransportationStackScreen} options={{
        drawerIcon: ({ color, size }) => (<Ionicons name="car-outline" size={size} color={color} />),
      }} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} options={{
        drawerIcon: ({ color, size }) => (<Ionicons name="person-outline" size={size} color={color} />),
      }} />
      <Drawer.Screen name="About" component={AboutStackScreen} options={{
        drawerIcon: ({ color, size }) => (<Ionicons name="information-circle-outline" size={size} color={color} />),
      }} />
    </Drawer.Navigator>
  );
}
