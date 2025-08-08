import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../types/navigation'; // Adjust path if needed

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HealthHomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const features = [
    {
      icon: 'food-apple',
      name: 'Diet Planner',
      description: 'Get personalized meal plans based on your profile',
      action: () => navigation.navigate('ProfileForm'),
      color: '#10B981',
    },
    {
      icon: 'calculator',
      name: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and health status',
      action: () => navigation.navigate('BMICalculator'),
      color: '#3B82F6',
    },
    {
      icon: 'meditation',
      name: 'Breathe Challenge',
      description: 'Daily breathing exercises for stress relief',
      action: () => navigation.navigate('BreatheChallenge'),
      color: '#8B5CF6',
    },
    {
      icon: 'meditation',
      name: 'Medicine Reminder',
      description: 'Your personal medicine reminder',
      action: () => navigation.navigate('MedicineReminderScreen'),
      color: '#8B5CF6',
    },
    {
      icon: 'meditation',
      name: 'Water Reminder',
      description: 'your water remainder',
      action: () => navigation.navigate('WaterReminderScreen'),
      color: '#8B5CF6',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Health Companion</Text>
      <Text style={styles.subtitle}>Your personalized health and wellness assistant</Text>
      
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.featureCard, { borderLeftColor: feature.color }]}
            onPress={feature.action}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
              <Icon name={feature.icon} size={24} color={feature.color} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>{feature.name}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>About This App</Text>
        <Text style={styles.infoText}>
          This health companion provides personalized diet plans, BMI tracking, 
          and breathing exercises to improve your overall wellness.
        </Text>
        <Text style={styles.disclaimer}>
          Note: This app is for educational purposes only. Consult a healthcare professional before making significant changes.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
    lineHeight: 22,
  },
  disclaimer: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default HealthHomeScreen;
