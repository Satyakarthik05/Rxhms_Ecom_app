import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Chatbot from './chatbot/components/Chatbot';
import {useQuestions} from './chatbot/hooks/useQuestions';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
const {width, height} = Dimensions.get('window');

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  const {
    questions,
    findQuestionById,
    isLoading
  } = useQuestions();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>RXHMS</Text>
            <Text style={styles.subtitle}>Your Personal Health Companion</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('HealthHome')}
              activeOpacity={0.7}>
              <View style={styles.buttonIconContainer}>
                <Icon name="medical-services" size={28} color="#e74c3c" />
              </View>
              <Text style={styles.buttonText}>Health Tools</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PatientLogin')}
              activeOpacity={0.7}>
              <View style={styles.buttonIconContainer}>
                <Icon name="health-and-safety" size={28} color="#e74c3c" />
              </View>
              <Text style={styles.buttonText}>Consult a Doctor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('GPSLogin')}
              activeOpacity={0.7}>
              <View style={styles.buttonIconContainer}>
                <Icon name="location-on" size={28} color="#e74c3c" />
              </View>
              <Text style={styles.buttonText}>GPS Tracking</Text>
            </TouchableOpacity>


            
            {/* Chatbot component without container styling */}
            <View style={styles.chatbotContent}>
              <Chatbot
                questions={questions}
                findQuestionById={findQuestionById}
              />
            </View>
          </View>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
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
    marginBottom: 20,
  },
  button: {
    width: width * 0.85,
    height: 80,
    marginBottom: 20,
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
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  chatbotPrompt: {
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  chatbotContent: {
    width: '100%',
    marginTop: "70%",
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: '#95a5a6',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;