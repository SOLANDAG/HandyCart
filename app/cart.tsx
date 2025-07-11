import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CartItem, useCart } from '../components/context/CartContext';
import { useOrder } from '../components/context/OrderContext';

import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase_config";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, decreaseFromCart, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigation = useNavigation();

  const increaseQuantity = (item: CartItem) => {
    addToCart(item);
  };

  const decreaseQuantity = (item: CartItem) => {
    decreaseFromCart(item.id);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    addOrder(cartItems);
    clearCart();
    navigation.navigate('Order' as never);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const payWithGcash = async () => {
    try {
      const functions = getFunctions(app, "asia-southeast1");
      const createGcashPayment = httpsCallable(functions, "createGcashPayment");

      const response = await createGcashPayment({
  amount: totalPrice,
  orderId: "ORDER_" + Date.now(),
  customerName: "Angel M.",
  email: "eabarjaa@gmail.com",
});

const data = response.data as { checkoutUrl: string };
const checkoutUrl = data.checkoutUrl;

      if (checkoutUrl) {
        Linking.openURL(checkoutUrl);
      } else {
        Alert.alert("Error", "No checkout URL received.");
      }
    } catch (error) {
      console.error("GCash Payment Error:", error);
      Alert.alert("Payment failed", "Something went wrong. Try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'Playfair-BoldItalic', color: 'white' }]}>
        MY CART
      </Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Ionicons name="cart-outline" size={150} color="white" />
          <Text style={styles.empty}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 135 }}
            renderItem={({ item, index }) => (
              <>
                <View style={styles.item}>
                  <Image source={item.image} style={styles.image} />
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>₱{item.price.toFixed(2)}</Text>

                    <View style={styles.quantityRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => decreaseQuantity(item)}
                      >
                        <Text style={styles.qtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => increaseQuantity(item)}
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                  >
                    <Ionicons name="trash" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                {index !== cartItems.length - 1 && <View style={styles.divider} />}
              </>
            )}
          />

          {/* Checkout Bar with both COD and GCash */}
          <View style={styles.checkoutRow}>
            <Text style={styles.total}>Total: ₱{totalPrice.toFixed(2)}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>COD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkoutButton} onPress={payWithGcash}>
                <Text style={styles.checkoutText}>GCash</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'brown',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    paddingLeft: 20,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'gray',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  qtyBtn: {
    backgroundColor: 'saddlebrown',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
  },
  qtyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  removeBtn: {
    padding: 8,
    backgroundColor: 'crimson',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  checkoutRow: {
    position: 'absolute',
    bottom: 93,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'saddlebrown',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});