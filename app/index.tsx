import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../types/navigation';

export default function Index() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [typedText, setTypedText] = useState("");
  const fullText = "What do we have in mind for today?";
  const [showTyping, setShowTyping] = useState(false);

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

  const AnimatedText = Animated.createAnimatedComponent(Text);
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
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
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
            <AnimatedText style={[styles.greeting2, { opacity: greetingOpacity }]}>Olive</AnimatedText>
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

      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Text style={styles.text}>HandyCart</Text>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Grocery')}>
          <Text style={styles.linkText}>Grocery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Transportation')}>
          <Text style={styles.linkText}>Transportation</Text>
        </TouchableOpacity>

      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  greetingSection: {
    height: '33%',
    width: '100%',
    overflow: 'hidden' },

  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20 },

  gradientOverlay: {
    position: 'absolute',
    top: 0, bottom: 0,
    right: 0 },

  greetingTextWrapper: {
    zIndex: 1,
    paddingHorizontal: 20,
    marginBottom: 50 },

  greeting1: {
    fontSize: 38,
    fontFamily: 'Playfair-Regular',
    textAlign: 'right',
    color: 'gold' },

  greeting2: {
    fontSize: 40,
    color: 'white',
    textAlign: 'right',
    fontFamily: 'Playfair-BoldItalic' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8 },

  searchIcon: {
    marginRight: 8 },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black' },
  
  container: {
    flex: 1,
    backgroundColor: 'white' },

  content: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 100 },

  text: {
    color: 'grey',
    fontSize: 22,
    marginBottom: 20 },

  linkButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10 },

  linkText: {
    fontSize: 20,
    color: 'saddlebrown',
    fontWeight: '600' },

  searchWrapper: {
    position: 'absolute',
    bottom: 18,
    left: 15,
    right: 15,
    zIndex: 2 },

  typedSentence: {
    fontSize: 20,
    fontFamily: 'Playfair-Italic',
    color: 'ghostwhite',
    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 95,
    zIndex: 3 },
});
