import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 150;

export default function Vegetables() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const products = [
    { id: 1, name: 'Tomatoes', description: 'Fresh and juicy red tomatoes.', price: '$2.99', weight: '1 Kg', image: require('../assets/images/img-placeholder.png') },
    { id: 2, name: 'Lettuce', description: 'Crisp green lettuce, perfect for salads.', price: '$1.50', weight: '1 Kg', image: require('../assets/images/img-placeholder.png') },
    { id: 3, name: 'Carrots', description: 'Sweet orange carrots full of nutrients.', price: '$1.80', weight: '1 Kg', image: require('../assets/images/img-placeholder.png') },
    { id: 4, name: 'Broccoli', description: 'Fresh green broccoli florets.', price: '$3.20', weight: '1 Kg', image: require('../assets/images/img-placeholder.png') },
    { id: 5, name: 'Spinach', description: 'Tender spinach leaves, rich in iron.', price: '$2.50', weight: '1 Kg', image: require('../assets/images/img-placeholder.png') },
    { id: 6, name: 'Cucumbers', description: 'Cool and crunchy cucumbers.', price: '$1.90', weight: '1 Kg', image: require('../assets/images/img-placeholder.png') },
  ];

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            style={styles.searchInput}
            onChangeText={setSearch}
            value={search}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {products
          .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productWeight}>{item.weight}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <Ionicons
                    name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                    size={26}
                    color={favorites.includes(item.id) ? 'crimson' : 'saddlebrown'}
                  />
                </TouchableOpacity>
              </View>

            </View>
          </View>
        ))}

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
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: 'black' },

  scrollContent: { paddingBottom: 100, alignItems: 'center' },

  card: {
    flexDirection: 'row',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },

  productImage: { width: 100, height: 100, borderRadius: 15 },

  productDetails: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },

  productName: { fontSize: 20, fontWeight: 'bold', color: 'saddlebrown' },
  productDescription: { fontSize: 14, color: '#555' },
  productWeight: { fontSize: 14, color: '#555' },
  productPrice: { fontSize: 18, color: 'darkgreen', fontWeight: 'bold' },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cartButton: {
    backgroundColor: 'saddlebrown',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cartButtonText: { color: 'white', fontSize: 14 },
});
