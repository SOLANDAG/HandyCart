import { Link } from "expo-router";
import { Text, View, StyleSheet, Image, ScrollView, Animated, ImageBackground, TextInput  } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRef } from 'react';

import Header from '../components/Header';

export default function Index() {
  const scrollY = useRef(new Animated.Value(0)).current;

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
      
      <Header />

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
          <AnimatedText style={[styles.greeting1, { opacity: greetingOpacity }]}>
            Welcome, dear
          </AnimatedText>
          <AnimatedText style={[styles.greeting2, { opacity: greetingOpacity }]}>
            Abcedefg
          </AnimatedText>
        </View>

        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
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

        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
        <Link href={"/grocery"} style={styles.linkButton}>Grocery</Link>
        <Link href={"/transportation"} style={styles.linkButton}>Transportation</Link>
        <Link href={"/about"} style={styles.linkButton}>About</Link>
      </Animated.ScrollView>
      
      <View style={styles.footer}>
        <Link href={"/settings"}>
          <Ionicons name="settings" size={40} color="black" />
        </Link>

        <Link href={"/"}>
          <Ionicons name="home" size={40} color="black" />
        </Link>

        <Link href={"/profile"}>
          <Ionicons name="finger-print" size={40} color="black" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  greetingSection: {
  height: '33%',
  width: '100%',
  overflow: 'hidden',
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  gradientOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },

  greetingTextWrapper: {
    zIndex: 1,
    paddingHorizontal: 20,
    marginBottom: 60
  },

  greeting1: {
    fontSize: 38,
    fontFamily: 'Playfair-Bold',
    textAlign: 'right',
    color: 'white',
  },

  greeting2: {
    fontSize: 50,
    color: 'goldenrod',
    textAlign: 'right',
    fontFamily: 'Playfair-Regular',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 40,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },

  container: {
    flex: 1,
    backgroundColor: "beige",
  },
  content: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 100,
  },
  text: {
    color: 'grey',
    fontSize: 22,
    marginBottom: 20,
  },
  linkButton: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "pink",
    marginBottom: 10,
  },

  icon: {
    width: 50,
    height: 50,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'burlywood',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  
  searchWrapper: {
  position: 'absolute',
  bottom: 10,
  left: 20,
  right: 20,
  zIndex: 2,
  }

});
