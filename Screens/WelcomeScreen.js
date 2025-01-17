import React, { useEffect, useRef } from 'react';
import { View,Text, StyleSheet,SafeAreaView, Animated,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const rotation = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animateDot = (dot, delay) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dot, { toValue: 1, duration: 300, delay, useNativeDriver: true,}),
        Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true,}),
      ])
    ).start();
  };

  useEffect(() => { animateDot(dot1, 0); animateDot(dot2, 150); animateDot(dot3, 300);}, [dot1, dot2, dot3]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#fff', '#4da1a9']}
        style={styles.gradientBackground}
      >
        <View style={styles.content}>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Image
              source={require('../assets/images/icon.png')}
              style={styles.logo}
            />
          </Animated.View>
          <Text style={styles.welcomeText}>Welcome to C - kite</Text>
          <View style={styles.dotsContainer}>
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ scale: dot1 }] },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ scale: dot2 }] },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ scale: dot3 }] },
              ]}
            />
          </View>
        </View>
        <Text style={styles.copyrightText}>
          © 2024 C-Kite. All Rights Reserved.
        </Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  copyrightText: {
    fontSize: 12,
    color: '#fff',
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;