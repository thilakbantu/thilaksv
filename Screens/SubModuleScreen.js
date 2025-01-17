import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';


export default function SubModuleScreen({ route, navigation }) {
  const { moduleName, subModuleName } = route.params;


  return (
    <ImageBackground
      source={require('../assets/images/mainbg.jpg')} // Replace with your background image path
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.2 }} // Adjust opacity here
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Main Title */}
          <Text style={styles.title}>{moduleName}</Text>


          {/* Instructions */}
          <Text style={styles.subtitle}>Need 20 out of 30 marks to Qualify</Text>


          {/* Test Info */}
          <View style={styles.infoRow}>
            <Text style={styles.aptitudeTest}>Test</Text>
            <Text style={styles.marks}>30 marks - 30 mins</Text>
          </View>


          {/* Vertical Line and Submodules */}
          <View style={styles.lineAndButtons}>
            {/* Vertical Line */}
            <View style={styles.verticalLine} />


            {/* Submodule Buttons */}
            <View style={styles.buttonContainer}>
              {subModuleName.map((item, index) => (
                <View key={index} style={styles.buttonRow}>
                  <View style={styles.dot} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('Instruction', {
                        subModuleName: item,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>{item}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>


          {/* Additional Description */}
          <Text style={styles.description}>
            Multiple choice questions with single correct answer
          </Text>
        </ScrollView>
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
    backgroundColor: 'transparent',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 60,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  aptitudeTest: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  marks: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  lineAndButtons: {
    flexDirection: 'row',
  },
  verticalLine: {
    position: 'absolute',
    left: 14,
    top: 22,
    bottom: 42,
    width: 2,
    backgroundColor: '#37AFE1', // Solid black line
  },
  buttonContainer: {
    marginLeft: 40, // Align buttons next to the line
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#37AFE1',
    marginRight: 25, // Space between dot and button
    marginLeft: -30, // Align dots over the line
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // White with 70% opacity
    borderColor: 'rgba(55, 175, 225, 0.8)', // Border with 80% opacity
    borderWidth: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize',
  },
  description: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});