import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { CountryPicker } from 'react-native-country-codes-picker';
import { styles } from './styles';
import { usePostByParams } from '../../customHooks/usePostByParams';
import { GenerateOtpForLogin } from '../../constants/constants';

type MobileLoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MobileLogin'>;

const MobileLoginScreen: React.FC = () => {
  const navigation = useNavigation<MobileLoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [flag, setFlag] = useState('🇮🇳');
  const [callingCode, setCallingCode] = useState('91');
  const [error, setError] = useState<string | null>(null);


    const { data, loading, error: apiError, executePost } = usePostByParams();


  const handleLogin = async () => {
     
    if (!phoneNumber.trim()) {
      setError("Mobile number is required");
      return;
    }

    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    const formattedNumber = `+${callingCode}-${phoneNumber}`;
    console.log("Submitting mobile number:", formattedNumber);

    try {
   const response =   await executePost(GenerateOtpForLogin, { mobileNumber: formattedNumber });
      console.log("OTP generation response:", response);
    console.log('Mobile Login pressed', { phoneNumber, countryCode });
   
      navigation.navigate('OtpVerifyScreen', {phoneNumber: formattedNumber})
    
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleforgot = () => {
    navigation.navigate('ForgotPasswordScreen', {phoneNumber})
  }
   
  

  const handleLoginWithEmail = () => {
    navigation.navigate('Login');
  };
  const handleSignup = () => {
    navigation.navigate('Signup', {phoneNumber});
    console.log('Sign up pressed');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Log in</Text>

        <View style={styles.mobileLoginContainer}>
          <Text style={styles.phoneLabel}>Phone Number</Text>

          <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              style={styles.countryCode}
              onPress={() => setShowCountryPicker(true)}
            >
              <Text style={styles.flagText}>{flag}</Text>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#999"
              
            />
          </View>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={handleLoginWithEmail}>
              <Text style={styles.linkText}>Login with Email</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={handleforgot}>
              <Text style={styles.forgotLinkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <CountryPicker
          show={showCountryPicker}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setFlag(item.flag);
            setShowCountryPicker(false);
          }}
          onBackdropPress={() => setShowCountryPicker(false)}
          style={{
            modal: {
              height: 400,
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
};



export default MobileLoginScreen;
