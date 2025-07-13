import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useOrder } from '../components/context/OrderContext';

// Displays a list of past orders, including status and items.
export default function History() {
  const { orders } = useOrder();


// Returns a readable color based on order status.
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'crimson';
      default:
        return 'orange';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Order History</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Ionicons name="document-text-outline" size={100} color="#aaa" />
          <Text style={styles.emptyText}>No order history yet.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{item.id}</Text>
                <Text
                  style={[
                    styles.status,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status.toUpperCase()}
                </Text>
              </View>

              {item.items.map((cartItem) => (
                <View key={cartItem.id} style={styles.itemRow}>
                  <Image source={cartItem.image} style={styles.image} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.name}>{cartItem.name}</Text>
                    <Text style={styles.price}>
                      ₱{cartItem.price.toFixed(2)} x {cartItem.quantity}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Playfair-BoldItalic',
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#777',
    fontFamily: 'Quicksand-Medium',
  },
  list: {
    paddingBottom: 70,
  },
  orderCard: {
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Quicksand-Bold',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Quicksand-Bold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Quicksand-SemiBold',
  },
  price: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
    fontFamily: 'Quicksand-Regular',
  },
});
