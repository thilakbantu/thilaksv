import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/UserContext';

import{auth} from "../services/firebaseAuth";
import{signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|org|net|gov|edu|co|in|us|uk|ca|jp|tech|ai|photography|app)$/.test(email);

  // const handleLogin = async () => {
  //   setEmailError(''); // Clear previous error
  //   const email = usernameOrEmail.toLowerCase(); // Convert email to lowercase

  //   if (!email || !password) {
  //     Alert.alert('Error', 'Please enter both email and password.');
  //   } else if (!validateEmail(email)) {
  //     setEmailError('Please enter a valid email address.');
  //   } else {
  //     try {
  //       setIsLoading(true); // Show loader while waiting for response
  //       const response = await fetch('http://localhost:5000/api/v1/login', {  // Use your backend URL here
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           email,  // Send lowercase email
  //           password,
  //         }),
  //       });

  //       const data = await response.json();
  //       setIsLoading(false); // Hide loader

  //       if (response.ok) {
  //         // Store JWT token and user data
  //         await AsyncStorage.setItem('jwt_token', data.token);
  //         await AsyncStorage.setItem('user_email', email); // Store email in AsyncStorage

  //         const userName = data.userName || email.split('@')[0];
  //         setUser({ name: userName });

  //         // Navigate to Home1 after login
  //         navigation.navigate('Home1');
  //       } else {
  //         Alert.alert('Login Failed', data.message || 'Something went wrong');
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       Alert.alert('Error', 'There was an error with the login. Please try again.');
  //     }
  //   }
  // };

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
    } else if (!validateEmail(usernameOrEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, usernameOrEmail, password);
        const user = userCredential.user;
  
        if (user && user.email) {
          // Check if email is verified
          if (!user.emailVerified) {
            Alert.alert(
              'Email Not Verified',
              'Please check your email for the verification link and verify your email before logging in.'
            );
            return;
          }
  
          // Store user details in AsyncStorage
          const userName = usernameOrEmail.split('@')[0]; // Use email prefix as username
          await AsyncStorage.setItem('user_email', user.email);
          await AsyncStorage.setItem('user_name', userName);
  
          // Set user state
          setUser({ name: userName });
  
          Alert.alert('Login Successful', 'Welcome to C-KiTE.');
  
          // Navigate to Home1
          navigation.navigate('Home1');
        }
      } catch (error) {
        Alert.alert('Login Failed', error.message);
      }
    }
  };
  


  // const handleForgotPassword = () => {
  //   if (!forgotPasswordEmail) {
  //     Alert.alert('Error', 'Please enter your email address.');
  //   } else if (!validateEmail(forgotPasswordEmail)) {
  //     Alert.alert('Error', 'Invalid email format.');
  //   } else {
  //     Alert.alert('Success', 'A password reset link has been sent to your email.');
  //     setModalVisible(false);
  //   }
  // };

  

  const handleForgotPassword = () => {
    if (!forgotPasswordEmail) {
      Alert.alert('Error', 'Please enter your email address.');
    } else if (!validateEmail(forgotPasswordEmail)) {
      Alert.alert('Error', 'Invalid email format.');
    } else {
      sendPasswordResetEmail(auth, forgotPasswordEmail)
        .then(() => {
          Alert.alert('Success', 'A password reset link has been sent to your email.');
          setModalVisible(false); // Close the modal after success
        })
        .catch((error) => {
          let errorMessage = 'Something went wrong. Please try again later.';
         
          if (error.code === 'auth/user-not-found') {
            errorMessage = 'No user found with that email address.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'The email address is invalid.';
          }


          Alert.alert('Error', errorMessage);
        });
    }


  };


  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/log2.webp')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
        onFocus={() => setEmailError('')} // Clear error when user starts typing
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Forgot Password Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgot Password</Text>
            <Text style={styles.modalDescription}>
              Please enter your registered email address.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChangeText={setForgotPasswordEmail}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleForgotPassword}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>New here? Create your account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: width * 0.5,
    height: height * 0.2,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0DCAF0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#555',
    textDecorationLine: 'underline',
  },
  linkText: {
    fontSize: 16,
    color: '#0DCAF0',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default LoginScreen;
