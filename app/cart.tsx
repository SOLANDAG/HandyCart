import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CartItem, useCart } from '../components/context/CartContext';
import { useOrder } from '../components/context/OrderContext';

import { performTTS } from '../components/voice_commands/tts';

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

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // read cart contents to user when viewing cart
  // also auto reads when changes are made on cart
  useFocusEffect(
    useCallback(() => {
      if (cartItems.length > 0) {
        performTTS(`Current Items on Cart.`);
        for ( const item of cartItems) {
          performTTS(`${item.quantity} ${item.name} for ${item.price} pesos each.`);
        }
        performTTS(`Total Price: ${totalPrice} pesos.`);
      } else {
        performTTS('Cart is Empty.');
      }
    }, [cartItems, totalPrice])
  );
  
  const handleCOD = () => {
    if (cartItems.length === 0) return;
    addOrder(cartItems);
    clearCart();
    Alert.alert("Success", "Order placed with Cash on Delivery");
    navigation.navigate('Order' as never);
  };

  const handleGCash = async () => {
    // const key = 'pk_test_4nhMC5cR5qkf78qvws33AmWp';
    const key = 'sk_test_SGehaWybQHpsrou4QSKfn1PY';
    const encodedKey = btoa(key + ':');
    try {
      const response = await fetch('https://api.paymongo.com/v1/links', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Basic ${encodedKey}`,
        },
        body: JSON.stringify({
          data: {
            attributes: {
              amount: Math.round(totalPrice * 100),
              description: 'HandyCart Checkout',
              remarks: 'Order by Angel M.',
              currency: 'PHP',
              redirect: {
                success: 'https://handycart-success.com',
                failed: 'https://handycart-fail.com'
              }
            }
          }
        })
      });
      const data = await response.json();
      const checkoutUrl = data?.data?.attributes?.checkout_url;
      const paymentId = data?.data?.id;

      if (!checkoutUrl || !paymentId) {
        Alert.alert('Error', 'No checkout link received.');
        return;
      }

      await Linking.openURL(checkoutUrl);

      // monitor payment status every 5 secs, max 30 seconds
      let attempts = 0;
      const maxAttempts = 3;
      const interval = 5000;

      const checkPaymentStatus = async () => {
      const res = await fetch(`https://api.paymongo.com/v1/links/${paymentId}`, {
        headers: {
          accept: 'application/json',
          authorization: `Basic ${encodedKey}`,
        },
      });

      const statusData = await res.json();
      const status = statusData?.data?.attributes?.status;

      if (status === 'paid') {
        clearCart?.();
        addOrder?.(cartItems);
        navigation?.navigate?.('Order' as never);
        Alert.alert('Payment Successful', 'Your order has been placed.');
      } else if (status === 'unpaid' && attempts < maxAttempts) {
        attempts++;
        setTimeout(checkPaymentStatus, interval);
      } else {
        Alert.alert('Payment Failed', 'Payment was unsuccessful. Please try again.');
      }
    };

    setTimeout(checkPaymentStatus, interval);

      // if (checkoutUrl) {
        
      //   clearCart?.();
      //   addOrder?.(cartItems);
      //   navigation?.navigate?.('Order' as never);
      // } else {
        
      // }
    } catch (error) {
      console.error('GCash Error:', error);
      Alert.alert('Error', 'Something went wrong with GCash payment.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { marginTop: 20, fontFamily: 'Playfair-BoldItalic', paddingLeft: 20, color: 'white' }]}>MY CART</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Ionicons name="cart-outline" size={150} color="white" style={{ marginBottom: 0 }} />
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
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => decreaseQuantity(item)}>
                        <Text style={styles.qtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQuantity(item)}>
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                    <Ionicons name="trash" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                {index !== cartItems.length - 1 && <View style={styles.divider} />}
              </>
            )}
          />

          <View style={styles.checkoutRow}>
            <Text style={styles.total}>Total: ₱{totalPrice.toFixed(2)}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={styles.checkoutButton} onPress={handleCOD}>
                <Text style={styles.checkoutText}>Cash on Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkoutButton} onPress={handleGCash}>
                <Text style={styles.checkoutText}>GCash</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'brown' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  empty: { fontSize: 18, textAlign: 'center', marginTop: 5, color: 'white' },
  item: { flexDirection: 'row', paddingVertical: 15, backgroundColor: '#fff', paddingHorizontal: 10, alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'gray' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  qtyBtn: { backgroundColor: 'saddlebrown', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5 },
  qtyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  quantity: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 10 },
  removeBtn: { padding: 8, backgroundColor: 'crimson', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#ddd', marginHorizontal: 10 },
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
    borderRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  total: { fontSize: 20, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: 'saddlebrown', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  checkoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
  }
});
