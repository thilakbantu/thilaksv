import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Resultsection({ route, navigation }) {
  const { submodules, title } = route.params;

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

  const [dynamicProgress, setDynamicProgress] = useState(
    submodules.map((submodule) => ({
      name: submodule,
      progress: '0%', // Default progress
    }))
  );

  const overallProgress = dynamicProgress.length
    ? `${Math.round(
      dynamicProgress.reduce((total, sub) => total + (parseInt(sub.progress, 10) || 0), 0) /
      dynamicProgress.length
    )}%`
    : '0%';

  return (
    <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.gradientContainer}>
      <Text style={styles.title}>{title} Modules</Text>

      <FlatList
        data={dynamicProgress}
        keyExtractor={(submodule, index) => index.toString()}
        renderItem={({ item: submodule }) => {
          const progressValue = parseInt(submodule.progress, 10) || 0;

          return (
            <View style={styles.submoduleContainer}>
              {/* Conditional Download Icon */}
              {progressValue > 60 ? (
                <TouchableOpacity
                  style={styles.downloadIconContainer}
                  onPress={() =>
                    navigation.navigate('Certificate', {
                      candidateName: 'John Doe', // Pass candidate name
                      moduleName: submodule.name, // Pass submodule name
                      performance: submodule.progress, // Pass individual submodule progress
                    })
                  }
                >
                  <MaterialIcons name="file-download" size={30} color="#0d47a1" />
                </TouchableOpacity>
              ) : (
                <MaterialIcons
                  name="file-download-off"
                  size={30}
                  color="#b0bec5"
                  style={styles.downloadIconContainer}
                />
              )}

              {/* Submodule Name with onPress */}
              <TouchableOpacity
                onPress={() => {
                  console.log(`Submodule clicked: ${submodule.name}`);
                  navigation.navigate('Detail', {
                    title: title, // Pass the title (or submoduleName) to the DetailScreen
                    submoduleName: submodule.name, // Pass the submoduleName
                  });
                }}
              >
                <Text style={styles.submoduleText}>{submodule.name}</Text>
              </TouchableOpacity>


              <View style={styles.infoContainer}>
                {/* <Text style={styles.infoText}>Progress: {submodule.progress}</Text> */}
              </View>
            </View>
          );
        }}
      />

      {/* View Overall Result Button */}
      {/* <TouchableOpacity
        style={styles.overallResultButton}
        onPress={() =>
          navigation.navigate('OverallResult', {
            title,
            overallProgress,
          })
        }
      >
        <Text style={styles.overallResultButtonText}>View Overall Result</Text>
      </TouchableOpacity> */}
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
    position: 'relative',
  },
  submoduleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 16,
    color: '#757575',
  },
  downloadIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  overallResultButton: {
    backgroundColor: '#0d47a1',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  overallResultButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});