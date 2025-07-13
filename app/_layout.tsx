import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import DrawerNavigator from '../components/DrawerNavigator';
import { CartProvider } from '../components/context/CartContext';
import { UserProvider } from '../components/context/UserContext';
import { OrderProvider } from '../components/context/OrderContext';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Playfair-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
        'Playfair-Bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
        'Playfair-Black': require('../assets/fonts/PlayfairDisplay-Black.ttf'),
        'Playfair-BoldItalic': require('../assets/fonts/PlayfairDisplay-BoldItalic.ttf'),
        'Playfair-Italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
        'Baloo2-Regular': require('../assets/fonts/Baloo2-Regular.ttf'),
        'Baloo2-Bold': require('../assets/fonts/Baloo2-Bold.ttf'),
        'Baloo2-Medium': require('../assets/fonts/Baloo2-Medium.ttf'),
        'Baloo2-SemiBold': require('../assets/fonts/Baloo2-SemiBold.ttf'),
        'Baloo2-ExtraBold': require('../assets/fonts/Baloo2-ExtraBold.ttf'),
        'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
        'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserProvider>
      <CartProvider>
        <OrderProvider>
          <DrawerNavigator />
        </OrderProvider>
      </CartProvider>
    </UserProvider>
  );
}
