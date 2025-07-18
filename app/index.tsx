// index.tsx
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../types/navigation';

import { useTheme } from '../components/context/ThemeContext';
import { useUser } from '../components/context/UserContext';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.445;
const BUTTON_HEIGHT = width * 0.52;

export default function Index() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [typedText, setTypedText] = useState("");
  const fullText = "What do we have in mind for today?";
  const [showTyping, setShowTyping] = useState(false);
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const [query, setQuery] = useState("");

  const { profile } = useUser();
  const { theme } = useTheme();

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
    <View style={[styles.container, { backgroundColor: theme.pageBackground }]}> 
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
              <AnimatedText style={[styles.greeting2, { opacity: greetingOpacity }]}>{profile?.username || 'Guest'}</AnimatedText>
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
          {categories.map((category) => (
            <CategoryButton
              key={category.label}
              label={category.label}
              image={category.image}
              onPress={() => navigation.navigate(category.route as keyof DrawerParamList)}
              theme={theme}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const categories = [
  { label: 'Vegetables', image: require('../assets/images/groceryitems/vegetables.png'), route: 'Vegetables' },
  { label: 'Fruits', image: require('../assets/images/groceryitems/fruits.png'), route: 'Fruits' },
  { label: 'Meat', image: require('../assets/images/groceryitems/meat.png'), route: 'Meat' },
  { label: 'Seafood', image: require('../assets/images/groceryitems/seafood.png'), route: 'Seafood' },
  { label: 'Beverages', image: require('../assets/images/groceryitems/beverages.png'), route: 'Beverages' },
  { label: 'Canned Goods', image: require('../assets/images/groceryitems/canned.png'), route: 'Cannedgoods' },
  { label: 'Dairy', image: require('../assets/images/groceryitems/dairy.png'), route: 'Dairy' },
  { label: 'Deli', image: require('../assets/images/groceryitems/deli.png'), route: 'Deli' },
  { label: 'Condiments', image: require('../assets/images/groceryitems/condiments.png'), route: 'Condiments' },
  { label: 'Snacks', image: require('../assets/images/groceryitems/snacks.png'), route: 'Snacks' },
  { label: 'Baked Goods', image: require('../assets/images/groceryitems/baked.png'), route: 'Bakedgoods' },
  { label: 'Grains', image: require('../assets/images/groceryitems/grains.png'), route: 'Grains' },
  { label: 'Hygiene', image: require('../assets/images/groceryitems/hygiene.png'), route: 'Hygiene' },
  { label: 'Household', image: require('../assets/images/groceryitems/household.png'), route: 'Household' },
  { label: 'Healthcare', image: require('../assets/images/groceryitems/healthcare.png'), route: 'Healthcare' },
  { label: 'Baby Care', image: require('../assets/images/groceryitems/baby.png'), route: 'Babycare' },
  { label: 'Pet Care', image: require('../assets/images/groceryitems/pet.png'), route: 'Petcare' },
  { label: 'Pantry Staples', image: require('../assets/images/groceryitems/pantry.png'), route: 'Pantrystaples' },
];

function CategoryButton({ image, label, onPress, theme }: any) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.categoryButton, { backgroundColor: theme.card }]}> 
      <Image source={image} style={styles.categoryImage} resizeMode="contain" />
      <Text style={[styles.categoryLabel, { color: theme.gridText }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  categoryImage: {
    width: '60%',
    height: '60%',
    marginBottom: 8,
  },

  categoryLabel: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },
});
