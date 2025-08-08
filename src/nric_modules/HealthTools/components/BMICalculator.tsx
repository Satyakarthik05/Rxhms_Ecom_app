import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [history, setHistory] = useState<Array<{ date: string; bmi: number }>>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('bmiHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading BMI history:', error);
    }
  };

  const saveToHistory = async (newBmi: number) => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      bmi: newBmi,
    };

    const updatedHistory = [newEntry, ...history.slice(0, 9)];

    try {
      await AsyncStorage.setItem('bmiHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error saving BMI history:', error);
    }
  };

  const calculateBmi = () => {
    if (!height || !weight) return;

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const roundedBmi = Math.round(bmiValue * 10) / 10;

    setBmi(roundedBmi);
    determineBmiCategory(roundedBmi);
    saveToHistory(roundedBmi);
  };

  const determineBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) setBmiCategory('Underweight');
    else if (bmiValue < 25) setBmiCategory('Normal weight');
    else if (bmiValue < 30) setBmiCategory('Overweight');
    else setBmiCategory('Obese');
  };

  const getBmiColor = () => {
    if (!bmi) return '#6B7280';
    if (bmi < 18.5) return '#3B82F6';
    if (bmi < 25) return '#10B981';
    if (bmi < 30) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <Text style={styles.title}>BMI Calculator</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 170"
          value={height}
          onChangeText={setHeight}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 65"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateBmi}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>

      {bmi !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Your Result</Text>
          <View style={[styles.bmiCircle, { borderColor: getBmiColor() }]}>
            <Text style={[styles.bmiValue, { color: getBmiColor() }]}>{bmi}</Text>
          </View>
          <Text style={[styles.bmiCategory, { color: getBmiColor() }]}>
            {bmiCategory}
          </Text>

          <View style={styles.bmiScale}>
            {[
              { label: 'Underweight', range: '< 18.5', color: '#3B82F6' },
              { label: 'Normal', range: '18.5 - 24.9', color: '#10B981' },
              { label: 'Overweight', range: '25 - 29.9', color: '#F59E0B' },
              { label: 'Obese', range: '> 30', color: '#EF4444' },
            ].map((item, i) => (
              <View key={i} style={styles.scaleItem}>
                <View style={[styles.scaleIndicator, { backgroundColor: item.color }]} />
                <Text style={styles.scaleText}>{item.label}</Text>
                <Text style={styles.scaleRange}>{item.range}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {history.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Your BMI History</Text>
          {history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text
                style={[
                  styles.historyBmi,
                  {
                    color:
                      item.bmi < 18.5
                        ? '#3B82F6'
                        : item.bmi < 25
                        ? '#10B981'
                        : item.bmi < 30
                        ? '#F59E0B'
                        : '#EF4444',
                  },
                ]}
              >
                {item.bmi}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111827',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  button: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
    textAlign: 'center',
  },
  bmiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  bmiCategory: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  bmiScale: {
    marginTop: 16,
  },
  scaleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scaleIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  scaleText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
  },
  scaleRange: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  historyContainer: {
    marginTop: 32,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  historyDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  historyBmi: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BMICalculator;
