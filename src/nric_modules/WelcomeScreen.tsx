import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RXHMS</Text>
        <Text style={styles.subtitle}>Your Personal Health Companion</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('HealthHome')}
          activeOpacity={0.7}
        >
          <View style={styles.buttonIconContainer}>
            <Icon name="medical-services" size={28} color="#e74c3c" />
          </View>
          <Text style={styles.buttonText}>Health Tools</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('PatientLogin')}
          activeOpacity={0.7}
        >
          <View style={styles.buttonIconContainer}>
            <Icon name="health-and-safety" size={28} color="#e74c3c" />
          </View>
          <Text style={styles.buttonText}>Consult a doctor</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  button: {
    width: width * 0.7,
    height: 80,
    marginBottom:20,
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonIconContainer: {
    width: 48,
    height: 48,
    
    borderRadius: 10,
    backgroundColor: 'rgba(231, 76, 60, 0.1)', // Matching icon color with opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#95a5a6',
    fontSize: 12,
  },
});

export default WelcomeScreen;