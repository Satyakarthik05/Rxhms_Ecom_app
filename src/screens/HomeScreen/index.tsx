import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../../components/AppHeader'; // adjust path as needed

const Home = () => {
  return (
    <View style={styles.container}>
      <AppHeader title="Home" showBack={true} />
      <View style={styles.body}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
    