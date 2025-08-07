import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { formatDate } from '../../utils/utils';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { styles as MobileLoginStyles } from '../MobileLoginScreen/styles'
import { styles as RegisterStyles } from '../RegisterScreen/styles';
import { styles } from './styles';
import { usePostByBody } from '../../customHooks/usePostByPath';
import { AddonRequest } from '../../models/AddonRequest';
import { CreateAddOnCustomer } from '../../constants/constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import { CustomerMaster } from '../../models/CustomerMaster';
import { GenderType } from '../../models/enums';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



interface FamilyMemberData {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  relation: string;
  email: string;
}

type AddMemberScreenRouteProp = RouteProp<RootStackParamList, 'AddMemberScreen'>;
type AddMemberScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const AddFamilyMember: React.FC = () => {

   const route = useRoute<AddMemberScreenRouteProp>();
     const navigation = useNavigation<AddMemberScreenNavigationProp>();
   
  const { customer } = route.params ?? {};
  const [formData, setFormData] = useState<FamilyMemberData>({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: 'Male',
    bloodGroup: '',
    relation: '',
    
    email: 'mitchinn@chssoftwares.com',
  });
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [flag, setFlag] = useState('🇮🇳');
  const [callingCode, setCallingCode] = useState('91');
  const [phoneNumber, setPhoneNumber] = useState('');


 const {
    data: addOnCustomer,
    loading: loadingAddonCustomer,
    error: errorAddonCustomer,
    executePostByPath
  } = usePostByBody();


  const handleInputChange = (field: keyof FamilyMemberData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderSelect = (gender: 'Male' | 'Female' | 'Other') => {
    setFormData(prev => ({
      ...prev,
      gender,
    }));
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Cancel pressed');
  };


  const handleBackIcon = () => {
    navigation.navigate('Profile');
  }
 
  const handleSave = async () => {
  try {
    // Input validation
    if (!formData.firstName.trim()) {
      Alert.alert('Error', 'First name is required');
      return;
    }
    
    if (!formData.lastName.trim()) {
      Alert.alert('Error', 'Last name is required');
      return;
    }
    
    if (!formData.relation.trim()) {
      Alert.alert('Error', 'Relationship is required');
      return;
    }
    
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Phone number is required');
      return;
    }
    
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    // Phone number validation (assuming 10 digits for Indian numbers)
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    
    // Check if customer exists
    if (!customer || !customer.id) {
      Alert.alert('Error', 'Customer information not found');
      return;
    }

    const customerMaster: CustomerMaster = {
      firstName: formData.firstName.trim(),
      middleName: formData.middleName?.trim(), // Handle empty middle name
      lastName: formData.lastName.trim(),
      username: null,
     gender: formData.gender.toUpperCase() as GenderType,
      dob: dateOfBirth.toISOString().split('T')[0], // Format: YYYY-MM-DD
      mobileNumber: `+${callingCode}-${phoneNumber}`,
      emailId: formData.email.trim(),
      referredBy: null,
      registeredOn: null, // Current timestamp
      parentId: null, // Set parent ID to primary customer
    };

    const addonRequest: AddonRequest = {
      primaryCustomerId: customer.id,
      relationship: formData.relation.trim(),
      customer: customerMaster,
    };


    console.log('Submitting Addon Request:', addonRequest);

    const response = await executePostByPath(CreateAddOnCustomer, addonRequest);

    if (response) {
      console.log('Add-on Customer Created:', response);
      Alert.alert(
        'Success', 
        'Family member added successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back or reset form
              // navigation.goBack(); // Uncomment if you want to navigate back
              // Or reset the form:
              setFormData({
                firstName: '',
                lastName: '',
                middleName: '',
                gender: 'Male',
                bloodGroup: '',
                relation: '',
                email: '',
              });
              setPhoneNumber('');
              setDateOfBirth(new Date());
            }
          }
        ]
      );
    navigation.navigate('Profile')
    } else {
      throw new Error('No response received from server');
    }
    
  } catch (error) {
    console.error('Error saving family member:', error);
    
    // More specific error handling
    let errorMessage = 'Failed to save family member. Please try again.';
    
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
      errorMessage = (error as any).message;
    } else if (typeof error === 'object' && error !== null && 'response' in error && (error as any).response?.data?.message) {
      errorMessage = (error as any).response.data.message;
    }
    
    Alert.alert('Error', errorMessage);
  }
};
  const RadioButton: React.FC<{
    selected: boolean;
    onPress: () => void;
    label: string;
  }> = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={styles.radioButton}>
        {selected && <View style={styles.radioButtonSelected} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackIcon}>
                   <Feather name="arrow-left" size={24} color="#000" />
                 </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Family Member</Text>
      </View>

      <View style={styles.form}>
        {/* First Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter First Name"
            placeholderTextColor="#a0a0a0"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Middle Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Middle Name"
            placeholderTextColor="#a0a0a0"
            value={formData.middleName}
            onChangeText={(value) => handleInputChange('middleName', value)}
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Last Name"
            placeholderTextColor="#a0a0a0"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
        </View>
         <View style={styles.inputGroup}>
          <Text style={styles.label}>Relationship</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg: Mom, Daughter"
            placeholderTextColor="#a0a0a0"
            value={formData.relation}
            onChangeText={(value) => handleInputChange('relation', value)}
          />
        </View>



        {/* Gender */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            <RadioButton
              selected={formData.gender === 'Male'}
              onPress={() => handleGenderSelect('Male')}
              label="Male"
            />
            <RadioButton
              selected={formData.gender === 'Female'}
              onPress={() => handleGenderSelect('Female')}
              label="Female"
            />
            <RadioButton
              selected={formData.gender === 'Other'}
              onPress={() => handleGenderSelect('Other')}
              label="Other"
            />
          </View>
        </View>


        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.label}>Phone Number</Text>
        <View style={MobileLoginStyles.phoneInputContainer}>

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



        <View style={RegisterStyles.fieldContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={RegisterStyles.dateText}>{formatDate(dateOfBirth)}</Text>
            <Feather name="calendar" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};



export default AddFamilyMember;