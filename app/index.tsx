import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, ImageBackground, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../types/navigation';

const { width } = Dimensions.get('window');
const IMAGE_ASPECT_RATIO = 3 / 1;

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
        <CategoryButton
          image={require('../assets/images/grocery.png')}
          label="Grocery"
          onPress={() => navigation.navigate('Grocery')}
          gradientColors={['rgb(11, 83, 238)', 'transparent']}
        />
        <CategoryButton
          image={require('../assets/images/food.png')}
          label="Food"
          onPress={() => navigation.navigate('Food')}
          gradientColors={['crimson', 'transparent']}
        />
        <CategoryButton
          image={require('../assets/images/ride.png')}
          label="Ride"
          onPress={() => navigation.navigate('Ride')}
          gradientColors={['chocolate', 'transparent']}
        />
        <CategoryButton
          image={require('../assets/images/medicine.png')}
          label="Medicine"
          onPress={() => navigation.navigate('Medicine')}
          gradientColors={['olivedrab', 'transparent']}
        />
        <CategoryButton
          image={require('../assets/images/laundry.png')}
          label="Laundry"
          onPress={() => navigation.navigate('Laundry')}
          gradientColors={['rebeccapurple', 'transparent']}
        />
      </Animated.ScrollView>
    </View>
  );
}

function CategoryButton({ image, label, onPress, gradientColors }: any) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{
      width: width - 32,
      height: (width - 32) / IMAGE_ASPECT_RATIO,
      marginBottom: 20,
      borderRadius: 8,
      overflow: 'hidden',
      alignSelf: 'center',
      elevation: 5,
      backgroundColor: '#ccc'
    }}>
      <ImageBackground source={image} style={{ flex: 1, justifyContent: 'center' }} resizeMode="cover">
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        />
        <Text style={{ fontSize: 45, color: 'white', fontWeight: 'bold', paddingLeft: 20, fontFamily: 'Quicksand-Regular' }}>
          {label}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige'
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },

  gradientOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },

  greetingTextWrapper: {
    zIndex: 1,
    paddingHorizontal: 20,
    marginBottom: 50
  },

  greeting1: {
    fontSize: 38,
    fontFamily: 'Playfair-Regular',
    textAlign: 'right',
    color: 'gold'
  },

  greeting2: {
    fontSize: 40,
    color: 'white',
    textAlign: 'right',
    fontFamily: 'Playfair-BoldItalic'
  },

  searchWrapper: {
    position: 'absolute',
    bottom: 18,
    left: 15,
    right: 15,
    zIndex: 2
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8
  },

  searchIcon: {
    marginRight: 8
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black'
  },

  typedSentence: {
    fontSize: 20,
    fontFamily: 'Playfair-Italic',
    color: 'ghostwhite',
    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 90,
    zIndex: 3
  },

  content: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 100
  },

  shadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: 'transparent',
  }
});
