import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from '../types/types';
import HomeScreen from '../screens/HomeScreen';
import OtpVerifyScreen from '../screens/OtpVerifyScreen';
import MobileLoginScreen from '../screens/MobileLoginScreen';



const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
        <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
       <Stack.Screen 
        name="OtpVerifyScreen" 
        component={OtpVerifyScreen}
        options={{ title: 'OTP Verification' }}
      />
       <Stack.Screen 
        name="MobileLogin" 
        component={MobileLoginScreen}
        options={{ title: 'Login' }}
      />

    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
