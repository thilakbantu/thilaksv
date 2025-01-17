import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons library
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

import{auth}from '../services/firebaseAuth.js';
import{reauthenticateWithCredential, EmailAuthProvider, updatePassword}from 'firebase/auth';

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State for current password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

    // Set the header background color
     React.useLayoutEffect(() => {
       navigation.setOptions({
         headerStyle: {
           backgroundColor: '#90caf9', // Fallback color for the header
         },
         headerBackground: () => (
           <LinearGradient
             colors={['#e3f2fd', '#90caf9']} // Header gradient colors
             style={{ flex: 1 }}
             start={{ x: 1, y: 0 }}
             end={{ x: 0, y: 0 }}
           />
         ),
         headerTintColor: '#fff', // Optional: Adjust header text and icon color for better visibility
       });
     }, [navigation]);

     const handleSubmit = () => {
      
   
      if (newPassword !== confirmPassword) {
        setErrorMessage('Passwords does not match');
        return;
      }
      setErrorMessage('');
      alert('Password changed successfully!');
  
      // Redirect to Settings page
      navigation.navigate('Settings');
     
    if (newPassword === '') {
      setErrorMessage('New password cannot be empty');
      return;
    }
  
    
  
  
      if (newPassword.length < 6) {
        setErrorMessage('New password must be at least 6 characters long');
        return;
      }
  
  
      setErrorMessage(''); // Reset the error message
  
  
      // Get current user
      const user = auth.currentUser;
  
  
      console.log(user);
  
  
      if (!user) {
        setErrorMessage('User is not authenticated');
        return;
      }
  
  
      // Create the credential with email and current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
  
  
      // Reauthenticate the user with Firebase
      reauthenticateWithCredential(user, credential)
        .then(() => {
          // Successfully reauthenticated, now update the password in Firebase
          updatePassword(user, newPassword)
            .then(() => {
              // Update the password in MongoDB via API
              //updatePasswordInMongoDB(user.uid, newPassword);
  
  
              // Show success message
              Alert.alert('Password Updated', 'Your password has been updated successfully!');
  
  
              // Navigate back to the settings screen or another screen
              navigation.navigate('Settings');
            })
            .catch((error) => {
              setErrorMessage(`Error updating password in Firebase: ${error.message}`);
            });
        })
        .catch((error) => {
          setErrorMessage('Current password is incorrect');
        });
  
  
     
    };
  

  return (
    <LinearGradient
      colors={['#e3f2fd', '#90caf9']} // Gradient colors
      style={styles.linearBackground}
    >
      <View style={styles.container}>
        {/* Error Message */}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        {/* Change Password Title */}
        <Text style={styles.title}>Change Password</Text>

        {/* Current Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showCurrentPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#A9A9A9"
            />
          </TouchableOpacity>
        </View>

        {/* New Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showNewPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#A9A9A9"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#A9A9A9"
            />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30, // Add vertical padding for a bit more space
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center', // Center the error message
  },
  title: {
    fontSize: 24, // Increase font size for title
    fontWeight: 'bold',
    marginBottom: 30, // Add more space below title
    color: '#333',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2e5077',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
