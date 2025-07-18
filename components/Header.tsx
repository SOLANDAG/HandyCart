import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from './context/CartContext';
import { useTheme } from './context/ThemeContext';
import { startSTT } from './voice_commands/stt';

export default function Header() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const cart = useCart();
  const { isRecording, startRecording, stopRecording } = startSTT(navigation, cart);

  return (
    <View style={[styles.headerWrapper, { backgroundColor: theme.background }]}> 
      <View style={[styles.header, { backgroundColor: theme.background, shadowColor: theme.icon }]}> 
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={28} color={theme.icon} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/handyCart1.png')} style={styles.logo} />
          <Text style={[styles.appName, { color: theme.text }]}>HandyCart</Text>
        </View>

        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites' as never)} style={{ marginLeft: -33 }}>
            <Ionicons name="star" size={28} color="gold" />
          </TouchableOpacity>

          {isRecording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Ionicons name="stop" size={28} color="red" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Ionicons name="mic" size={28} color={theme.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    zIndex: 5,
    marginBottom: -10,
  },
  header: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontFamily: 'Playfair-Black',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});