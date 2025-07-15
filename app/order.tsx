import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useOrder } from '../components/context/OrderContext';
import { performTTS } from '../components/voice_commands/tts';
import { requestLocationPermission } from '../components/locationPermission';

// default location set to Mapua Makati
const default_latitude = 14.566457;
const default_longitude = 121.01505;

export default function Order() {
  const navigation = useNavigation();
  const { orders, cancelOrder, markOrderDelivered } = useOrder();

  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [originLocation, setOriginLocation] = useState({
    latitude: default_latitude,
    longitude: default_longitude,
  });
  const [isDelivered, setIsDelivered] = useState(false);
  const [fiveMinLeft, setFiveMinLeft] = useState(false);

  const map = useRef<MapView>(null);
  const interval = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      const coords = await requestLocationPermission();
      if (!coords) return;

      setUserLocation(coords);

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (loc) => setUserLocation(loc.coords)
      );
    })();
  }, []);

  // reset origin location when there's new order
  useEffect(() => {
    if (latestOrder?.status === 'active') {
      setOriginLocation({
        latitude: default_latitude,
        longitude: default_longitude,
      });
      setIsDelivered(false);

      // send delivery estimate
      const latDiff = userLocation.latitude - default_latitude;
      const longDiff = userLocation.longitude - default_longitude;
      const dist = Math.sqrt(latDiff * latDiff + longDiff * longDiff);

      const mins = Math.round(dist * 500);

      Alert.alert('Delivery Status', `Delivery started. Estimate to arrive in ${mins} minutes.`);
      performTTS(`Delivery started. Estimate to arrive in ${mins} minutes.`);
      setFiveMinLeft(false);
    }
  }, [latestOrder]);

  useEffect(() => {
    if (!userLocation || isDelivered || !latestOrder || latestOrder.status !== 'active') return;

    if (interval.current) clearInterval(interval.current);

    interval.current = setInterval(() => {
      setOriginLocation((prev) => {
        const latDiff = userLocation.latitude - prev.latitude;
        const longDiff = userLocation.longitude - prev.longitude;
        const dist = Math.sqrt(latDiff * latDiff + longDiff * longDiff);

        if (!fiveMinLeft && dist < 0.01) {
          setFiveMinLeft(true);
          const mins = Math.round(dist * 500);
          Alert.alert('Delivery Status', `Delivery will arrive in ${mins} minutes.`);
          performTTS(`Delivery will arrive in ${mins} minutes.`);
        }

        if (dist < 0.00015) {
          clearInterval(interval.current!);
          setIsDelivered(true);
          markOrderDelivered(latestOrder.id);

          performTTS("Your delivery is here!");
          Alert.alert('Delivered!', 'Your delivery has arrived.', [
            { text: 'OK', onPress: () => navigation.navigate('Home' as never) },
          ]);
          
          return prev;
        }

        const step = dist < 0.001 ? 0.0001 : 0.001;

        return {
          latitude: prev.latitude + (latDiff / dist) * step,
          longitude: prev.longitude + (longDiff / dist) * step,
        };
      });
    }, 1000);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [userLocation, isDelivered, latestOrder, navigation, markOrderDelivered, fiveMinLeft]);

  if (!latestOrder) {
    return (
      <View style={styles.emptyWrapper}>
        <Text style={styles.emptyText}>You have no current orders.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.status}>
        Status: <Text style={{ fontWeight: 'bold' }}>{latestOrder.status.toUpperCase()}</Text>
      </Text>

      {latestOrder.status === 'active' && !isDelivered && (
        <View style={styles.cancelWrapper}>
          <Button
            title="Cancel Order"
            color="crimson"
            onPress={() =>
              Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
                { text: 'No', style: 'cancel' },
                {
                  text: 'Yes',
                  onPress: () => {
                    cancelOrder(latestOrder.id);
                    Alert.alert('Order Cancelled', 'Your order has been cancelled.');
                    performTTS('Your order has been cancelled.');
                  },
                },
              ])
            }
          />
        </View>
      )}

      <FlatList
        data={latestOrder.items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemInfo}>Qty: {item.quantity}</Text>
            <Text style={styles.itemInfo}>₱{(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.mapTitle}>Delivery Tracker</Text>

      <MapView
        ref={map}
        style={styles.map}
        initialRegion={{
          latitude: originLocation.latitude,
          longitude: originLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={originLocation} title="Driver" pinColor="blue" />
        {userLocation && (
          <>
            <Marker coordinate={userLocation} title="You" />
            <Polyline
              coordinates={[originLocation, userLocation]}
              strokeColor="#000"
              strokeWidth={3}
            />
          </>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
    fontFamily: 'Playfair-Bold',
  },
  status: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingBottom: 10,
    color: '#333',
    fontFamily: 'Quicksand-Medium',
  },
  cancelWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
  },
  itemInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
    fontFamily: 'Quicksand-Regular',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
    fontFamily: 'Playfair-BoldItalic',
  },
  map: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').height / 2.5,
    marginTop: 10,
    marginBottom: 120, 
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: '#fff',
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    fontFamily: 'Quicksand-Regular',
  },
});