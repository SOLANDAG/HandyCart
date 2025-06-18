import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import DrawerNavigator from '../components/DrawerNavigator';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Playfair-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
      'Playfair-Bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
      'Playfair-Black': require('../assets/fonts/PlayfairDisplay-Black.ttf'),
      'Playfair-BoldItalic': require('../assets/fonts/PlayfairDisplay-BoldItalic.ttf'),
      'Playfair-Italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <DrawerNavigator />;
}
