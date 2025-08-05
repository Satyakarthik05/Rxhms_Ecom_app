
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import Feather from 'react-native-vector-icons/Feather';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !gender || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    console.log('Signup data:', {
      name,
      email,
      gender,
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      password,
    });

    Alert.alert('Success', 'Account created successfully!');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
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
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Muthayla Raj Chinni"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>

        {/* Email Field */}
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
        <View style={styles.fieldContainer}>
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
        </View>

        {/* Confirm Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirm password</Text>
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
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={onChangeDate}
        />
      )}
     
    </SafeAreaView>
     </ScrollView>
  );
};



export default SignupScreen;
