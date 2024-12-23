import { View, Text, TouchableOpacity, StyleSheet ,Platform, Dimensions , Image, Button } from 'react-native';
import normalize from 'react-native-normalize';
const { height, width } = Dimensions.get('window');
const isIphone15OrLater = Platform.OS === 'ios' && height >= 844; // 844 is the height of iPhone 13 Pro, 14, and 15

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E0E0E0',
  
      // paddingTop: isIphone15OrLater?50:20
    },
    titleBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: isIphone15OrLater ? 60 : 20, 
      paddingBottom: 10,
      backgroundColor: '#ffffff',
      paddingHorizontal: 15,
      position: 'relative', // Set to relative
    },
    image1:{
      width: '60%', 
      height: '40%', 
    },
     gearButton: {
      position: 'absolute', // Use absolute positioning
      right: 20, // Adjust this value for horizontal positioning
      top: Platform.OS === 'ios'?63:25, // Adjust this value for vertical positioning if needed
     },
     arrowButton: {
        position: 'absolute', // Use absolute positioning
        left: 20, // Adjust this value for horizontal positioning
        top: 63, // Adjust this value for vertical positioning if needed
       },
    title: {
      fontSize: 25, 
      color: '#000000',
      fontWeight: '600',
      textAlign: 'center', // Center the text
      flex: 1, // Allow the title to take up space
    },
    titleProductInfo: {
      // position:'absolute',
      //  top: 58,
      //  left: 35,
        color:'#000',
        fontSize: 25, 
        color: '#000000',
        marginLeft:20,
        fontWeight: '600',
        //fontWeight: 'bold',
        textAlign: 'flex-start', // Center the text
        flex: 1, // Allow the title to take up space
      },
    profileButton: {
      padding: 10,
      backgroundColor: '#bb86fc',
      borderRadius: 5,
    },
    buttonText: {
      color: '#ffffff',
    },
    content: {
     marginTop: normalize(130),
      justifyContent: 'center',
      alignItems: 'center',
    },
    productInfoContent: {
        marginTop: normalize(20),
         justifyContent: 'flex-start',
        marginLeft:20,
        marginRight: 20,
        color:'#000'
       },
       label: {
        position: 'absolute',
        left: 10,
        color:'#000',
        top: -10, // Adjust this value to move the label closer to the input line
        fontSize: 16,
        color:'#000',
        backgroundColor: '#E0E0E0', // Match this to the input background
        paddingHorizontal: 5, // Optional: add some padding for aesthetics
        zIndex: 1, // Ensure the label is above the input
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 20, // Adjust padding so the text doesn't collide with the label
        height: 50, // Adjust height as needed
        fontSize:20,
        borderRadius: 10,
        borderColor: '#000',
        color:'#000'
      },
    contentText: {
      fontSize: 30,
      marginHorizontal: normalize(60),
      fontWeight: '600',
      color:'#000',
    },
    subContentText:{
      marginTop: 20,
      fontSize: 18,
      marginHorizontal: normalize(30),
      color:'#000',
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#6200EE',
      padding: 10,
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 15,
      paddingVertical: 15,
      marginTop: 25
    },
    button1: {
      flexDirection: 'row',
      backgroundColor: '#6200EE',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      paddingHorizontal: 15,
      paddingVertical: 13,
      marginTop: 10,
      marginBottom: 0
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#6200EE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        marginTop: 5,
        width: 150,
        height: 50
      },
      footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingBottom: 15,
        zIndex: 1, // Control stacking order
    },
    flatListContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      padding: 10,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      width: '40%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    image: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      marginBottom: 10,
    },
    cardText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#007BFF', // Blue color text for "Air Conditioner"
      textAlign: 'center',
    },
  });
  export default styles;