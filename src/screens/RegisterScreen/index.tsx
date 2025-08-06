
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {styles} from'./styles';
import {styles as MobileLoginStyles} from '../MobileLoginScreen/styles'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import Feather from 'react-native-vector-icons/Feather';
import { CustomerRegistration } from '../../models/CustomerRegistration';
import { RegisterUser } from '../../constants/constants';
import { usePostByBody } from '../../customHooks/usePostByPath';
import { GenderType } from '../../models/enums';
import { useRoute, RouteProp } from '@react-navigation/native';
import { formatDate } from '../../utils/utils';

type SignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>;

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
   const route = useRoute<SignupScreenRouteProp>();
  const { phoneNumber: initialPhoneNumber } = route.params || {};
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
  const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [nickName, setNickName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const [flag, setFlag] = useState('🇮🇳');
    const [callingCode, setCallingCode] = useState('91');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


   const {
      data: loginResponse,
      loading: loadingLoginWithMobile,
      error: errorLoginWithMobile,
      executePostByPath
    } = usePostByBody();

  const handleSignup = async () => {
    // if (!firstName || !lastName || !email || !gender || !password || !confirmPassword) {
    //   Alert.alert('Error', 'Please fill all fields');
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   Alert.alert('Error', 'Passwords do not match');
    //   return;
    // }

    // if (password.length < 8) {
    //   Alert.alert('Error', 'Password must be at least 8 characters');
    //   return;
    // }

    const registerRequest: CustomerRegistration = {
        firstName,
        middleName: '',
        lastName,
        username: '',
        displayName: nickName,
        gender: gender.toUpperCase() as GenderType,
         mobileNumber: phoneNumber,
         emailId: email,
         password: confirmPassword,
        dob: dateOfBirth.toISOString().split('T')[0], // Format date as YYYY-MM-DD

      };
      console.log('Customer registration request:', registerRequest);
      try {
            const response = await executePostByPath(RegisterUser, registerRequest);
            console.log('Customer registration response:', response);
          //  if (response?.isCustomerExist === false) {
          //   navigation.navigate('Signup', { phoneNumber }); // pass number if needed in Signup
          // } else {
            navigation.navigate('Home');
          // }
      
          Alert.alert('Success', 'OTP Verified Successfully');
          } catch (error) {
            console.error('OTP verification failed:', error);
            Alert.alert('Error', 'OTP verification failed. Please try again.');
          }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Date picker change handler
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // iOS keeps the picker open until closed manually
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
     <ScrollView>
    
    <SafeAreaView style={styles.container}>
       {/* Header with back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign up</Text>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="#999"
          />
        </View>
           <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="#999"
          />
        </View>

             <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nick Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Nick Name"
            value={nickName}
            onChangeText={setNickName}
            placeholderTextColor="#999"
          />
        </View>

         <View style={MobileLoginStyles.phoneInputContainer}> 
           <Text style={styles.label}>Phone Number</Text>
                    <TouchableOpacity
                      style={MobileLoginStyles.countryCode}
                      onPress={() => setShowCountryPicker(true)}
                    >
                      <Text style={MobileLoginStyles.flagText}>{flag}</Text>
                      <Text style={MobileLoginStyles.countryCodeText}>{countryCode}</Text>
                    </TouchableOpacity>
        
                    <TextInput
                      style={MobileLoginStyles.phoneInput}
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="phone-pad"
                      // maxLength={10}
                      placeholderTextColor="#999"
                    />
                  </View>

        {/* Email Field */}
       

        {/* Gender Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Male' && styles.genderSelected]}
              onPress={() => setGender('Male')}
            >
              <View style={[styles.radioButton, gender === 'Male' && styles.radioSelected]}>
                {gender === 'Male' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderOption, gender === 'Female' && styles.genderSelected]}
              onPress={() => setGender('Female')}
            >
              <View style={[styles.radioButton, gender === 'Female' && styles.radioSelected]}>
                {gender === 'Female' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderOption, gender === 'Other' && styles.genderSelected]}
              onPress={() => setGender('Other')}
            >
              <View style={[styles.radioButton, gender === 'Other' && styles.radioSelected]}>
                {gender === 'Other' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date of Birth Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>
            <Feather name="calendar" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Create Password Field */}
        {/* <View style={styles.fieldContainer}>
          <Text style={styles.label}>Create a password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="must be 8 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View> */}


         <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="mrchinni@chasoftware.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Confirm Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="repeat password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* DateTime Picker Modal */}
     <DateTimePicker
  isVisible={showDatePicker}
  mode="date"
  onConfirm={(date) => {
    setDateOfBirth(date);
    setShowDatePicker(false);
  }}
  onCancel={() => setShowDatePicker(false)}
  maximumDate={new Date()}
/>

     
    </SafeAreaView>
     </ScrollView>
  );
};



export default SignupScreen;
