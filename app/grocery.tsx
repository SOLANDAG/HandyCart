import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

export default function Grocery() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Vegetables', image: require('../assets/images/vegetables.png') },
    { name: 'Fruits', image: require('../assets/images/fruits.png') },
    { name: 'Meats', image: require('../assets/images/meats.png') },
    { name: 'Drinks', image: require('../assets/images/drinks.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search groceries..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.categoryContainer} showsVerticalScrollIndicator={false}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => {
              //we will add that later
              console.log(`Selected: ${item.name}`);
            }}
          >
            <Image source={item.image} style={styles.categoryImage} resizeMode="contain" />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
    padding: 16,
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },

  categoryButton: {
    width: (width - 64) / 2,
    aspectRatio: 1,
    backgroundColor: '#FFEFD5',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 4,
  },

  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },

  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
