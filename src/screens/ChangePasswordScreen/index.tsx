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
import { styles } from '../ResetPasswordScreen/styles';
import { RootStackParamList } from '../../types/types';
import Feather from 'react-native-vector-icons/Feather';
import { useRoute, RouteProp } from '@react-navigation/native';
import { usePostByParams } from '../../customHooks/usePostByParams';
import { ChangePassword, ResetPassword } from '../../constants/constants';
import { getLocalText } from '../../utils/utils';
import { Colors } from '../../constants/colors';


const { width } = Dimensions.get('window');
type ChangePasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChangePasswordScreen'
>;
type ChangePasswordScreenRouteProp = RouteProp<RootStackParamList, 'ChangePasswordScreen'>;

const ChangePasswordScreen: React.FC = () => {
     const navigation = useNavigation<ChangePasswordScreenNavigationProp>()
       const [oldPassword, setOldPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const route = useRoute<ChangePasswordScreenRouteProp>();

  const {
  data: loginResponse,
  loading: loadingLoginWithMobile,
  error: errorLoginWithMobile,
  executePost
} = usePostByParams();

  const handleChangePassword =  async () => {

   try {
    const username = await getLocalText('username')
       const response = await executePost(ChangePassword, {
      username: username,
       oldPassword: oldPassword,
       newPassword: newPassword
       });
   
       console.log('Change Password', response);
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

   const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
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
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Please type something you'll remember
          </Text>
        </View>

        {/* Password Input Fields */}
        <View style={styles.inputSection}>


             <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Old password</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="must be 8 characters"
                placeholderTextColor="#999999"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={!showOldPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={toggleOldPasswordVisibility}
              >
                  <Feather name={showOldPassword ? 'eye' : 'eye-off'} size={22} color={Colors.BORDER_COLOR} />
              </TouchableOpacity>
            </View>
          </View>
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
                  <Feather name={showNewPassword ? 'eye' : 'eye-off'} size={22} color={Colors.BORDER_COLOR} />
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
                  <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={22} color={Colors.BORDER_COLOR} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Reset Password Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetPasswordButton} onPress={handleChangePassword}>
            <Text style={styles.resetPasswordButtonText}>Change password</Text>
          </TouchableOpacity>
        </View>
      </View>

    
    </SafeAreaView>
  );
};



export default ChangePasswordScreen;