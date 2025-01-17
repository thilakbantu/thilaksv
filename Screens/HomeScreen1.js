import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  ScrollView, 
  Dimensions, 
  Animated, 
  BackHandler, 
  Alert 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const moduleColors = {
  Aptitude: '#000',
  Softskills: '#000',
  Technical: '#000',
  Intership: '#000',
  Industry_Expertise: '#000',
  Group_Discussion: '#000',
  C_Assessment: '#000',
};

const modules = [
  {
    name: 'Aptitude',
    image: require('../assets/images/aptii.jpg'),
    subModuleName: ['Quantitative-Aptitude', 'Verbal-Ability', 'Logical-Reasoning']
  },
  {
    name: 'Softskills',
    image: require('../assets/images/sft.jpg'),
    subModuleName: ['Communication-Skills', 'Teamwork', 'Adaptability-Flexibility', 'Leadership', 'Problem-Solving', 'Critical-Thinking', 'Values', 'Creativity']
  },
  {
    name: 'Technical',
    image: require('../assets/images/tec.jpg'),
    subModuleName: ['C-programming', 'Java', 'JavaScript', 'Python']
  },
  {
    name: 'Group_Discussion',
    image: require('../assets/images/gd.jpg'),
    subModules: ['Group-Discussion']
  },
  {
    name: 'Industry_Expertise',
    image: require('../assets/images/industry.jpg'),
    subModuleName: ['Quality-Engineering', 'Project-Management', 'Software-Engineering', 'Agile-Methodology']
  },
  {
    name: 'C_Assessment',
    image: require('../assets/images/cq.jpg'),
    subModuleName: ['C-Level-1', 'C-Level-2', 'C-Level-3']
  },
];

export default function HomeScreen({ navigation }) {
  const flatListRef = useRef(null);
  const modulesRef = useRef(null);

  const [scaleAnims] = useState(
    Array(6)
      .fill(0)
      .map(() => new Animated.Value(1))
  );

  const [showModules, setShowModules] = useState(false);
  const [showDummyText, setShowDummyText] = useState(true);

  const scrollToModules = () => {
    setShowModules(true);
    setShowDummyText(false);
    modulesRef.current?.measureLayout(flatListRef.current, (x, y) => {
      flatListRef.current.scrollTo({ y: y - 100, animated: true });
    });
  };

  const handleModulePressIn = (index) => {
    Animated.spring(scaleAnims[index], {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handleModulePressOut = (index) => {
    Animated.spring(scaleAnims[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Prevent hardware back navigation
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit the app?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  // Prevent navigation gestures
  React.useLayoutEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        'Confirmation',
        'Do you really want to leave this page?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          { text: 'Leave', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        ]
      );
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.linearBackground}>
        <View style={styles.headerWrapper}>
          <LinearGradient
            colors={['#90caf9', '#e3f2fd']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <Image
              source={require('../assets/images/l2.png')}
              style={styles.logo}
            />
          </LinearGradient>
        </View>

        <ScrollView ref={flatListRef} contentContainerStyle={styles.bodyContent}>
          <View style={styles.welcomeSection}>
            <Image
              source={require('../assets/images/main1.png')}
              style={styles.welcomeImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={[styles.getStartedButton, { transform: [{ scale: 1.1 }] }]}
              activeOpacity={0.8}
              onPress={scrollToModules}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
            {showDummyText && (
              <Text style={styles.dummyText}>
                A comprehensive learning platform that aligns with the job placements and competitive exams for students to succeed in their career.
              </Text>
            )}
          </View>

          {showModules && (
            <View style={styles.modulesContainer} ref={modulesRef}>
              {modules.map((module, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (module.name === 'C_Assessment') {
                      return; // Prevent navigation for C_Assessment
                    }
                    if (module.name === 'Group_Discussion') {
                      navigation.navigate('GroupDiscussion');
                    } else {
                      navigation.navigate('SubModule', {
                        moduleName: module.name,
                        subModuleName: module.subModuleName,
                      });
                    }
                  }}
                  onPressIn={() => handleModulePressIn(index)}
                  onPressOut={() => handleModulePressOut(index)}
                >
                  <Animated.View
                    style={[styles.moduleBox, { transform: [{ scale: scaleAnims[index] }] }]}
                  >
                    <Image source={module.image} style={styles.moduleImage} />
                    <View style={styles.moduleContent}>
                      <Text
                        style={[
                          styles.moduleText,
                          { color: moduleColors[module.name] || '#fff' },
                        ]}
                      >
                        {module.name}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home1')}>
            <Ionicons name="home-outline" size={24} color="#0DCAF0" />
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={24} />
            <Text style={styles.footerText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Result')}>
            <Ionicons name="stats-chart-outline" size={24} />
            <Text style={styles.footerText}>Result</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} />
            <Text style={styles.footerText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  linearBackground: {
    flex: 1,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    height: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.3,
    height: height * 0.12,
    top: 10,
    resizeMode: 'contain',
  },
  bodyContent: {
    paddingTop: height * 0.12,
    paddingHorizontal: 20,
    paddingBottom: height * 0.1,
  },
  welcomeSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  welcomeImage: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#0DCAF0',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  getStartedText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  dummyText: {
    marginTop: 20,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  modulesContainer: {
    marginTop: 80,
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  moduleBox: {
    height: height * 0.1,
    marginVertical: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  moduleImage: {
    width: '30%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    opacity: 0.8,
    zIndex: 0,
  },
  moduleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moduleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10,
    marginTop: 20,
    right: -40,
    zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#0DCAF0',
  },
});