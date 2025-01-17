import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function InstructionScreen({ route, navigation }) {
  const { subModuleName } = route.params;

  return (
    <ImageBackground
      source={require('../assets/images/mainbg.jpg')} // Replace with your background image path
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.2 }} // Adjust opacity here
    >
      <View style={styles.container}>
        <Text style={styles.title}>{subModuleName}</Text>
        
        <Text style={styles.instructions}>Please read the following instructions carefully:</Text>
        <Text style={styles.instructionItem}>1. This test contains 30 Questions</Text>
        <Text style={styles.instructionItem}>2. It is a time-based multiple choice questions with a single correct answer</Text>
        <Text style={styles.instructionItem}>3. Once you start the test you should not quit it</Text>
        <Text style={styles.instructionItem}>4.  Click on Submit to view the results</Text>
        <Text style={styles.instructionItem}>  Answered: 🟢        Current Question: 🔵</Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            navigation.navigate('Test', {
              subModuleName,
            })
          }
        >
          <Text style={styles.startButtonText}>Start Test</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionItem: {
    marginTop:'6',
    fontSize: 16,
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#0DCAF0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});