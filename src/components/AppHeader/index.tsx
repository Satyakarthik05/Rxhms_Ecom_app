import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles'; // Adjust the import path as necessary
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  title, 
  showBack = true,
  backgroundColor = '#fff',
  textColor = '#000',
  iconColor = '#000'
}) => {
  type AppHeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const navigation = useNavigation<AppHeaderNavigationProp>();
  
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      <View style={[styles.header, { backgroundColor }]}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity 
              onPress={handleBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={24} color={iconColor} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: textColor, marginLeft: showBack ? 8 : 0 }]} numberOfLines={1}>
            {title}
          </Text>
        </View>
        
        <View style={styles.right}>
          <TouchableOpacity 
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <Feather name="heart" size={22} color={iconColor} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <View style={styles.notificationContainer}>
              <Feather name="bell" size={22} color={iconColor} />
              {/* Optional notification badge */}
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Profile')}
          >
            <Feather name="user" size={22} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AppHeader;



// Alternative dark theme version
export const DarkAppHeader: React.FC<AppHeaderProps> = (props) => (
  <AppHeader
    {...props}
    backgroundColor="#1a1a1a"
    textColor="#fff"
    iconColor="#fff"
  />
);