import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileContext } from './ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const { setProfileData } = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      try {
        const storedEmail = await AsyncStorage.getItem('user_email');
        if (!storedEmail) {
          throw new Error('User email not found in AsyncStorage.');
        }

        // Fetch user details from API without JWT
        const response = await fetch(`https://backend-ckite.onrender.com/api/v1/users/${storedEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details.');
        }

        const data = await response.json();
        setUserDetails(data.user);
        setProfileData(data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditPress = () => {
    Alert.alert(
      'Action Restricted',
      'Editing is currently disabled. Please contact the administrator for further assistance.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user_email'); // Remove user email from AsyncStorage
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  const { firstName, lastName, email, phoneNumber, instituteName, stream, degree, profileImage } =
    userDetails;

  return (
    <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.linearBackground}>
      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          {/* <Image source={{ uri: profileImage }} style={styles.profileImage} /> */}
          <Image source={require('../assets/images/Profile.jpg')} style={styles.profileImage} />
          <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        </View>

        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.detail}>{email}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.detail}>{phoneNumber}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Institute Name</Text>
          <Text style={styles.detail}>{instituteName}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Stream</Text>
          <Text style={styles.detail}>{stream}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Degree</Text>
          <Text style={styles.detail}>{degree}</Text>
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#fff" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    marginBottom: height * 0.01,
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'black',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
  },
  editButton: {
    backgroundColor: 'lightgrey',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
  },
  editText: {
    fontSize: width * 0.04,
    color: 'black',
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: height * 0.02,
    marginBottom: height * 0.02,
  },
  label: {
    color: 'black',
    fontSize: width * 0.04,
    marginBottom: height * 0.005,
    fontWeight: 'bold',
  },
  detail: {
    color: '#555',
    fontSize: width * 0.04,
  },
  logoutSection: {
    paddingVertical: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutIcon: {
    marginRight: width * 0.02,
  },
  logoutText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
