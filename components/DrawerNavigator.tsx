import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image } from 'react-native';

///// GROCERY ITEMS /////
import FruitsScreen from '../app/fruits';
import VegetablesScreen from '../app/vegetables';
import CannedgoodsScreen from '../app/canned';
import DairyScreen from '../app/dairy';
import MeatScreen from '../app/meat';
import SeafoodScreen from '../app/seafood';
import DeliScreen from '../app/deli';
import CondimentsScreen from '../app/condiments';
import SnacksScreen from '../app/snacks';
import BakedgoodsScreen from '../app/baked';
import BeveragesScreen from '../app/beverages';
import GrainsScreen from '../app/grains';
import HygieneScreen from '../app/hygiene';
import HouseholdScreen from '../app/household';
import HealthcareScreen from '../app/healthcare';
import BabycareScreen from '../app/baby';
import PetcareScreen from '../app/pet';
import PantrystaplesScreen from '../app/pantry';

///// FOOTER /////
import HomeScreen from '../app/index';
import OrderScreen from '../app/order';
import CartScreen from '../app/cart';
import ChatsScreen from '../app/chats';
import EmergencyScreen from '../app/emergency';

///// SIDEBAR /////
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
        ///// MAIN SCREEN, WHICH IS THE GROCERY /////
        { name: 'Home', component: HomeScreen },

        ///// GROCERY ITEMS ///// (rename these to the grocery item labels)
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
