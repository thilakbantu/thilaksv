import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstSecondAndThirdPages from "./Screens/FirstSecondAndThirdPages";
import WelcomeScreen from './Screens/WelcomeScreen';
import HomeScreen from './Screens/HomeScreen';
import HomeScreen1 from './Screens/HomeScreen1';
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import SubModuleScreen from './Screens/SubModuleScreen';
import InstructionsScreen from './Screens/InstructionsScreen';
import ResultScreen from './Screens/ResultScreen';
import SettingsScreen from './Screens/SettingsScreen';
import DetailScreen from './Screens/DetailScreen';
import ReachUsScreen from "./Screens/ReachUsScreen";
import OverallResultScreen from './Screens/OverallResultScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EditProfileScreen from "./Screens/EditProfileScreen";
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import TestScreen from './Screens/TestScreen';
import CandidateTestReportScreen from './Screens/CandidateTestReportScreen';
import { UserProvider } from "./contexts/UserContext";
import { ProfileProvider } from "./Screens/ProfileContext";
import GroupDiscussionScreen from "./Screens/GroupDiscussionScreen";
import ResultSectionScreen from "./Screens/ResultSectionScreen";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ProfileProvider>
        <UserProvider>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen}
              options={{ headerShown: false }} />
            <Stack.Screen name="Onboarding" component={FirstSecondAndThirdPages}
              options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen}
              options={{ headerShown: false }} />
            <Stack.Screen name="Home1" component={HomeScreen1}
              options={{ headerShown: false }} />
            <Stack.Screen name="SubModule" component={SubModuleScreen} options={{ title: 'Section' }} />
            <Stack.Screen name="Instruction" component={InstructionsScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Section' }} />
            <Stack.Screen name="Test" component={TestScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CandidateTestReport" component={CandidateTestReportScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Score" component={ScoreScreen} /> */}
            <Stack.Screen name="OverallResult" component={OverallResultScreen} />
            <Stack.Screen name="ReachUs" component={ReachUsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="GroupDiscussion" component={GroupDiscussionScreen} />
            <Stack.Screen name="Section" component={ResultSectionScreen} />
          </Stack.Navigator>
        </UserProvider>
      </ProfileProvider>
    </NavigationContainer>
  );
};


export default App;
