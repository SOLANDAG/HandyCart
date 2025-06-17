import { Stack } from "expo-router";
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Playfair-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
      'Playfair-Bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
      'Playfair-Black': require('../assets/fonts/PlayfairDisplay-Black.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
  <Stack>
    <Stack.Screen name="index" options={{
      headerShown: false,
    }} />

    <Stack.Screen name="about" options={{
      headerShown: false,
    }}/>

    <Stack.Screen name="settings" options={{
      headerShown: false,
    }}/>

    <Stack.Screen name="profile" options={{
      headerShown: false,
    }}/>

    <Stack.Screen name="transportation" options={{
      headerShown: false,
    }}/>

    <Stack.Screen name="grocery" options={{
      headerShown: false,
    }}/>

  </Stack>);
}
