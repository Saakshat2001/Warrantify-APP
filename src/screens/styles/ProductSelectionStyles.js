
import { StyleSheet } from 'react-native';
import {  Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 30;

const ProductSelectionStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
    },
    titleBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#ffffff',
    },
    titleProductInfo: {
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      //textAlign: 'center',
      marginLeft: 17,
      marginVertical: 10,
    },
    flatListContainer: {
      paddingBottom: 20,
      paddingHorizontal: 10,
    },
    card: {
      width: cardWidth,
      height: cardWidth+20 , // Increase height for text below image
      backgroundColor: '#ffffff',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      padding: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    card1: {
      width: cardWidth-30,
      height: cardWidth-70 , // Increase height for text below image
      backgroundColor: '#ffffff',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      padding: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    image: {
      width: '100%',
      height: '50%',
      resizeMode: 'contain',
    },
    cardText: {
      fontSize: 18,
      color: '#007BFF',
      marginTop: 15,
      textAlign: 'center',
    },
    cardText1: {
      fontSize: 18,
      color: '#007BFF',
      fontWeight: '700',
      textAlign: 'center',
    },
  });

  export default ProductSelectionStyles;