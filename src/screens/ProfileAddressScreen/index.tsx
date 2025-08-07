import React, { JSX } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from './styles'
import Feather from 'react-native-vector-icons/Feather';


interface Address {
  id: string;
  type: 'Home' | 'Office' | 'Other';
  name: string;
  fullAddress: string;
  phoneNumber: string;
}

interface AddressScreenProps {
  onAddNewAddress?: () => void;
  onEditAddress?: (addressId: string) => void;
  onDeleteAddress?: (addressId: string) => void;
  onBackPress?: () => void;
}

const AddressScreen: React.FC<AddressScreenProps> = ({
  onEditAddress,
  onDeleteAddress,
  onBackPress,
}) => {
  // Sample data - replace with your actual data
  const addresses: Address[] = [
    {
      id: '1',
      type: 'Home',
      name: 'Muthyaala Raj Chinni',
      fullAddress: '4th Floor, Aadhira Complex Opp, Hollywood Bollywood Theatre, Lakshmipuram Main Rd, Guntur, Andhra Pradesh 522007',
      phoneNumber: '+91 78456 25487',
    },
  ];

    const navigation = useNavigation();
  

  const getAddressTypeColor = (type: Address['type']): string => {
    switch (type) {
      case 'Home':
        return '#39CB74';
;
      case 'Office':
        return '#2196F3';
      default:
        return '#FF9800';
    }
  };

  const handleEditPress = (addressId: string): void => {
    onEditAddress?.(addressId);
  };

   const handleBackPress = (): void => {
    navigation.navigate('Profile' as never)
    // Handle back navigation
    console.log('Back pressed');
  };

  const handleDeletePress = (addressId: string): void => {
    onDeleteAddress?.(addressId);
  };

  const onAddNewAddress = () => {
    navigation.navigate('AddAddress' as never);
  };

  const renderAddressCard = (address: Address): JSX.Element => (
    <View key={address.id} style={styles.addressCard}>
      {/* Address Type Badge */}
      <View style={styles.addressHeader}>
        <View style={[styles.typeBadge, { backgroundColor: getAddressTypeColor(address.type) }]}>
          <View style={styles.typeRow}>
            <Image source={require('../../assets/images/add_home_icon.png')} style={styles.typeIcon} />
            <Text style={styles.typeText}>{address.type}</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditPress(address.id)}
          >
            <Image source={require('../../assets/images/add_edit_icon.png')} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeletePress(address.id)}
          >
            <Image source={require('../../assets/images/add_delete_icon.png')} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Address Details */}
      <View style={styles.addressDetails}>
        {/* Person Icon and Name */}
        <View style={styles.detailRow}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/images/add_user_icon.png')} />
          </View>
          <Text style={styles.name}>{address.name}</Text>
        </View>

        {/* Location Icon and Address */}
        <View style={styles.detailRow}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/images/add_location_icon.png')} />
          </View>
          <Text style={styles.address}>{address.fullAddress}</Text>
        </View>

        {/* Phone Number */}
        <View style={styles.phoneContainer}>
          <Text style={styles.phoneLabel}>Phone Number - </Text>
          <Text style={styles.phoneNumber}>{address.phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                              <Feather name="arrow-left" size={24} color="#000" />
                            </TouchableOpacity>
        <Text style={styles.headerTitle}>Address</Text>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {addresses.length > 0 ? (
          addresses.map(renderAddressCard)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No addresses found</Text>
            <Text style={styles.emptySubText}>Add your first address to get started</Text>
          </View>
        )}
      </ScrollView>

      {/* Add New Address Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAddNewAddress}
        >
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default AddressScreen;