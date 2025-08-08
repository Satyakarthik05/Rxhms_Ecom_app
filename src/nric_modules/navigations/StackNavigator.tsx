import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProfile, DietPlan} from '../HealthTools/types/diet';
import {DietAIService} from '../HealthTools/services/dietAI';
import HealthHomeScreen from '../HealthTools/screens/HomeScreen';
import UserProfileForm from '../HealthTools/components/UserProfileForm';
import DietPlanDisplay from '../HealthTools/components/DietPlanDisplay';
import LoadingScreen from '../HealthTools/components/LoadingScreen';
import BMICalculator from '../HealthTools/components/BMICalculator';
import BreatheChallenge from '../HealthTools/components/BreatheChallenge';
import MedicineReminderScreen from '../HealthTools/screens/MedicineReminderScreen';
import WaterReminderScreen from '../HealthTools/screens/WaterReminderScreen';
import {RootStackParamList} from '../../../types/types';
import index from '../chatbot/index';
import WelcomeScreen from '../WelcomeScreen';
import CallSetupScreen from '../VoipCalling/components/CallSetupScreen';
import LoginScreen from '../VoipCalling/screens/LoginScreen';
import RegisterScreen from '../VoipCalling/screens/RegisterScreen';
import HomeScreen from '../VoipCalling/screens/HomeScreen';
import VideoCallScreen from '../VoipCalling/components/VideoCallScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

  const handleProfileSubmit = async (profile: UserProfile) => {
    try {
      const plan = await DietAIService.generateDietPlan(profile);
      setDietPlan(plan);
      return plan;
    } catch (error) {
      console.error('Error generating diet plan:', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PatientLogin"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CallSetup"
          component={CallSetupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoCallScreen"
          component={VideoCallScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HealthHome"
          component={HealthHomeScreen}
          options={{title: 'AI Diet Planner'}}
        />
        <Stack.Screen name="ProfileForm" options={{title: 'Create Profile'}}>
          {() => <UserProfileForm onSubmit={handleProfileSubmit} />}
        </Stack.Screen>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DietPlan"
          component={DietPlanDisplay}
          options={{title: 'Your Diet Plan'}}
        />
        <Stack.Screen
          name="BMICalculator"
          component={BMICalculator}
          options={{title: 'BMI Calculator'}}
        />
        <Stack.Screen
          name="BreatheChallenge"
          component={BreatheChallenge}
          options={{title: 'Breathe Challenge'}}
        />
        <Stack.Screen
          name="WaterReminderScreen"
          component={WaterReminderScreen}
          options={{title: 'WaterRemainder'}}
        />
        <Stack.Screen
          name="MedicineReminderScreen"
          component={MedicineReminderScreen}
          options={{title: 'MedicineRemainder'}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
