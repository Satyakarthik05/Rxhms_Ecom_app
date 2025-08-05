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

type MobileLoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MobileLogin'>;

const MobileLoginScreen: React.FC = () => {
  const navigation = useNavigation<MobileLoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [flag, setFlag] = useState('🇮🇳');

  const handleLogin = () => {
    navigation.navigate('OtpVerifyScreen');
    console.log('Mobile Login pressed', { phoneNumber, countryCode });
  };

  const handleLoginWithEmail = () => {
    navigation.navigate('Login');
  };
  const handleSignup = () => {
    navigation.navigate('Signup');
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
              placeholder="98765 43210"
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
