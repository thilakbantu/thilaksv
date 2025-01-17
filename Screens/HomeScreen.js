import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const App = () => {
  const navigation = useNavigation();

  // Animation values
  const scaleValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  // Animation styles
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scaleValue.value, { duration: 800 }) }],
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacityValue.value, { duration: 1200 }),
  }));

  useEffect(() => {
    // Trigger animations
    scaleValue.value = 1; // Scale up the image
    opacityValue.value = 1; // Fade in the content
  }, []);

  // Handlers for button clicks
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Animated Illustration */}
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
        <Image
          source={require('../assets/images/Homepagebackground.webp')} // Replace with your actual image URL
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Animated Text Section */}
      <Animated.View style={[styles.textContainer, animatedContentStyle]}>
        <Text style={styles.title}>"Education is the foundation; Learning is the medium; <Text style={styles.letter}>C</Text>areer is the masterpiece" <Text style={styles.letter}>K</Text>a<Text style={styles.letter}>i</Text>zen <Text style={styles.letter}>t</Text>o <Text style={styles.letter}>e</Text>minent</Text>
      </Animated.View>

      {/* Animated Buttons */}
      <Animated.View style={[styles.buttonContainer, animatedContentStyle]}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const {height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    backgroundColor: '#fdf5f5',
  },
  imageContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  image: {
    width: width * 0.95,
    height: width * 0.80,
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginHorizontal: 20,
  },
  letter:{
    color:'#0DCAF0',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginHorizontal: 30,
    marginTop: 12,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    marginTop: 20,
    height:'45',
  },
  registerButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#0DCAF0',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  signInButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#0DCAF0',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;