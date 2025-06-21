import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCart } from '../components/context/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.459;
const CARD_HEIGHT = 300;

export default function Hygiene() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addToCart } = useCart();

  const products = [
    { id: 13001, name: 'Shampoo', description: 'Refreshing hair shampoo.', price: 180, weight: '400 ml', rating: 4.8, sold: 1000, image: require('../assets/images/img-placeholder.png') },
    { id: 13002, name: 'Body Soap', description: 'Moisturizing body soap.', price: 70, weight: '135 g', rating: 4.7, sold: 900, image: require('../assets/images/img-placeholder.png') },
    { id: 13003, name: 'Toothpaste', description: 'Whitening toothpaste.', price: 90, weight: '140 g', rating: 4.6, sold: 1100, image: require('../assets/images/img-placeholder.png') },
    { id: 13004, name: 'Mouthwash', description: 'Fresh mint mouthwash.', price: 150, weight: '500 ml', rating: 4.5, sold: 600, image: require('../assets/images/img-placeholder.png') },
    { id: 13005, name: 'Deodorant', description: 'Long-lasting deodorant.', price: 100, weight: '50 ml', rating: 4.4, sold: 700, image: require('../assets/images/img-placeholder.png') },
    { id: 13006, name: 'Facial Cleanser', description: 'Gentle facial cleanser.', price: 200, weight: '150 ml', rating: 4.3, sold: 500, image: require('../assets/images/img-placeholder.png') },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="Search hygiene products..."
            placeholderTextColor="gray"
            style={styles.searchInput}
            onChangeText={setSearch}
            value={search}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {products
            .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₱{item.price.toFixed(2)}</Text>

                <View style={styles.ratingRow}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < Math.floor(item.rating) ? 'star' : 'star-outline'}
                      size={14}
                      color="gold"
                    />
                  ))}
                  <Text style={styles.soldText}>{item.sold} sold</Text>
                </View>

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

                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <Ionicons
                      name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                      size={22}
                      color={favorites.includes(item.id) ? 'crimson' : 'saddlebrown'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'beige', paddingTop: 20 },
  searchWrapper: { paddingHorizontal: 16, marginBottom: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: 'black' },

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

  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  soldText: { marginLeft: 6, fontSize: 12, color: '#777' },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },

  cartButton: { backgroundColor: 'saddlebrown', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  cartButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
});
