import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView , Alert} from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  

  const navigateToSignUp = () => {
    // Handle login logic
   // console.log('Logging in with:', email, password);
    navigation.navigate('SignUp')
  };

  const handleLogin = async (e) => {
    console.log('in henadle');
    
   // e.preventDefault();
    setIsLoading(true); 
     let tempEmail = email.toLowerCase();
     
    const obj = { email:tempEmail , password };
    if (!obj.email || !obj.password) {
        setIsLoading(false); 
       return setErrorMessage("Please fill out all fields.");
    }
    try {
      // setLoading(true);
       setErrorMessage('');
       //10.0.2.2:3000
      // dispatch(signInStart());
      const res = await fetch(`${ApiEndpoints.signInApi}` , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      const data = await res.json();
      if (data.status === 404) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        console.log('inside me ' , data);
        
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
    } finally{
      console.log('in finally -----=+++++++++++');
      setIsLoading(false); 
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
      <TouchableOpacity  style={[styles.button, isLoading && styles.buttonDisabled]} onPress={!isLoading && handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show a loading spinner
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
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
