import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

///// HEADER /////
import FavoritesScreen from '../app/favorites';

///// GROCERY ITEMS /////
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

///// FOOTER /////
import CartScreen from '../app/cart';
import ChatsScreen from '../app/chats';
import EmergencyScreen from '../app/emergency';
import HomeScreen from '../app/index';
import OrderScreen from '../app/order';

///// SIDEBAR /////
import AboutScreen from '../app/about';
import HelpScreen from '../app/help';
import HistoryScreen from '../app/history';
import PaymentScreen from '../app/payment';
import ProfileScreen from '../app/profile';
import SettingsScreen from '../app/settings';
import LogoutScreen from '../app/logout';

///// USER AUTHENTICATION /////
import LoginScreen from '../app/login';
import RegisterScreen from '../app/register';

import type { DrawerParamList } from '../types/navigation';
import LayoutWrapper from './LayoutWrapper';


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
        ///// MAIN SCREEN, WHICH IS THE GROCERY INDEX PAGE /////
        { name: 'Home', component: HomeScreen },

        ///// HEADER /////
        { name: 'Favorites', component: FavoritesScreen },

        ///// GROCERY ITEMS /////
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

        ///// FOOTER /////
        { name: 'Order', component: OrderScreen },
        { name: 'Cart', component: CartScreen },
        { name: 'Chats', component: ChatsScreen },
        // { name: 'Emergency', component: EmergencyScreen }
        { name: 'Emergency', component: EmergencyScreen },

        ///// USER AUTHENTICATION /////
        { name: 'Login', component: LoginScreen },
        { name: 'Register', component: RegisterScreen }
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
      <Drawer.Screen
        name="Logout"
        options={{
          drawerIcon: ({ size }) => <Ionicons name="log-out-outline" size={size} color="saddlebrown" />
        }}
        children={() => <LayoutWrapper><LogoutScreen /></LayoutWrapper>}
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
