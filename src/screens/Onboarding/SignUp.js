import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, ActivityIndicator, StyleSheet , Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // For gradient background
import { PanGestureHandler } from 'react-native-gesture-handler'; // For slider functionality
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ApiEndpoints } from '@/Globals/ApiEndpoints';


const SignUp = () => {
  const navigation = useNavigation();

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Animation states for slider
  const sliderX = useSharedValue(0);
  const sliderWidth = 300; // Total slider width
  const sliderHandleWidth = 50; // Slider handle width

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderX.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: sliderX.value + sliderHandleWidth / 2, // Progress bar width
  }));

  // Slider release logic
  const handleSliderRelease = async () => {
    //console.log('inside ----------->>>>>>>>>>>>>>>>>>>>>>>>>> ',sliderX.value , name, email,  password, '------->>>>>>>>>>>>>');
    
    if (sliderX.value > sliderWidth - sliderHandleWidth-1) {
      setIsLoading(true);

      if (name === '' || email === '' || password === '') {
        sliderX.value = withTiming(0);
        setErrorMessage("Please fill out all fields.");
        setIsLoading(false); 
        return; // Prevent further execution if validation fails
      }
      let tempEmail = email.toLowerCase()
      const obj = { email:tempEmail, name, password };
  
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
     // console.log('data ----->>>>>>>>>>>>>>>>>>>>>. ', data);
      
        if (!res.ok) {
          setIsLoading(false); 
          sliderX.value = withTiming(0);
          return setErrorMessage(data.message || "An error occurred."); // Handle errors
        }
  
        // Handle successful signup (e.g., navigate to login)
        setIsLoading(false); 
         navigation.navigate("Login");
  
      } catch (error) {
      //  console.log('error- >>>>>>>>>>>> ' , error);
        sliderX.value = withTiming(0);
        setErrorMessage(error.message);
      }

    } else {
      sliderX.value = withTiming(0); // Reset slider
    }
  };
 
  if (errorMessage) {
    Alert.alert(
      'Alert',
      errorMessage,
      [
        { text: 'OK', onPress: () => {setErrorMessage('');  sliderX.value = withTiming(0); } }, // Clear error on press
      ],
      { cancelable: false }
    );
  }

  return (
    <LinearGradient
      colors={['#000', '#000']} // Black to red gradient
      style={styles.gradientContainer} // Full-screen gradient
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Image at the top */}
        <Image
          source={require('../Images/newlogo.png')} // Replace with your image path
          style={styles.image}
        />

        {/* Welcome Text */}
        {/* <Text style={styles.welcomeText}>Welcome to Warrantify</Text> */}
      <View style={{  flexGrow: 0, justifyContent: 'stretch',alignItems: 'stretch',padding: 0 , width:300,marginTop: 20}}>
        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />


        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
        {/* Sign-Up Slider */}
        <View style={styles.sliderContainer}>
        <PanGestureHandler
                    onGestureEvent={(event) => {
                      sliderX.value = Math.min(
                        Math.max(event.nativeEvent.translationX, 0),
                        sliderWidth - sliderHandleWidth
                      );
                    }}
                    onEnded={handleSliderRelease}
                  >
                    <Animated.View style={[styles.sliderHandle, animatedStyle]}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.arrowText}>→</Text>
                      )}
                    </Animated.View>
                  </PanGestureHandler>
                  <Text style={styles.signInText}>Sign In</Text>
                        
        </View>

        {/* Login Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Moves content upwards
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 450, // Increased size
    height: 250,
    marginTop: 20,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30, // Spacing from inputs
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
  // sliderContainer: {
  //   marginTop: 30,
  //   width: 300, // Full slider width
  //   height: 50,
  //   backgroundColor: '#333', // Background for slider area
  //   borderRadius: 25,
  //   justifyContent: 'center',
  //   overflow: 'hidden', // Clip progress bar
  // },
  sliderProgress: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#FF0000', // Red progress bar
    borderRadius: 25,
  },
  // sliderHandle: {
  //   width: 60,
  //   height: 50,
  //   backgroundColor: '#FFF', // Handle color
  //   borderRadius: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   elevation: 5, // Add shadow for a floating effect
  // },
  sliderText: {
    color: '#000',
    fontWeight: 'bold',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4E4541',
    width: 300,
    borderRadius: 30
  },
  sliderHandle: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Replace with your desired color
    borderRadius: 80 / 2,
  },
  arrowText: {
    color: 'yellow',
    fontSize: 38,
    fontWeight: 'bold'
  },
  signInText: {
    marginLeft: 60, // Space between handle and text
    fontSize: 25,
    color: 'white', // Adjust text color as needed
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});

export default SignUp;
