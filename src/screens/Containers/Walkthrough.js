
import { log } from 'console';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native';
const Walkthrough = ({ navigation }) => {

    const onNextbtnClick = () => {
        console.log(' aaya ');
        navigation.navigate('Login')
        
    }
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://media.istockphoto.com/id/870888234/vector/shield-icon.jpg?s=612x612&w=0&k=20&c=5YgNMBErAGcMDFe4WKYGyhXb_WgzRPwPUzFmUpS6HlM=' }}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={{fontSize: 20 ,margin:10 , fontWeight: '800' , color:'#000'}}>Manage all your warranties in a single place</Text>
       
         
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onNextbtnClick} >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            </View>

    );
};

const styles = StyleSheet.create({
    button: {

        backgroundColor: 'black', // Black background
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40, // Margin from the bottom
        right: 30,  // Margin from the right
    },
    buttonText: {
        color: 'white', // White text
        fontSize: 16,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // You can customize the background color
    },
    logo: {
        width: 200, // Adjust the width as needed
        height: 150, // Adjust the height as needed
    },
});

// export default WalkthroughScreen;

export default Walkthrough;
