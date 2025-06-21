import React from 'react';
import DrawerNavigator from './components/DrawerNavigator';
import { CartProvider } from './components/context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <DrawerNavigator />
    </CartProvider>
  );
}
