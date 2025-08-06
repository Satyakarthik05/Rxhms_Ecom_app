import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from '../types/types';
import HomeScreen from '../screens/HomeScreen';
import OtpVerifyScreen from '../screens/OtpVerifyScreen';
import MobileLoginScreen from '../screens/MobileLoginScreen';
import SignupScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ForgotOtpScreen from '../screens/ForgotOtpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddFamilyMember from '../screens/AddMemberScreen';



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
        options={{ title: 'Login',
           headerShown: false,
         }}
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
       <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{ title: 'Sign up' }}
      />
        <Stack.Screen 
        name="ForgotPasswordScreen" 
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password' }}
      />

 <Stack.Screen 
        name="ForgotOtpScreen" 
        component={ForgotOtpScreen}
        options={{ title: 'Forgot Otp' }}
      />
       <Stack.Screen 
        name="ResetPasswordScreen" 
        component={ResetPasswordScreen}
        options={{ title: 'Forgot Otp' }}
      />
         <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />

      <Stack.Screen 
        name="AddMemberScreen" 
        component={AddFamilyMember}
        options={{ title: 'Add Family Member' }}
      />

    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
