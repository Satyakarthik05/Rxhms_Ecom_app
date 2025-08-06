import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '../../types/types';
import Feather from 'react-native-vector-icons/Feather';
import { useRoute, RouteProp } from '@react-navigation/native';
import { usePostByParams } from '../../customHooks/usePostByParams';
import { ResetPassword } from '../../constants/constants';


const { width } = Dimensions.get('window');
type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResetPasswordScreen'
>;
type ResetPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ResetPasswordScreen'>;

const ResetPasswordScreen: React.FC = () => {
     const navigation = useNavigation<ResetPasswordScreenNavigationProp>()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const route = useRoute<ResetPasswordScreenRouteProp>();
const { phoneNumber } = route.params ?? {};

  const {
  data: loginResponse,
  loading: loadingLoginWithMobile,
  error: errorLoginWithMobile,
  executePost
} = usePostByParams();

  const handleResetPassword =  async () => {
   try {
       const response = await executePost(ResetPassword, {
       mobileNumber: phoneNumber,
       password: newPassword
       });
   
       console.log('ValidateOtpForForgotPwd', response);
       Alert.alert('Success', 'OTP Verified Successfully');
       navigation.navigate('Login');
   
     } catch (error) {
       console.error('OTP verification failed:', error);
       Alert.alert('Error', 'OTP verification failed. Please try again.');
     }
  };

  const handleLogIn = () => {
    navigation.navigate('Login')
    // Handle navigation to login screen
    console.log('Navigate to login');
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

   const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
               <Feather name="arrow-left" size={24} color="#000" />
             </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Reset Password Header Content */}
        <View style={styles.resetPasswordHeader}>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>
            Please type something you'll remember
          </Text>
        </View>

        {/* Password Input Fields */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New password</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="must be 8 characters"
                placeholderTextColor="#999999"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={toggleNewPasswordVisibility}
              >
                  <Feather name={showNewPassword ? 'eye' : 'eye-off'} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm new password</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="repeat password"
                placeholderTextColor="#999999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={toggleConfirmPasswordVisibility}
              >
                  <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Reset Password Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPassword}>
            <Text style={styles.resetPasswordButtonText}>Reset password</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.alreadyHaveAccountContainer}>
          <Text style={styles.alreadyHaveAccountText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogIn}>
            <Text style={styles.logInText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};



export default ResetPasswordScreen;