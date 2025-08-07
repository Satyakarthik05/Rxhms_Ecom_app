import React, { JSX, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { scale, verticalScale, fontScale, spacing } from '../../utils/responsive';
import { Colors } from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../constants/fonts';

interface FormData {
  name: string;
  houseNumber: string;
  areaDetails: string;
  landmark: string;
  phoneNumber: string;
}

type OrderingFor = 'myself' | 'someone';
type AddressType = 'Home' | 'Office' | 'Family & Friends' | 'Other';

const AddAddressScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    houseNumber: '',
    areaDetails: '',
    landmark: '',
    phoneNumber: '',
  });
  
  const [orderingFor, setOrderingFor] = useState<OrderingFor>('myself');
  const [addressType, setAddressType] = useState<AddressType>('Home');

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderRadioButton = (value: string, selected: boolean): JSX.Element => (
    <View style={styles.radioButton}>
      <View style={[styles.radioOuter, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioText}>{value}</Text>
    </View>
  );

  const renderAddressTypeButton = (type: AddressType): JSX.Element => (
    <TouchableOpacity
      key={type}
      style={[
        styles.addressTypeButton,
        addressType === type && styles.addressTypeSelected
      ]}
      onPress={() => setAddressType(type)}
    >
      <Text style={[
        styles.addressTypeText,
        addressType === type && styles.addressTypeTextSelected
      ]}>
        {type}
      </Text>
    </TouchableOpacity>
  );

  const handleCancel = (): void => {
    // Handle cancel action
    console.log('Cancel pressed');
  };

  const handleSave = (): void => {
    // Handle save action
    console.log('Save pressed', { formData, orderingFor, addressType });
  };

  const handleBackPress = (): void => {
    // Handle back navigation
    console.log('Back pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                       <Feather name="arrow-left" size={24} color="#000" />
                     </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Address</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Name Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
           placeholderTextColor={Colors.BORDER_COLOR}
            value={formData.name}
            onChangeText={(text: string) => handleInputChange('name', text)}
          />
        </View>

        {/* House/Floor/Flat Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>House/ Floor/ Flat Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Ground floor"
            placeholderTextColor={Colors.BORDER_COLOR}
            value={formData.houseNumber}
            onChangeText={(text: string) => handleInputChange('houseNumber', text)}
          />
        </View>

        {/* Area Details */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Area Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            placeholderTextColor={Colors.BORDER_COLOR}
            value={formData.areaDetails}
            onChangeText={(text: string) => handleInputChange('areaDetails', text)}
          />
        </View>

        {/* Landmark */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Landmark (This will help rider to reach you faster)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Landmark"
            placeholderTextColor={Colors.BORDER_COLOR}
            value={formData.landmark}
            onChangeText={(text: string) => handleInputChange('landmark', text)}
          />
        </View>

        {/* Who are you ordering for? */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who are you ordering for?</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setOrderingFor('myself')}
            >
              {renderRadioButton('Myself', orderingFor === 'myself')}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setOrderingFor('someone')}
            >
              {renderRadioButton('Someone else', orderingFor === 'someone')}
            </TouchableOpacity>
          </View>
        </View>

        {/* Phone Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Phone Number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Number"
           placeholderTextColor={Colors.BORDER_COLOR}
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(text: string) => handleInputChange('phoneNumber', text)}
          />
        </View>

        {/* Save this address as */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Save this address as <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.addressTypeGroup}>
            {(['Home', 'Office', 'Family & Friends', 'Other'] as AddressType[]).map(renderAddressTypeButton)}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(12),
  },
  backIcon: {
    fontSize: fontScale(20),
    color: '#000',
  },
  headerTitle: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: verticalScale(20),
  },
  inputContainer: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: fontScale(14),
    fontWeight: '500',
    color: '#333',
    ...Fonts.fontStyleMedium,
    marginBottom: verticalScale(8),
  },
  required: {
    color: '#FF4234',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    ...Fonts.fontStyleRegular,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: scale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    fontSize: fontScale(14),
    color: '#333',
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: fontScale(14),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(12),
  },
  radioGroup: {
    flexDirection: 'row',
    gap: scale(24),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },
  radioSelected: {
    borderColor: Colors.MENU_COLOR,
  },
  radioInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: Colors.MENU_COLOR,
  },
  radioText: {
    fontSize: fontScale(14),
    color: '#333',
  },
  addressTypeGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  addressTypeButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  addressTypeSelected: {
    backgroundColor:'#CBD5E1',
    borderColor: Colors.BORDER_COLOR,
  },
  addressTypeText: {
    fontSize: fontScale(14),
    color: Colors.MENU_COLOR,
  },
  addressTypeTextSelected: {
    color: Colors.MENU_COLOR,
    
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: scale(12),
  },
  cancelButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cancelButtonText: {
    fontSize: fontScale(16),
    fontWeight: '500',
    ...Fonts.fontStyleMedium,
    color: Colors.BORDER_COLOR,
  },
  saveButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    borderRadius: scale(8),
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  saveButtonText: {
    fontSize: fontScale(16),
    fontWeight: '600',
    color: '#fff',
     ...Fonts.fontStyleMedium,
  },
});

export default AddAddressScreen;