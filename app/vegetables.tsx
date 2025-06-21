import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCart } from '../components/context/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.459;
const CARD_HEIGHT = 300;

export default function Vegetables() {
  const [search, setSearch] = useState('');
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  const products = [
    { id: 1001, name: 'Tomatoes', description: 'Fresh and juicy red tomatoes.', price: 119, weight: '1 Kg', rating: 4.5, sold: 1700, image: require('../assets/images/vegetables/tomato.png') },
    { id: 1002, name: 'Lettuce', description: 'Crisp green lettuce, perfect for salads.', price: 150, weight: '1 Kg', rating: 4.3, sold: 900, image: require('../assets/images/vegetables/lettuce.png') },
    { id: 1003, name: 'Carrots', description: 'Sweet orange carrots full of nutrients.', price: 180, weight: '1 Kg', rating: 4.8, sold: 2400, image: require('../assets/images/vegetables/carrot.png') },
    { id: 1004, name: 'Broccoli', description: 'Fresh green broccoli florets.', price: 320, weight: '1 Kg', rating: 4.2, sold: 600, image: require('../assets/images/vegetables/broccoli.png') },
    { id: 1005, name: 'Spinach', description: 'Tender spinach leaves, rich in iron.', price: 250, weight: '1 Kg', rating: 4.7, sold: 1100, image: require('../assets/images/vegetables/spinach.png') },
    { id: 1006, name: 'Cucumbers', description: 'Cool and crunchy cucumbers.', price: 190, weight: '1 Kg', rating: 4.1, sold: 750, image: require('../assets/images/vegetables/cucumber.png') },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="Search vegetables..."
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

                  <TouchableOpacity onPress={() => toggleFavorite({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image
                  })}>
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
