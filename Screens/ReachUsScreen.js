import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, useWindowDimensions, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import treesetImage from '../assets/images/treeset.jpg';

const ReachUsScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

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

  const styles = StyleSheet.create({
    linearBackground: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.02,
    },
    section: {
      paddingTop: 10,
      marginTop: height * 0.03,
      alignItems: 'center',
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      marginBottom: 25,
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 25,
    },
    contactBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 30,
      width: '90%',
      backgroundColor: '#fff',
    },
    contactText: {
      flex: 1,
      fontSize: 15,
      marginLeft: 15,
    },
    socialRow: {
      justifyContent: 'space-between',
      width: '80%',
      marginTop: 60,
    },
    socialText: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
      marginBottom: 40,
    },
    socialIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      borderRadius:50,
    },
  });

  return (
    <LinearGradient
      colors={['#e3f2fd', '#90caf9']} // Gradient colors
      style={styles.linearBackground}
    >
      <View style={styles.container}>
        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Get in Touch</Text>
          <Text style={styles.subtitle}>
            If you have any enquiries, get in touch with us. We’re happy to help you.
          </Text>

          {/* Phone */}
          <TouchableOpacity
            style={styles.contactBox}
            onPress={() => Linking.openURL('tel:9071511511')}
          >
            <FontAwesome name="phone" size={24} color="black" />
            <Text style={styles.contactText}>907-151-1511</Text>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity
            style={styles.contactBox}
            onPress={() => Linking.openURL('mailto:ckite37@gmail.com')}
          >
            <MaterialIcons name="email" size={24} color="black" />
            <Text style={styles.contactText}>ckite37@gmail.com</Text>
          </TouchableOpacity>

          {/* Social Links */}
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => Linking.openURL('https://in.linkedin.com/company/treesetofficial')}
            >
              <FontAwesome name="linkedin" size={32} color="#0077b5" />
              <Text style={styles.socialText}>Stay updated on LinkedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              // onPress={() => Linking.openURL('https://twitter.com')}
            >
              <FontAwesome name="twitter" size={32} color="#1DA1F2" />
              <Text style={styles.socialText}>Follow us on Twitter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => Linking.openURL('https://treeset.in/m/')}
            >
              <Image source={treesetImage} style={styles.socialIcon} />
              <Text style={styles.socialText}>Official Website</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ReachUsScreen;
