import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { styles } from './styles'; // Assuming styles are defined in styles.ts
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import Feather from 'react-native-vector-icons/Feather';
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    navigation.navigate('ForgotOtpScreen');
    // Handle send code logic here
    console.log('Send code to:', email);
  };

  const handleLogIn = () => {
    navigation.navigate('Login')
    // Handle navigation to login screen
    console.log('Navigate to login');
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
        {/* Forgot Password Content */}
        <View style={styles.forgotPasswordContent}>
          <Text style={styles.title}>Forgot password?</Text>
          <Text style={styles.subtitle}>
            Don't worry! It happens. Please enter the email associated with your account.
          </Text>
        </View>

        {/* Text Input Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email or phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email address"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Send Code Button */}
        <TouchableOpacity style={styles.sendCodeButton} onPress={handleSendCode}>
          <Text style={styles.sendCodeButtonText}>Send code</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.rememberPasswordContainer}>
          <Text style={styles.rememberPasswordText}>Remember password? </Text>
          <TouchableOpacity onPress={handleLogIn}>
            <Text style={styles.logInText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default ForgotPasswordScreen;