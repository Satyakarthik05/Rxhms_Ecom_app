import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Animated Logo/Icon */}
      <View style={styles.logoContainer}>
        {/* <LottieView
          source={require('../assets/loading-animation.json')}
          autoPlay
          loop
          style={styles.animation}
        /> */}
      </View>

      {/* Loading Text */}
      <Text style={styles.title}>AI is Analyzing Your Profile</Text>

      <View style={styles.loadingItems}>
        <View style={styles.loadingItem}>
          <View style={[styles.dot, styles.dot1]} />
          <Text style={styles.loadingText}>
            Processing your body metrics and health data
          </Text>
        </View>
        <View style={styles.loadingItem}>
          <View style={[styles.dot, styles.dot2]} />
          <Text style={styles.loadingText}>
            Calculating nutritional requirements
          </Text>
        </View>
        <View style={styles.loadingItem}>
          <View style={[styles.dot, styles.dot3]} />
          <Text style={styles.loadingText}>
            Searching optimal food combinations
          </Text>
        </View>
        <View style={styles.loadingItem}>
          <View style={[styles.dot, styles.dot4]} />
          <Text style={styles.loadingText}>
            Creating your personalized meal plan
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
        <Text style={styles.progressText}>This may take a few moments...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F9FAFB',
  },
  logoContainer: {
    width: 150,
    height: 150,
    marginBottom: 32,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#111827',
    textAlign: 'center',
  },
  loadingItems: {
    marginBottom: 32,
    width: '100%',
  },
  loadingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  dot1: {
    backgroundColor: '#10B981',
  },
  dot2: {
    backgroundColor: '#3B82F6',
  },
  dot3: {
    backgroundColor: '#8B5CF6',
  },
  dot4: {
    backgroundColor: '#10B981',
  },
  loadingText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default LoadingScreen;
