import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { register, login } from '../api/api';
import styles from '../styles/AuthScreenStyles';

interface Props {
  onLogin: (customer: any) => void;
}

const LoginRegisterScreen: React.FC<Props> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const fn = mode === 'login' ? login : register;
      const res = await fn(form);

      if (res.data) {
        const cust = res.data;
        onLogin(cust);
        setSuccess(mode === 'login' ? 'Login successful!' : 'Registration successful!');
      } else {
        setError('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || `Error during ${mode}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#007bff' }}>
      {/* Set status bar appearance */}
      <StatusBar backgroundColor="#007bff" barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </Text>

          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
          </View>

          {/* Password */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />
          </View>

          {/* Error Message */}
          {error ? (
            <View style={styles.alertError}>
              <Text style={styles.alertText}>{error}</Text>
            </View>
          ) : null}

          {/* Success Message */}
          {success ? (
            <View style={styles.alertSuccess}>
              <Text style={styles.alertText}>{success}</Text>
              <ActivityIndicator style={{ marginTop: 5 }} />
            </View>
          ) : null}

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {mode === 'login' ? 'Login' : 'Register'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Switch Mode */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
                setSuccess('');
              }}
            >
              <Text style={styles.switchMode}>
                {mode === 'login' ? 'Register' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginRegisterScreen;
