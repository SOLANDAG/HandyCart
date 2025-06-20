import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, ImageBackground, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../types/navigation';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.44;
const BUTTON_HEIGHT = width * 0.52;


export default function Index() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [typedText, setTypedText] = useState("");
  const fullText = "What do we have in mind for today?";
  const [showTyping, setShowTyping] = useState(false);
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const listener = scrollY.addListener(({ value }) => {
      if (value > 60 && !showTyping) {
        setShowTyping(true);
        let i = 0;
        const typeNext = () => {
          if (i <= fullText.length) {
            setTypedText(fullText.slice(0, i));
            i++;
            timeout = setTimeout(typeNext, 40);
          }
        };
        typeNext();
      } else if (value <= 60 && showTyping) {
        setShowTyping(false);
        setTypedText('');
      }
    });

    return () => {
      scrollY.removeListener(listener);
      if (timeout) clearTimeout(timeout);
    };
  }, [scrollY, showTyping]);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [220, 120],
    extrapolate: 'clamp',
  });
  const greetingOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.shadowWrapper}>
        <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
          <ImageBackground
            source={require('../assets/images/background.png')}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(20, 11, 2, 0.75)', 'transparent']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={[styles.gradientOverlay, { width: '200%' }]}
            />
            <View style={styles.greetingTextWrapper}>
              <AnimatedText style={[styles.greeting1, { opacity: greetingOpacity }]}>Welcome, dear</AnimatedText>
              <AnimatedText style={[styles.greeting2, { opacity: greetingOpacity }]}>Username</AnimatedText>
            </View>
            {typedText.length > 0 && <Text style={styles.typedSentence}>{typedText}</Text>}
            {showTyping && <Text style={styles.typedSentence}>{typedText}</Text>}
            <View style={styles.searchWrapper}>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={30} color="gray" style={styles.searchIcon} />
                <TextInput
                  placeholder="Search"
                  placeholderTextColor="gray"
                  style={styles.searchInput}
                  onChangeText={(text) => setQuery(text)}
                  value={query}
                />
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.gridContainer}>
          <CategoryButton
            label="Vegetables"
            image={require('../assets/images/groceryitems/vegetables.png')}
            onPress={() => navigation.navigate('Vegetables')}
          />
          <CategoryButton
            label="Fruits"
            image={require('../assets/images/groceryitems/fruits.png')}
            onPress={() => navigation.navigate('Fruits')}
          />
          <CategoryButton
            label="Meat"
            image={require('../assets/images/groceryitems/meat.png')}
            onPress={() => navigation.navigate('Meat')}
          />
          <CategoryButton
            label="Seafood"
            image={require('../assets/images/groceryitems/seafood.png')}
            onPress={() => navigation.navigate('Seafood')}
          />
          <CategoryButton
            label="Beverages"
            image={require('../assets/images/groceryitems/beverages.png')}
            onPress={() => navigation.navigate('Beverages')}
          />
          <CategoryButton
            label="Canned Goods"
            image={require('../assets/images/groceryitems/canned.png')}
            onPress={() => navigation.navigate('Cannedgoods')}
          />
          <CategoryButton
            label="Dairy"
            image={require('../assets/images/groceryitems/dairy.png')}
            onPress={() => navigation.navigate('Dairy')}
          />
          <CategoryButton
            label="Deli"
            image={require('../assets/images/groceryitems/deli.png')}
            onPress={() => navigation.navigate('Deli')}
          />
          <CategoryButton
            label="Condiments"
            image={require('../assets/images/groceryitems/condiments.png')}
            onPress={() => navigation.navigate('Condiments')}
          />
          <CategoryButton
            label="Snacks"
            image={require('../assets/images/groceryitems/snacks.png')}
            onPress={() => navigation.navigate('Snacks')}
          />
          <CategoryButton
            label="Baked Goods"
            image={require('../assets/images/groceryitems/baked.png')}
            onPress={() => navigation.navigate('Bakedgoods')}
          />
          <CategoryButton
            label="Grains"
            image={require('../assets/images/groceryitems/grains.png')}
            onPress={() => navigation.navigate('Grains')}
          />
          <CategoryButton
            label="Hygiene"
            image={require('../assets/images/groceryitems/hygiene.png')}
            onPress={() => navigation.navigate('Hygiene')}
          />
          <CategoryButton
            label="Household"
            image={require('../assets/images/groceryitems/household.png')}
            onPress={() => navigation.navigate('Household')}
          />
          <CategoryButton
            label="Healthcare"
            image={require('../assets/images/groceryitems/healthcare.png')}
            onPress={() => navigation.navigate('Healthcare')}
          />
          <CategoryButton
            label="Baby Care"
            image={require('../assets/images/groceryitems/baby.png')}
            onPress={() => navigation.navigate('Babycare')}
          />
          <CategoryButton
            label="Pet Care"
            image={require('../assets/images/groceryitems/pet.png')}
            onPress={() => navigation.navigate('Petcare')}
          />
          <CategoryButton
            label="Pantry Staples"
            image={require('../assets/images/groceryitems/pantry.png')}
            onPress={() => navigation.navigate('Pantrystaples')}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

function CategoryButton({ image, label, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.categoryButton}>
      <Image source={image} style={styles.categoryImage} resizeMode="contain" />
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'brown' },

  imageBackground: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  gradientOverlay: { position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 },

  greetingTextWrapper: { zIndex: 1, paddingHorizontal: 20, marginBottom: 50 },
  greeting1: { fontSize: 38, fontFamily: 'Playfair-Regular', textAlign: 'right', color: 'gold' },
  greeting2: { fontSize: 40, color: 'white', textAlign: 'right', fontFamily: 'Playfair-BoldItalic' },

  searchWrapper: { position: 'absolute', bottom: 18, left: 15, right: 15, zIndex: 2 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 50, paddingHorizontal: 12, paddingVertical: 8 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: 'black' },

  typedSentence: { fontSize: 20, fontFamily: 'Playfair-Italic', color: 'ghostwhite', textAlign: 'left', paddingHorizontal: 8, marginBottom: 90, zIndex: 3 },

  content: { padding: 16, alignItems: 'center', paddingBottom: 100 },

  shadowWrapper: {
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 10, backgroundColor: 'transparent',
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },

  categoryButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },

  categoryImage: {
    width: '60%',
    height: '60%',
    marginBottom: 8,
  },

  categoryLabel: {
    fontSize: 16,
    color: 'saddlebrown',
    fontFamily: 'Quicksand-Bold'
  }
});
