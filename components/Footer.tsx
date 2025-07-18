import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../types/navigation';
import { useTheme } from './context/ThemeContext';
import { handleSOS } from './SOSButton';

export default function Footer() {
  const { theme } = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const state = useNavigationState(state => state);
  const currentRouteName = state.routes[state.index].name;

  return (
    <View style={[styles.footerContainer, { backgroundColor: theme.background, shadowColor: theme.icon }]}>
      {['Order', 'Cart', 'Home', 'Chats'].map((route) => (
        <TouchableOpacity key={route} style={styles.button} onPress={() => navigation.navigate(route as keyof DrawerParamList)}>
          <Ionicons
            name={currentRouteName === route ? getIcon(route, true) : getIcon(route, false)}
            size={32}
            color={theme.icon}
          />
          <Text style={[styles.label, { color: theme.text }]}>{route}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSOS}>
        <Ionicons name="warning-outline" size={32} color="crimson" />
        <Text style={[styles.label, { color: theme.text }]}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const getIcon = (route: string, active: boolean) => {
  const icons: Record<string, [string, string]> = {
    Order: ['cube-outline', 'cube'],
    Cart: ['cart-outline', 'cart'],
    Home: ['home-outline', 'home'],
    Chats: ['chatbubble-outline', 'chatbubble'],
  };
  return active ? icons[route][1] : icons[route][0];
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    paddingBottom: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
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
    marginTop: 5,
    fontWeight: '600',
  },
});
