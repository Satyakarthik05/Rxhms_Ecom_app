import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { usePostByBody } from '../../customHooks/usePostByPath';
import { LoginWithEmail } from '../../constants/constants';


type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);


  const { data: loginWithEmail, loading: loadingLoginWithEmail, error: errorLoginWithEmail, executePostByPath } = usePostByBody();



  // const handleLogin = async () => {
  //   navigation.navigate('OtpVerifyScreen');
  //   console.log('Login pressed', { email, password });
  // };


  const handleLogin = async () => {
    try {
      if (!email.trim()) {
        setEmailError('Please enter your email ID');
        return;
      }
      if (!password.trim()) {
        setPasswordError('Please enter your password');
        return;
      }

      setEmail('');
      setPassword('');


      const LoginWithEmailRequest = {

        emailId: email,
        password: password,

      };

      console.log("Request payload for login with email:", LoginWithEmailRequest);

      const response = await executePostByPath(LoginWithEmail, LoginWithEmailRequest);
      if(response){
       navigation.navigate('OtpVerifyScreen');
      }

    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }


  }

  const handleOTPLogin = () => {
    navigation.navigate('MobileLogin');
    console.log('OTP Login pressed');
  };

  const handlePhoneLogin = () => {
    navigation.navigate('MobileLogin');
    console.log('Phone Login pressed');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
    console.log('Forgot password pressed');
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
    console.log('Sign up pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Id"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Enter Password"
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
              <Feather name={showPassword ? 'eye' : 'eye-off'} size={22} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={handlePhoneLogin}>
              <Text style={styles.linkText}>Login with Phone Number</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotlinkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
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
