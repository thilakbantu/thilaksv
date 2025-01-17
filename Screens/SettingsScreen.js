import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

// import{auth}from '../services/firebaseAuth.js';
// import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();


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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linearBackground: {
      flex: 1,
      paddingHorizontal: Platform.OS === 'web' ? '8%' : width * 0.05,
    },
    content: {
      flex: 1,
      marginTop: height * 0.02,
      marginBottom: height * 0.1,
    },
    profileSection: {
      paddingVertical: height * 0.03,
      alignItems: 'center',
    },
    profileText: {
      fontSize: Math.min(width * 0.05, 22),
      fontWeight: 'bold',
      color: '#333',
    },
    settingsSection: {
      marginTop: height * 0.02,
      paddingHorizontal: width * 0.03,
    },
    sectionTitle: {
      marginBottom: height * 0.015,
      fontSize: Math.min(width * 0.045, 20),
      fontWeight: 'bold',
      color: '#333',
    },
    settingRow: {
      marginBottom: height * 0.02,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: height * 0.015,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: width * 0.03,
    },
    settingText: {
      fontSize: Math.min(width * 0.04, 18),
      color: '#333',
      flex: 1,
      marginLeft: width * 0.03,
    },
    divider: {
      marginVertical: height * 0.02,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
  });

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // const handleLogout = () => {
  //   Alert.alert(
  //     "Confirm Logout",
  //     "Are you sure you want to log out?",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Logout canceled"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           signOut(auth)
  //             .then(() => {
  //               // Reset the navigation stack to the Home screen after logging out
  //               navigation.reset({
  //                 index: 0,
  //                 routes: [{ name: "Home" }],
  //               });
  //             })
  //             .catch((error) => {
  //               // Handle errors (if any)
  //               console.error("Error logging out:", error.message);
  //             });
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };
  
    
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#e3f2fd', '#90caf9']}
        style={styles.linearBackground}
      >
        <View style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Text style={styles.profileText}>User Name</Text>
          </View>

          {/* Settings Section */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => navigation.navigate('Profile')}
            >
              <MaterialIcons name="edit" size={width * 0.06} color="#666" />
              <Text style={styles.settingText}>Edit Profile</Text>
              <MaterialIcons name="chevron-right" size={width * 0.06} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <MaterialIcons name="lock" size={width * 0.06} color="#666" />
              <Text style={styles.settingText}>Change Password</Text>
              <MaterialIcons name="chevron-right" size={width * 0.06} color="#666" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Support</Text>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => navigation.navigate('ReachUs')}
            >
              <MaterialIcons name="phone" size={width * 0.06} color="#666" />
              <Text style={styles.settingText}>Reach us</Text>
              <MaterialIcons name="chevron-right" size={width * 0.06} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingRow}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={width * 0.06} color="#666" />
              <Text style={styles.settingText}>Logout</Text>
              <MaterialIcons name="chevron-right" size={width * 0.06} color="#666" />
            </TouchableOpacity>

            <View style={styles.divider} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SettingsScreen;
