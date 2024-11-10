import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import styles from './Styles';
import { ApiEndpoints } from '@/Globals/ApiEndpoints';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    if (name === '' || email === '' || password === '') {
      setErrorMessage("Please fill out all fields.");
      return; // Prevent further execution if validation fails
    }

    const obj = { email, name, password };

    try {
      setErrorMessage('')
      const res = await fetch(`${ApiEndpoints.signUpApi}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set the content type to JSON
        },
        body: JSON.stringify(obj), // Stringify the object
      });

      const data = await res.json();

      if (!res.ok) {
        return setErrorMessage(data.message || "An error occurred."); // Handle errors
      }

      // Handle successful signup (e.g., navigate to login)
       navigation.navigate("Login");

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Show alert if there's an error message
  if (errorMessage) {
    Alert.alert(
      'Alert',
      errorMessage,
      [
        { text: 'OK', onPress: () => setErrorMessage('') }, // Clear error on press
      ],
      { cancelable: false }
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry  
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'flex-start', width: '100%' }}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>Login</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;

