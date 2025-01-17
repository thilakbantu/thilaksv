import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Main Data with submodules for each category
const DATA = [
  { id: '1', number: '1', title: 'Aptitude', submodules: ['Quantitative-Aptitude', 'Verbal-Ability', 'Logical-Reasoning'] },
  { id: '2', number: '2', title: 'Softskills', submodules: ['Communication-Skills', 'Teamwork', 'Adaptability-Flexibility', 'Leadership', 'Problem-Solving', 'Critical-Thinking', 'Values', 'Creativity'] },
  { id: '3', number: '3', title: 'Technical', submodules: ['C-programming', 'Java ', 'JavaScript', 'Python'] },
  { id: '4', number: '4', title: 'Industry_Expertise', submodules: ['Quality-Engineering', 'Project-Management', 'Software-Engineering', 'Agile-Methodology'] },
  { id: '5', number: '5', title: 'C_Assessment', submodules: ['C-Level-1', 'C-Level-2', 'C-Level-3',] },
];

export default function Module({ navigation }) {
  const scaleValue = new Animated.Value(1);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <LinearGradient
          colors={['#90caf9', '#e3f2fd']} // Gradient for the header
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.customHeader}
        >
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Result</Text>
        </LinearGradient>
      ),
    });
  }, [navigation]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          if (item.title === 'C_Qualify') {
            // alert('This module is restricted and cannot be accessed.');
            return;
          }
          navigation.navigate('Section', { submodules: item.submodules, title: item.title });
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* Number Circle */}
        <View style={[styles.circle, getCircleColor(item.id)]}>
          <Text style={styles.circleText}>{item.number}</Text>
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>

        {/* Icon */}
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.linearBackground}>
      <ScrollView style={styles.container}>
        {/* <Text style={styles.headerText}>Result</Text> */}

        {/* List of Cards */}
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const getCircleColor = (id) => {
  const colors = ['#4daff7', '#f7934d', '#9a59b5', '#f7b84d', '#4daff7', '#9a59b5'];
  return { backgroundColor: colors[id - 1] };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure background is transparent to show the gradient
  },
  linearBackground: {
    flex: 1,
  },
  customHeader: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  headerBackButton: {
    position: 'absolute',
    left: 10,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: width > 350 ? 26 : 22, // Responsive font size
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 20,
  },
  headerText: {
    textAlign: 'center',
    color: '#0d47a1',
    fontSize: width > 350 ? 80 : 60, // Adjust text size for different screen sizes
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    margin: '10%',
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  cardWrapper: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
  },
  cardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: width - 40, // Make width responsive
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width > 350 ? 18 : 16, // Responsive font size for circle text
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: width > 350 ? 18 : 16, // Adjust font size based on screen size
    color: '#333',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});