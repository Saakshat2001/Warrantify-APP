import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView , Alert} from 'react-native';
import styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from 'react-redux';
import { ApiEndpoints } from '@/Globals/ApiEndpoints';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  

  const navigateToSignUp = () => {
    // Handle login logic
    console.log('Logging in with:', email, password);
    navigation.navigate('SignUp')
  };

  const handleLogin = async (e) => {
    e.preventDefault();
     
    let temp = email.slice(1);
    // console.log(email.slice(1), ' char at 0 ');
     let tempEmail = email.charAt(0).toLowerCase()+temp;
    // setEmail(tempEmail);
     console.log('email is ' ,tempEmail);
     
    const obj = { email:tempEmail , password };
    if (!obj.email || !obj.password) {
       return setErrorMessage("Please fill out all fields.");
      // dispatch(signInFailure("Please fill out all fields."));
    }
    try {
      // setLoading(true);
       setErrorMessage('');
       console.log('obj ++++++++++++++++ ',obj);
       //10.0.2.2:3000
      // dispatch(signInStart());
      const res = await fetch(`${ApiEndpoints.signInApi}` , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      const data = await res.json();
      console.log('data is ............' , data);
      
      if (data.status === 404) {
        return setErrorMessage(data.message);
        // return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        // dispatch(signInSuccess(data));
        dispatch(signInSuccess(data));
        await AsyncStorage.setItem('isLoggedIn', 'true');        
        navigation.navigate("MainDashboard");
      }
    } catch (error) {
      console.log('here in catch of Login js' , error);
      
      setErrorMessage(error.message);
      // setLoading(false);
      // dispatch(signInFailure(data.message));
    }
  }

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
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5087/5087607.png' }} // Replace with your logo URL
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back!</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'flex-start', width: '100%' }}>
      <Text style={styles.footerText}>
        Don't have an account? <Text style={styles.linkText}  onPress={navigateToSignUp}>Sign Up</Text>
      </Text>
      </View>
    </ScrollView>
  );
};


export default Login;
