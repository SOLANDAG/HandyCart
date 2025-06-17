import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/handyCart1.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>HandyCart</Text>
      </View>

      <TouchableOpacity onPress={() => console.log("Cart pressed")}>
        <Ionicons name="star" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: 80,
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
    fontFamily: 'Playfair-Black'
  },
});
