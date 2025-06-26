import { Ionicons } from '@expo/vector-icons';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { DrawerParamList } from '../types/navigation';

export default function Header() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={28} color="saddlebrown" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/handyCart1.png')}
            style={styles.logo}
          />
          <Text style={styles.appName}>HandyCart</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Ionicons name="star" size={28} color="gold" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    zIndex: 5,
    marginBottom: -10,
  },

  header: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  logo: {
    width: 30,
    height: 30,
  },

  appName: {
    fontSize: 20,
    color: 'brown',
    fontFamily: 'Playfair-Black',
  },
});
