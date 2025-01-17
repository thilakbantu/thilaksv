// import React, { useState, useContext, useEffect } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { ProfileContext } from './ProfileContext';

// import { createUserWithEmailAndPassword,sendEmailVerification,onAuthStateChanged} from 'firebase/auth';
// import { auth } from '../services/firebaseAuth.js';

// export default function RegisterScreen({ navigation }) {
//   const { setProfileData } = useContext(ProfileContext);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user && user.emailVerified) {
//         // Redirect to home if email is verified
//         navigation.navigate('Register');
//       }
//     });

//     // Clean up the listener on unmount
//     return () => unsubscribe();
//   }, [navigation]);

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerStyle: {
//         backgroundColor: '#90caf9',
//       },
//       headerBackground: () => (
//         <LinearGradient
//           colors={['#e3f2fd', '#90caf9']}
//           style={{ flex: 1 }}
//           start={{ x: 1, y: 0 }}
//           end={{ x: 0, y: 0 }}
//         />
//       ),
//       headerTintColor: '#fff',
//     });
//   }, [navigation]);

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     stream: '',
//     degree: '',
//     instituteName: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { width, height } = Dimensions.get('window');

//   const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);

//   const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   // const handleRegister = async () => {
//   //   const { firstName, lastName, email, phoneNumber, stream, degree, instituteName, password, confirmPassword } = formData;

//   //   if (!firstName || !lastName || !email || !phoneNumber || !stream || !degree || !instituteName || !password || !confirmPassword) {
//   //     return Alert.alert('Error', 'Please fill all the details');
//   //   }

//   //   if (password !== confirmPassword) {
//   //     return Alert.alert('Error', 'Passwords do not match!');
//   //   }

//   //   if (!validateEmail(email)) {
//   //     return Alert.alert('Error', 'Please enter a valid email address.');
//   //   }

//   //   if (!validatePhoneNumber(phoneNumber)) {
//   //     return Alert.alert('Error', 'Enter a valid phone number.');
//   //   }

//   //   try {
//   //     const response = await fetch('http://localhost:5000/api/v1/register', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     const data = await response.json();
//   //     console.log('API Response:', data);

//   //     if (data.success) {
//   //       setProfileData(formData);
//   //       console.log('Navigating to Login...');
//   //       Alert.alert('Success', 'Account created successfully!', [
//   //         { text: 'OK', onPress: () => navigation.navigate('Login') },
//   //       ]);
//   //     } else {
//   //       Alert.alert('Error', data.message || 'Failed to register user');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error during registration:', error);
//   //     Alert.alert('Error', 'Failed to connect to the server. Please try again later.');
//   //   }
//   // };

//   const handleRegister = () => {
//     const { firstName, lastName, email, phoneNumber, stream, degree, instituteName, password, confirmPassword } = formData;
  
//     // Basic validation
//     if (!firstName || !lastName || !email || !phoneNumber || !stream || !degree || !instituteName || !password || !confirmPassword) {
//       return Alert.alert('Error', 'Please fill all the details');
//     } else if (password !== confirmPassword) {
//       return Alert.alert('Error', 'Passwords do not match!');
//     } else if (!validateEmail(email)) {
//       return Alert.alert('Error', 'Please enter a valid email address.');
//     } else if (!validatePhoneNumber(phoneNumber)) {
//       return Alert.alert('Error', 'Enter a valid phone number.');
//     }
  
//     // Save data in the context
//     setProfileData({ firstName, lastName, email, phone: phoneNumber, instituteName, stream, degree });
  
//     // Create user with Firebase Auth
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log(user);
  
//         // Send email verification
//         sendEmailVerification(user)
//           .then(() => {
//             // Prepare the user data to send to the backend
//             const userData = {
//               firstName,
//               lastName,
//               email,
//               phoneNumber,
//               instituteName,
//               stream,
//               degree,
//               password, // Consider hashing this before sending it to the backend
//             };
  
//             console.log('User data being sent:', userData);
  
//             // Send data to the backend API
//             fetch('https://backend-ckite.onrender.com/api/v1/register', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(userData),
//             })
//               .then((response) => response.json())
//               .then((data) => {
//                 console.log('Backend response:', data);
//                 if (data.message === 'User registered successfully') {
//                   // Navigate to Login screen after successful registration
//                   Alert.alert('Success', 'Account created successfully!');
//                   navigation.navigate('Login');
//                 } else {
//                   Alert.alert('Error', 'Failed to register user in backend');
//                 }
//               })
//               .catch((error) => {
//                 console.error('Error in backend response:', error);
//                 Alert.alert('Error', 'Failed to register user in backend');
//               });
//           })
//           .catch((error) => {
//             console.log('Error sending email verification:', error);
//             Alert.alert('Error', 'Failed to send verification email');
//           });
//       })
//       .catch((error) => {
//         console.error('Error during user creation:', error);
//         Alert.alert('Error', error.message);
//       });
//   };
  


//   return (
//     <LinearGradient colors={['#e3f2fd', '#90caf9']} style={[styles.gradientContainer, { height: height }]}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.header}>Create Account</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="First Name"
//           value={formData.firstName}
//           onChangeText={(value) => handleInputChange('firstName', value)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChangeText={(value) => handleInputChange('lastName', value)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={formData.email}
//           onChangeText={(value) => handleInputChange('email', value)}
//           keyboardType="email-address"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           value={formData.phoneNumber}
//           onChangeText={(value) => handleInputChange('phoneNumber', value)}
//           keyboardType="numeric"
//           maxLength={10}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Institute Name"
//           value={formData.instituteName}
//           onChangeText={(value) => handleInputChange('instituteName', value)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Degree"
//           value={formData.degree}
//           onChangeText={(value) => handleInputChange('degree', value)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Stream"
//           value={formData.stream}
//           onChangeText={(value) => handleInputChange('stream', value)}
//         />
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Password"
//             secureTextEntry={!showPassword}
//             value={formData.password}
//             onChangeText={(value) => handleInputChange('password', value)}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Confirm Password"
//             secureTextEntry={!showConfirmPassword}
//             value={formData.confirmPassword}
//             onChangeText={(value) => handleInputChange('confirmPassword', value)}
//           />
//           <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//             <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleRegister}>
//           <Text style={styles.buttonText}>Register</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.loginText}>Already have an account? Login</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   gradientContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   container: { flexGrow: 1, alignItems: 'center', padding: 20 },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   input: { borderWidth: 1, borderColor: '#000', borderRadius: 8, padding: 10, marginBottom: 10, width: '90%' },
//   passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#000', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 10, width: '90%' },
//   passwordInput: { flex: 1 },
//   button: { backgroundColor: '#0DCAF0', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20, width: '90%' },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
//   loginLink: { marginTop: 15 },
//   loginText: { color: '#000', fontWeight: 'bold' },
// });


import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons for the eye icon
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileContext } from './ProfileContext';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../services/firebaseAuth.js';

