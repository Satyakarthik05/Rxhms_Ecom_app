import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import Feather from 'react-native-vector-icons/Feather';
import { usePostByBody } from '../../customHooks/usePostByPath';
import { LoginWithMobile } from '../../constants/constants';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getLocalData, setLocalData, setLocalText } from '../../utils/utils';
import { LoginRequest } from '../../models/LoginRequest';


type OtpVerifyScreenRouteProp = RouteProp<RootStackParamList, 'OtpVerifyScreen'>;
type OtpVerifyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OtpVerifyScreen'>;

const OtpVerifyScreen: React.FC = () => {
  const navigation = useNavigation<OtpVerifyScreenNavigationProp>();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const route = useRoute<OtpVerifyScreenRouteProp>();
  const { phoneNumber } = route.params;


  const {
    data: loginResponse,
    loading: loadingLoginWithMobile,
    error: errorLoginWithMobile,
    executePostByPath
  } = usePostByBody();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }
    const txnId = await getLocalData('txnId');
    console.log('Transaction ID:', txnId);

    const loginRequest: LoginRequest = {
      username: undefined, // optional
      emailId: undefined,  // optional
      password: undefined, // optional
      mobileNumber: phoneNumber,
      txnId: txnId,
      otp: otpString,
    };

    console.log('Verifying OTP with request:', loginRequest);

    try {
      const response = await executePostByPath(LoginWithMobile, loginRequest);
      console.log('OTP verified response:', response);
      const username = response?.username;
      await setLocalText('username', username);
       const token = response?.token;
      await setLocalData('token', token);
     if (response?.isCustomerExist === false) {
      navigation.navigate('Signup', { phoneNumber }); // pass number if needed in Signup
    } else {
      navigation.navigate('Home');
    }

    Alert.alert('Success', 'OTP Verified Successfully');
    } catch (error) {
      console.error('OTP verification failed:', error);
      Alert.alert('Error', 'OTP verification failed. Please try again.');
    }
  };


  const handleResendCode = () => {
    if (canResend) {
      setTimer(20);
      setCanResend(false);
      setOtp(['', '', '', '']);
      console.log('Resend OTP');
      Alert.alert('Code Sent', 'New verification code has been sent');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.fullScreen}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        {/* Text Container */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Verify your account</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              We've sent a code to{'\n'}mobile number{' '}
              <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* OTP Container */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        {/* Resend Code Section */}
        <View style={styles.resendContainer}>
          <TouchableOpacity onPress={handleResendCode} disabled={!canResend}>
            <Text style={[styles.resendText, canResend && styles.resendActive]}>
              Send code again
            </Text>
          </TouchableOpacity>
          <Text style={styles.timerText}>{formatTimer(timer)}</Text>
        </View>

        {/* Virtual Keyboard Placeholder */}
        <View style={styles.keyboardPlaceholder}>
          <Text style={styles.keyboardText}>Virtual Keyboard Area</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};



export default OtpVerifyScreen;
