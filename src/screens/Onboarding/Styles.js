import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      padding: 20,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#ffffff',
      borderRadius: 5,
      paddingHorizontal: 15,
      marginBottom: 15,
      borderColor: '#ddd',
      borderWidth: 1,
      color: '#000',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    footerText: {
      marginTop: 10,
      color: '#555',
      textAlign: 'left' 
    },
    linkText: {
      color: '#4CAF50',
      fontWeight: 'bold',
    },
    buttonDisabled: {
      backgroundColor: '#A9A9A9', // Change button color when disabled
    },
  });
  
  export default styles;