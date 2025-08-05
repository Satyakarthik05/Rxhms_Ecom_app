import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';


type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.navigate('OtpVerifyScreen'); 
    console.log('Login pressed', { email, password });
  };

  const handleOTPLogin = () => {
  navigation.navigate('MobileLogin');
    console.log('OTP Login pressed');
  };

  const handlePhoneLogin = () => {
    navigation.navigate('MobileLogin');
    console.log('Phone Login pressed');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  const handleSignUp = () => {
    console.log('Sign up pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Log in</Text>
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email or phone Number"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {/* <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text> */}
               <Feather name={showPassword ? 'eye-off' : 'eye'} size={22} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={handlePhoneLogin}>
              <Text style={styles.linkText}>Login with Phone Number</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.otpButton} onPress={handleOTPLogin}>
            <Text style={styles.otpButtonText}>Log in With OTP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default LoginScreen;
