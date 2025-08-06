import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import useApiCall from '../../customHooks/customhooks';
import { BaseAxios, GetAddonCustomers, GetCustomerDetails, Logout } from '../../constants/constants';
import { CustomerMaster } from '../../models/CustomerMaster';
import { Colors } from '../../constants/colors';
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileCardProps {
  name: string;
  phone: string;
  uhid: string;
}

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  color?: string;
}

interface CustomerDetailsResponse {
  content?: CustomerMaster;
}

interface AddonCustomersResponse {
  content?: CustomerMaster[];
}

type AddMemberScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddMemberScreen'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<AddMemberScreenNavigationProp>();

  /* Fetch Customer Details */
  const { data: customerDetails, loading, error } = useApiCall<CustomerDetailsResponse>(
    'GET',
    GetCustomerDetails,
    undefined,
    undefined,
    undefined,
    true
  );

  const customer = customerDetails?.content;



  /* FETCH ADD ON CUSTOMERS */
  const {
    data: getAddonCustomers,
    error: errorAddonCustomers,
    loading: loadingAddonCustomers,
    executeApiCall: fetchAddonCustomers
  } = useApiCall<AddonCustomersResponse>(
    'GET',
    customer?.username ? GetAddonCustomers(customer.username) : '',
    undefined,
    undefined,
    undefined,
    false
  );

  // Fetch addon customers when customer data is available
  useEffect(() => {
    if (customer?.username) {
      fetchAddonCustomers();
    }
  }, [customer?.username, fetchAddonCustomers]);

  console.log('Customer Details:', customerDetails);
  console.log('Get add on customers:', getAddonCustomers);

  const addonCustomersList = getAddonCustomers?.content || [];



  const handleManageProfile = () => {
    console.log('Manage Profile pressed');
  };

  const handleAddProfile = () => {
    console.log('Add Profile pressed');
  };

  const handleBecomeMember = () => {
    navigation.navigate('AddMemberScreen', { customer });
    console.log('Become a member pressed');
  };

  const handleMenuPress = async (item: string) => {
    if (item === 'Logout') {
      try {
        const response = await BaseAxios.post(Logout);
        console.log("response from profile logout", response)
        // Clear tokens or other session storage (optional)
        if (response.status == 200) {
          AsyncStorage.multiRemove(['token', 'username'])
          // Redirect to login
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Adjust the screen name
          });
        }

      } catch (error) {
        // Log and ignore token invalid errors during logout
        console.warn("Logout failed or token invalid. Proceeding to clear session.", error);
      }


    } else {
      console.log(`${item} pressed`);
    }
  };


  // const handleLogout = async () => {


  //     let result;
  //     try {

  //       const storedDeviceInfo = await getLocalData("deviceTokenInfo");
  //       result = await deviceLogout(storedDeviceInfo);
  //       await setLocalData("deviceTokenInfo", result.content);
  //       // 1. Call your backend logout endpoint (optional – but good to keep server session clean)
  //       const response = await BaseAxios.post(Logout);
  //       //if (true) {
  //       if (response.status === 200) {
  //         console.log("Logout successful on server side");
  //         dispatch(resetNotificationsState());

  //         await AsyncStorage.multiRemove([
  //           "jwt_token",
  //           "username",
  //           "user_profile",
  //           "cart_items",
  //           // DO NOT remove 'LOCAL_NOTIFICATIONS' - this should persist
  //         ])
  //         dispatch(clearAuthState());
  //         dispatch(clearProfile());

  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 0,
  //             routes: [{ name: 'LoginScreen' }],
  //           })
  //         );
  //         await setLocalData("deviceTokenInfo", result.content);
  //       }
  //     } catch (error) {
  //       console.error("Error during logout API call:", error);
  //       // Even if the API call fails, we still want to clear local data.
  //     }
  //     /* finally {
  //       // 2. Wipe out everything in AsyncStorage
  //       await clearSessionData(); 
  //       // (Assuming `clearSessionData()` does AsyncStorage.clear())

  //       // 3. Reset any Redux slices that hold user info
  //       dispatch(clearAuthState()); 
  //       dispatch(clearProfile()); // if you store profile data separately



  //       // 4. Finally, reset the navigation state so that LoginScreen is the only route
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 0,
  //           routes: [{ name: 'LoginScreen' }],
  //         })
  //       );

  //       console.log("eswar::::  "+result);

  //         console.log("yash");
  //     }*/
  //   };




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
        </View>

        {/* Manage Profile and Add Profile Options */}
        <View style={styles.profileOptionsContainer}>
          <TouchableOpacity
            style={[styles.profileOption, styles.leftOption]}
            onPress={handleManageProfile}
          >
            <Text style={styles.profileOptionText}>Manage Profile</Text>
            <Feather name="edit-2" size={16} color="#2196F3" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={[styles.profileOption, styles.rightOption]}
            onPress={handleAddProfile}
          >
            <Text style={styles.profileOptionText}>Add Profile</Text>
            <Feather name="plus-circle" size={16} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {/* Profile Card Section */}
        {customer && (
          <View style={styles.profileCardContainer}>
            <ProfileCard
              name={`${customer.firstName?.trim() || ''} ${customer.lastName?.trim() || ''}`}
              phone={customer.mobileNumber || 'N/A'}
              uhid={customer.uhid || 'UHID: N/A'}
            />

            {/* More Profile Section */}
            {addonCustomersList.length > 0 && (
              <View style={styles.moreProfileSection}>
                <Text style={styles.moreProfileTitle}>
                  More Profile ({addonCustomersList.length})
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.profileScrollContainer}
                >
                  {addonCustomersList.map((addonCustomer, index) => (
                    <TouchableOpacity
                      key={addonCustomer.id || index}
                      style={styles.additionalProfileItem}
                    >
                      <View style={styles.smallAvatar}>
                        <Feather name="user" size={20} color="#666" />
                      </View>
                      <Text style={styles.additionalProfileName}>
                        {`${addonCustomer.firstName?.trim().slice(0, 4) || 'User'}...`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Become a Member Button */}
            <TouchableOpacity
              style={styles.becomeMemberButton}
              onPress={handleBecomeMember}
            >
              <Text style={styles.becomeMemberText}>Become a member</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Menu Options Section */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="shopping-bag"
            title="My Orders"
            onPress={() => handleMenuPress('My Orders')}
            color={Colors.MENU_COLOR}
          />
          <MenuItem
            icon="heart"
            title="Doctor Consultancy"
            onPress={() => handleMenuPress('Doctor Consultancy')}
            color={Colors.MENU_COLOR}
          />
          <MenuItem
            icon="heart"
            title="All Health Records"
            onPress={() => handleMenuPress('All Health Records')}
            color={Colors.MENU_COLOR}
          />
          <MenuItem
            icon="map-pin"
            title="Address"
            onPress={() => handleMenuPress('Address')}
            color={Colors.MENU_COLOR}
          />
          <MenuItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => handleMenuPress('Help & Support')}
            color={Colors.MENU_COLOR}
          />
          <MenuItem
            icon="lock"
            title="Change Password"
            onPress={() => handleMenuPress('Change Password')}
            color={Colors.MENU_COLOR}
          />
          <MenuItem
            icon="log-out"
            title="Logout"
            onPress={() => handleMenuPress('Logout')}
            color={Colors.RED}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, phone, uhid }) => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatar}>
        <Image source={require('../../assets/images/my_account.png')} />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profilePhone}>{phone}</Text>
        <Text style={styles.profileUhid}>{uhid}</Text>
      </View>
    </View>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, color = '#2196F3' }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Feather name={icon as any} size={20} color={color} />
      <Text style={[styles.menuItemText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ProfileScreen;