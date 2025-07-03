import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert, Dimensions } from "react-native";
import MapView, {Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

export default function Tracking() {
    const navigation = useNavigation();

    const [ userLocation, setUserLocation ] = useState<Location.LocationObjectCoords | null>(null);
    // This will be the location of the driver
    // Setting it to Mapua Makati for testing
    const [ originLocation, setOriginLocation] = useState({
        latitude: 14.566457,
        longitude: 121.01505,
    }); 

    const [ isDelivered, setIsDelivered ] = useState(false);
    
    const map = useRef<MapView>(null);
    const interval = useRef<number | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Error", 'Permission to access location was denied');
                return;
            }
            // user's current location, this will be the destination
            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);

            // check user location change
            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 3000,
                    distanceInterval: 5,
                }, 
                (loc) => {
                    setUserLocation(loc.coords);
                }
            );
        })();
    },[]);

    // animate tracking
    useEffect(() => {
        if (!userLocation || isDelivered) return;
        if (interval.current) clearInterval(interval.current);

        interval.current = setInterval(() => {
            setOriginLocation((prev) => {
                const latDiff = userLocation.latitude - prev.latitude;
                const longDiff = userLocation.longitude - prev.longitude;

                const dist = Math.sqrt(latDiff * latDiff + longDiff * longDiff);

                // stop if reached
                if (dist < 0.00015) {
                    clearInterval(interval.current!);
                    setIsDelivered(true);
                    // confirm and redirect to Index
                    Alert.alert("Delivery Status", "Your delivery is here!", [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate('Home' as never)
                        }
                    ]);
                    return prev;
                }

                // adjust speed if nearby 
                let step = 0.001;
                if (dist < 0.001) {
                    step = 0.0001;
                }
                const latNew = prev.latitude + (latDiff / dist) * step;
                const longNew = prev.longitude + (longDiff / dist) * step;

                return {
                    latitude: latNew,
                    longitude: longNew,
                };
            });
        }, 1000);

        return () => {
            if (interval.current) clearInterval(interval.current);
        };
    }, [userLocation, isDelivered, navigation]);

    return (
        <View
            style={styles.container}
        >
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
                            strokeColor="#000000"
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
  },
  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});