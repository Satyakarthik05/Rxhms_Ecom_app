import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { RootStackParamList } from '../../types/types';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResetPasswordScreen'
>;

const ResetPasswordScreen: React.FC = () => {
     const navigation = useNavigation<ResetPasswordScreenNavigationProp>()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    // Handle reset password logic here
    console.log('Reset password');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 22,
  },
  backButtonText: {
    fontSize: 28,
    color: '#000000',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  // Reset password header - better spacing
  resetPasswordHeader: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
    fontWeight: '400',
  },
  // Input section - better spacing and alignment
  inputSection: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '600',
  },
  passwordInputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
   
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  eyeIcon: {
    fontSize: 20,
    color: '#666666',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  resetPasswordButton: {
    height: 56,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  resetPasswordButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alreadyHaveAccountText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  logInText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default ResetPasswordScreen;