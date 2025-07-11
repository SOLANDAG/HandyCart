import React from 'react';
import Header from './Header';
import Footer from './Footer';

import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';

const HIDDEN_SCREENS = ['Login', 'Register', 'Logout'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const route = useRoute();
  const shouldHideUI = HIDDEN_SCREENS.includes(route.name);
  
  return (
    <View style={{ flex: 1 }}>
      {!shouldHideUI && (
        <>
          <Header />
        </>
      )}

      {children}

      {!shouldHideUI && (
        <Footer />
      )}
    </View>
  );
}
