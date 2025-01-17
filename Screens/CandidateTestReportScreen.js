import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const CandidateTestReport = ({ route, navigation }) => {
  const {
    subModuleName,
    score,
    maxScore,
    percentage,
    questionsAttempted,
    totalQuestions,
    timeTaken,
    totalTime,
  } = route.params;

  const [improvementLink, setImprovementLink] = useState('');

  // Function to fetch improvement link
  const fetchImprovementLink = async () => {
    try {
      const response = await fetch(`https://backend-ckite.onrender.com/api/v1/submodules/${subModuleName}`);
      const data = await response.json();

      if (response.ok && data?.data?.videos?.length > 0) {
        const videoURL = data.data.videos[0].videoURL; // Extract the first videoURL
        setImprovementLink(videoURL); // Set the videoURL as the improvement link
      } else {
        console.error('Failed to fetch video URL:', data.message || 'No videos available');
        setImprovementLink(''); // Set to empty if no video URL is available
      }
    } catch (error) {
      console.error('Error fetching video URL:', error);
      setImprovementLink(''); // Set to empty in case of an error
    }
  };

  // Function to autosave data
  const saveReportData = async () => {
    const reportData = {
      subModuleName,
      score,
      maxScore,
      percentage,
      questionsAttempted,
      totalQuestions,
      timeTaken,
      totalTime,
    };

    try {
      await AsyncStorage.setItem('testReport', JSON.stringify(reportData));
      console.log('Report saved successfully!');
    } catch (error) {
      console.error('Failed to save report:', error);
    }
  };

  useEffect(() => {
    saveReportData();
    fetchImprovementLink(); // Fetch the video link on component load
  }, [subModuleName]);

  return (
    <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.linearBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.maintitle}>
          <Text style={styles.title}>Test Report</Text>
        </View>

        <View style={styles.mainreport}>
          <View style={styles.reportItem}>
            <Text style={styles.label}>Submodule:</Text>
            <Text style={styles.value}>{subModuleName}</Text>
          </View>

          <View style={styles.reportItem}>
            <Text style={styles.label}>Score:</Text>
            <Text style={styles.value}>
              {score} / {maxScore}
            </Text>
          </View>

          <View style={styles.reportItem}>
            <Text style={styles.label}>Percentage:</Text>
            <Text style={[styles.value, percentage < 65 ? styles.lowScore : styles.highScore]}>
              {percentage}%
            </Text>
          </View>

          <View style={styles.reportItem}>
            <Text style={styles.label}>Questions Attempted:</Text>
            <Text style={styles.value}>
              {questionsAttempted} / {totalQuestions}
            </Text>
          </View>

          <View style={styles.reportItem}>
            <Text style={styles.label}>Time Taken:</Text>
            <Text style={styles.value}>{timeTaken}</Text>
          </View>

          <View style={styles.reportItem}>
            <Text style={styles.label}>Total Time Allowed:</Text>
            <Text style={styles.value}>{totalTime}</Text>
          </View>

          <View style={styles.linkContainer}>
            <Text>Click on the link below</Text>
            {improvementLink ? (
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(improvementLink)}
              >
                Watch Video for {subModuleName}
              </Text>
            ) : (
              <Text style={styles.noLink}>No improvement video available</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Go to Next Section"
              onPress={() => navigation.navigate('Home1')} // Replace with actual next section route
            />
          </View>
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
    flexGrow: 1,
    padding: 20,
  },
  maintitle: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    borderBottomWidth: 3,
    borderBottomColor: '#00796B',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainreport: {
    marginTop: 20,
    marginBottom: 30,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#00796B',
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lowScore: {
    color: '#d32f2f', // Red for low score
  },
  highScore: {
    color: '#388e3c', // Green for high score
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  linkContainer: {
    marginTop: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    color: '#1E88E5',
    textAlign: 'center',
  },
  noLink: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default CandidateTestReport;