export default function RegisterScreen({ navigation }) {
  const { setProfileData } = useContext(ProfileContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        navigation.navigate('Register');
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#90caf9' },
      headerBackground: () => (
        <LinearGradient
          colors={['#e3f2fd', '#90caf9']}
          style={{ flex: 1 }}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        />
      ),
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    stream: '',
    degree: '',
    instituteName: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State to toggle confirm password visibility
  const { height } = Dimensions.get('window');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|org|net|gov|edu|co|in|us|uk|ca|jp|tech|ai|photography|app)$/;
    return emailRegex.test(email);
  };  
  const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);
  const validateUpperCase = (value) => /^[A-Z\s]+$/.test(value);
  const validatePassword = (password) => password.length >= 8;

  const handleInputChange = (field, value) => {
    if (field === 'phoneNumber') {
      value = value.replace(/[^0-9]/g, ''); // Allow only numeric input
    }

    setFormData({ ...formData, [field]: value });

    if (field === 'email' && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
    } else if (field === 'phoneNumber' && !validatePhoneNumber(value)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: 'Enter a valid 10-digit phone number',
      }));
    } else if (
      (field === 'stream' || field === 'degree' || field === 'instituteName') &&
      !validateUpperCase(value)
    ) {
      setErrors((prev) => ({ ...prev, [field]: 'Enter uppercase letters only' }));
    } else if (
      (field === 'password' || field === 'confirmPassword') &&
      !validatePassword(value)
    ) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'Password must be at least 8 characters long',
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegister = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      stream,
      degree,
      instituteName,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !stream ||
      !degree ||
      !instituteName ||
      !password ||
      !confirmPassword
    ) {
      return Alert.alert('Error', 'Please fill all the details');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords does not match');
    }

    if (Object.values(errors).some((error) => error)) {
      return Alert.alert('Error', 'Please fix the errors before submitting');
    }

    setProfileData({
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      instituteName,
      stream,
      degree,
    });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        sendEmailVerification(user)
          .then(() => {
            const userData = {
              firstName,
              lastName,
              email,
              phoneNumber,
              instituteName,
              stream,
              degree,
              password,
            };

            fetch('https://backend-ckite.onrender.com/api/v1/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.message === 'User registered successfully') {
                  Alert.alert('Success', 'Account created successfully!');
                  navigation.navigate('Login');
                } else {
                  Alert.alert('Error', 'Failed to register user in the backend');
                }
              })
              .catch(() => {
                Alert.alert('Error', 'Failed to register user in the backend');
              });
          })
          .catch(() => {
            Alert.alert('Error', 'Failed to send verification email');
          });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <LinearGradient
      colors={['#e3f2fd', '#90caf9']}
      style={[styles.gradientContainer, { height }]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Create Account</Text>

        {/* Input fields */}
        {Object.keys(formData).map((field, index) => (
          <View key={index} style={{ width: '100%' }}>
            <Text style={styles.label}>
              Enter {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={field}
                value={formData[field]}
                secureTextEntry={
                  (field === 'password' && !showPassword) ||
                  (field === 'confirmPassword' && !showConfirmPassword)
                }
                keyboardType={field === 'phoneNumber' ? 'phone-pad' : 'default'}
                maxLength={field === 'phoneNumber' ? 10 : undefined} // Limit phone number to 10 digits
                onChangeText={(value) => handleInputChange(field, value)}
              />
              {(field === 'password' || field === 'confirmPassword') && (
                <TouchableOpacity
                  onPress={() =>
                    field === 'password'
                      ? setShowPassword(!showPassword)
                      : setShowConfirmPassword(!showConfirmPassword)
                  }
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={field === 'password' ? (showPassword ? 'eye-off' : 'eye') : showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#000"
                  />
                </TouchableOpacity>
              )}
            </View>
            {errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
          </View>
        ))}

        {/* Register button */}
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Navigation to Login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.link}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

// Styles
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0DCAF0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#000',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
});