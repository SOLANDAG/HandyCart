import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../components/context/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.459;
const CARD_HEIGHT = 300;

export default function Favorites() {
  const { favorites, addToCart, toggleFavorite, isFavorite } = useCart();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'Playfair-BoldItalic', marginTop: 40 }]}>MY FAVORITES</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Ionicons name="star-outline" size={150} color="gold" style={{ marginBottom: 0 }} />
          <Text style={styles.empty}>No favorites yet</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {favorites.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₱{item.price.toFixed(2)}</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      quantity: 1
                    })}
                  >
                    <Text style={styles.cartButtonText}>Add to Cart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => toggleFavorite(item)}>
                    <Ionicons
                      name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                      size={22}
                      color={isFavorite(item.id) ? 'crimson' : 'saddlebrown'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'beige', paddingTop: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: 'saddlebrown', marginBottom: 20 },

  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
  },
  empty: { fontSize: 18, textAlign: 'center', marginTop: 5, color: 'gray' },

  scrollContent: { paddingBottom: 100, paddingHorizontal: 10 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  productImage: { width: '100%', height: 120, borderRadius: 8 },
  productName: { fontSize: 16, fontWeight: 'bold', color: 'saddlebrown', marginTop: 8 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: 'darkgreen', marginTop: 4 },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },

  cartButton: { backgroundColor: 'saddlebrown', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  cartButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
});
