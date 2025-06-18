import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../app/index';
import GroceryScreen from '../app/grocery';
import TransportationScreen from '../app/transportation';
import ProfileScreen from '../app/profile';
import CartScreen from '../app/cart';
import MessagesScreen from '../app/messages';
import EmergencyScreen from '../app/emergency';
import Header from './Header';
import Footer from './Footer';

import type {
  DrawerParamList,
  HomeStackParamList,
  GroceryStackParamList,
  TransportationStackParamList,
  ProfileStackParamList,
  CartStackParamList,
  MessagesStackParamList,
  EmergencyStackParamList
} from '../types/navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();

const HomeStack = createStackNavigator<HomeStackParamList>();
const GroceryStack = createStackNavigator<GroceryStackParamList>();
const TransportationStack = createStackNavigator<TransportationStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const CartStack = createStackNavigator<CartStackParamList>();
const MessagesStack = createStackNavigator<MessagesStackParamList>();
const EmergencyStack = createStackNavigator<EmergencyStackParamList>();

function HomeStackScreen() {
  return (
    <>
      <Header />
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
      <Header />
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
      <Header />
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
      <Header />
      <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      </ProfileStack.Navigator>
      <Footer />
    </>
  );
}

function CartStackScreen() {
  return (
    <>
      <Header />
      <CartStack.Navigator screenOptions={{ headerShown: false }}>
        <CartStack.Screen name="CartMain" component={CartScreen} />
      </CartStack.Navigator>
      <Footer />
    </>
  );
}

function MessagesStackScreen() {
  return (
    <>
      <Header />
      <MessagesStack.Navigator screenOptions={{ headerShown: false }}>
        <MessagesStack.Screen name="MessagesMain" component={MessagesScreen} />
      </MessagesStack.Navigator>
      <Footer />
    </>
  );
}

function EmergencyStackScreen() {
  return (
    <>
      <Header />
      <EmergencyStack.Navigator screenOptions={{ headerShown: false }}>
        <EmergencyStack.Screen name="EmergencyMain" component={EmergencyScreen} />
      </EmergencyStack.Navigator>
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
      <Drawer.Screen name="Cart" component={CartStackScreen} options={{
        drawerIcon: ({ color, size }) => (<Ionicons name="cart-outline" size={size} color={color} />),
      }} />
      <Drawer.Screen name="Messages" component={MessagesStackScreen} options={{
        drawerIcon: ({ color, size }) => (<Ionicons name="chatbubble-outline" size={size} color={color} />),
      }} />
      <Drawer.Screen name="Emergency" component={EmergencyStackScreen} options={{
        drawerIcon: ({ color, size }) => (<Ionicons name="warning-outline" size={size} color={color} />),
      }} />
    </Drawer.Navigator>
  );
}
