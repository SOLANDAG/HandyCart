// DrawerNavigator.tsx
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../components/context/ThemeContext';
import { useUser } from '../components/context/UserContext';

import AboutScreen from '../app/about';
import FavoritesScreen from '../app/favorites';
import HelpScreen from '../app/help';
import HistoryScreen from '../app/history';
import HomeScreen from '../app/index';
import LoginScreen from '../app/login';
import LogoutScreen from '../app/logout';
import OTPScreen from '../app/otp';
import PaymentScreen from '../app/payment';
import ProfileScreen from '../app/profile';
import RegisterScreen from '../app/register';
import SettingsScreen from '../app/settings';

import BabycareScreen from '../app/baby';
import BakedgoodsScreen from '../app/baked';
import BeveragesScreen from '../app/beverages';
import CannedgoodsScreen from '../app/canned';
import CondimentsScreen from '../app/condiments';
import DairyScreen from '../app/dairy';
import DeliScreen from '../app/deli';
import FruitsScreen from '../app/fruits';
import GrainsScreen from '../app/grains';
import HealthcareScreen from '../app/healthcare';
import HouseholdScreen from '../app/household';
import HygieneScreen from '../app/hygiene';
import MeatScreen from '../app/meat';
import PantrystaplesScreen from '../app/pantry';
import PetcareScreen from '../app/pet';
import SeafoodScreen from '../app/seafood';
import SnacksScreen from '../app/snacks';
import VegetablesScreen from '../app/vegetables';

import CartScreen from '../app/cart';
import ChatsScreen from '../app/chats';
import EmergencyScreen from '../app/emergency';
import OrderScreen from '../app/order';

import type { DrawerParamList } from '../types/navigation';
import LayoutWrapper from './LayoutWrapper';

const Drawer = createDrawerNavigator<DrawerParamList>();

const HIDDEN_SCREENS = ['Login', 'Register', 'OTP'];

export default function DrawerNavigator() {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => {
        const shouldHideUI = HIDDEN_SCREENS.includes(route.name);
        return {
          headerShown: false,
          swipeEnabled: !shouldHideUI,
          drawerType: shouldHideUI ? 'back' : 'front',
          drawerActiveTintColor: theme.sidebarActiveIconColor,
          drawerInactiveTintColor: theme.sidebarIconColor,
          drawerLabelStyle: { fontSize: 18 },
        };
      }}
    >
      <Drawer.Screen name="Login" component={LoginScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Register" component={RegisterScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="OTP" component={OTPScreen} options={{ drawerItemStyle: { display: 'none' } }} />

      {[ // Hidden product screens
        { name: 'Home', component: HomeScreen },
        { name: 'Favorites', component: FavoritesScreen },
        { name: 'Fruits', component: FruitsScreen },
        { name: 'Vegetables', component: VegetablesScreen },
        { name: 'Cannedgoods', component: CannedgoodsScreen },
        { name: 'Dairy', component: DairyScreen },
        { name: 'Meat', component: MeatScreen },
        { name: 'Seafood', component: SeafoodScreen },
        { name: 'Deli', component: DeliScreen },
        { name: 'Condiments', component: CondimentsScreen },
        { name: 'Snacks', component: SnacksScreen },
        { name: 'Bakedgoods', component: BakedgoodsScreen },
        { name: 'Beverages', component: BeveragesScreen },
        { name: 'Grains', component: GrainsScreen },
        { name: 'Hygiene', component: HygieneScreen },
        { name: 'Household', component: HouseholdScreen },
        { name: 'Healthcare', component: HealthcareScreen },
        { name: 'Babycare', component: BabycareScreen },
        { name: 'Petcare', component: PetcareScreen },
        { name: 'Pantrystaples', component: PantrystaplesScreen },
        { name: 'Order', component: OrderScreen },
        { name: 'Cart', component: CartScreen },
        { name: 'Chats', component: ChatsScreen },
        { name: 'Emergency', component: EmergencyScreen },
      ].map(({ name, component }) => (
        <Drawer.Screen
          key={name}
          name={name as keyof DrawerParamList}
          options={{ drawerItemStyle: { display: 'none' } }}
          children={() => <LayoutWrapper>{React.createElement(component)}</LayoutWrapper>}
        />
      ))}

      <Drawer.Screen name="Profile" options={{ drawerIcon: ({ focused, size }) => <Ionicons name="person-outline" size={size} color={focused ? theme.sidebarActiveIconColor : theme.sidebarIconColor} />, }}>
        {() => <LayoutWrapper><ProfileScreen /></LayoutWrapper>}
      </Drawer.Screen>
      <Drawer.Screen name="Settings" options={{ drawerIcon: ({ focused, size }) => <Ionicons name="settings-outline" size={size} color={focused ? theme.sidebarActiveIconColor : theme.sidebarIconColor} />, }}>
        {() => <LayoutWrapper><SettingsScreen /></LayoutWrapper>}
      </Drawer.Screen>
      <Drawer.Screen name="History" options={{ drawerIcon: ({ focused, size }) => <Ionicons name="time-outline" size={size} color={focused ? theme.sidebarActiveIconColor : theme.sidebarIconColor} />, }}>
        {() => <LayoutWrapper><HistoryScreen /></LayoutWrapper>}
      </Drawer.Screen>
      <Drawer.Screen name="Payment" options={{ drawerIcon: ({ focused, size }) => <Ionicons name="card-outline" size={size} color={focused ? theme.sidebarActiveIconColor : theme.sidebarIconColor} />, }}>
        {() => <LayoutWrapper><PaymentScreen /></LayoutWrapper>}
      </Drawer.Screen>
      <Drawer.Screen name="About" options={{ drawerIcon: ({ focused, size }) => <Ionicons name="information-circle-outline" size={size} color={focused ? theme.sidebarActiveIconColor : theme.sidebarIconColor} />, }}>
        {() => <LayoutWrapper><AboutScreen /></LayoutWrapper>}
      </Drawer.Screen>
      <Drawer.Screen name="Help" options={{ drawerIcon: ({ focused, size }) => <Ionicons name="help-circle-outline" size={size} color={focused ? theme.sidebarActiveIconColor : theme.sidebarIconColor} />, }}>
        {() => <LayoutWrapper><HelpScreen /></LayoutWrapper>}
      </Drawer.Screen>
      <Drawer.Screen name="Logout" options={{ drawerIcon: ({ focused, size }) => <Ionicons name="log-out-outline" size={size} color={focused ? theme.sidebarActiveIconColor : theme.sidebarIconColor} />, }}>
        {() => <LayoutWrapper><LogoutScreen /></LayoutWrapper>}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  const { profile } = useUser();
  const { theme } = useTheme();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.drawerContent, { backgroundColor: theme.background }]}> 
      <View style={styles.profileSection}>
        <Image source={require('../assets/images/profile-placeholder.png')} style={styles.profileImage} />
        <Text style={[styles.username, { color: theme.text }]}> {profile?.username || 'Guest'} </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: { flex: 1 },
  profileSection: { alignItems: 'center', marginVertical: 30 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: 'bold' },
});
