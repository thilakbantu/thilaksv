import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ route, navigation }) {
  const { title = '', submoduleName = '' } = route.params || {}; // Destructure both title and submoduleName

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#90caf9',
      },
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

  const [dynamicScores, setDynamicScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storedEmail, setStoredEmail] = useState(''); // State to store the email

  useEffect(() => {
    // Fetch stored email from AsyncStorage
    const fetchStoredEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('user_email');
        if (email) {
          setStoredEmail(email); // Set the email if found
        } else {
          Alert.alert('Error', 'User email not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage:', error);
        Alert.alert('Error', 'Unable to retrieve email.');
      }
    };

    fetchStoredEmail();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    if (storedEmail && submoduleName) {
      const fetchResults = async () => {
        try {
          const response = await fetch(`https://backend-ckite.onrender.com/api/v1/results/${storedEmail}/${submoduleName}`);
          const data = await response.json();

          // Check if data.result is an object (not an array)
          if (data.result) {
            // Format the data as an array to make it compatible with map()
            const formattedData = [{
              name: data.result.subModuleName,
              score: data.result.score || 0,
              maxScore: data.result.maxScore || 0,
              percentage: data.result.percentage || '0',
              questionsAttempted: data.result.questionsAttempted || 0,
              totalQuestions: data.result.totalQuestions || 0,
              timeTaken: data.result.timeTaken || 'N/A',
            }];

            setDynamicScores(formattedData); // Set the formatted data as the dynamic scores
          } else {
            console.error('No result found in the response data.');
            Alert.alert('Error', 'No result found.');
          }
        } catch (error) {
          console.error('Error fetching results:', error);
          Alert.alert('Error', 'Failed to load results.');
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [storedEmail, submoduleName]); // Fetch results only when storedEmail and submoduleName are available

  const overallScore = dynamicScores.length
    ? Math.round(
      dynamicScores.reduce((total, sub) => total + (sub.score || 0), 0) / dynamicScores.length
    )
    : 0;

  const overallProgress = dynamicScores.length
    ? `${Math.round(
      dynamicScores.reduce((total, sub) => total + parseFloat(sub.percentage || '0'), 0) /
      dynamicScores.length
    )}%`
    : '0%';

  return (
    <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.gradientContainer}>
      <Text style={styles.title}>{submoduleName} Sub-Module</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0d47a1" />
      ) : (
        <FlatList
          data={dynamicScores}
          keyExtractor={(submodule, index) => index.toString()}
          renderItem={({ item: submodule }) => (
            <View style={styles.submoduleContainer}>
              <Text style={styles.submoduleText}>{submodule.name}</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Score: {submodule.score}/{submodule.maxScore}</Text>
                <Text style={styles.infoText}>Percentage: {submodule.percentage}%</Text>
                <Text style={styles.infoText}>
                  Questions: {submodule.questionsAttempted}/{submodule.totalQuestions}
                </Text>
                <Text style={styles.infoText}>Time Taken: {submodule.timeTaken}</Text>
              </View>
            </View>
          )}
        />
      )}
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d47a1',
    textShadowColor: '#bbdefb',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  submoduleContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submoduleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 5,
  },
});
