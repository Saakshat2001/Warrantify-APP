import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet , Dimensions ,PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import styles from './MainDashboardStyles';
import  ProductSelectionStyles  from '../styles/ProductSelectionStyles';
import PurchaseDateScreen from './PurchaseDateScreen';
import ProductInfo from './ProductInfo';

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
//const itemWidth = screenWidth / numColumns - 23;
const cardMargin = 10;
const itemWidth = (screenWidth - (7 + 1) * cardMargin) / numColumns;

const WarrantyPeriodScreen = ({ navigation ,route}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState();
//const [productData , setProductData] = useState()
  const handleArrow = () => {
    navigation.goBack();
  };
console.log('prod name' , route.params);

  const productData = [
    { id: '1', name: '1 months' },
    { id: '2', name: '2 months' },
    { id: '3', name: '3 months' },
    { id: '4', name: '6 months' },
    { id: '5', name: '1 Year' },
    { id: '6', name: '18 months' },
    { id: '7', name: '2 Years' },
    { id: '8', name: '30 Months' },
    { id: '9', name: '3 Years' },
    { id: '10', name: '4 years' },
    { id: '11', name: '5 years' },
    { id: '12', name: '6 years' },
    { id: '13', name: '7 years' },
    { id: '14', name: '8 years' },
    { id: '15', name: '9 years' },
    { id: '16', name: '10 years' }
  ];

  const handleContinuePress = () => {
    console.log('aa rha');
    navigation.navigate('ProductInfo')
  }

  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[ProductSelectionStyles.card2 , {width: itemWidth}]} onPress={() => handleCardPress(item)}>
      <Text style={ProductSelectionStyles.cardText1}>{item.name}</Text>
    </TouchableOpacity>
  );

  const addDurationToDate = (startDate, duration) => {
    // Parse the start date (convert from DD-MM-YYYY to a Date object)
    const [day, month, year] = startDate.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
  
    // Determine the duration to add
    if (duration.includes('months') || duration.includes('Months')) {
      const monthsToAdd = parseInt(duration.split(' ')[0], 10); // e.g., "6 months" -> 6
      date.setMonth(date.getMonth() + monthsToAdd);
    } else if (duration.includes('Year') || duration.includes('years') || duration.includes('Years')) {
      const yearsToAdd = parseInt(duration.split(' ')[0], 10) || 1; // Default to 1 year
      date.setFullYear(date.getFullYear() + yearsToAdd);
    }
  
    // Format the result back to DD-MM-YYYY
    const formattedDay = String(date.getDate()).padStart(2, '0');
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const formattedYear = date.getFullYear();
  
    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  };

  const handleCardPress = (item) => {
    console.log('Warranty period:', item.name);
    let warrantyEndDate  = addDurationToDate(route.params.purchaseDate , item.name);
    console.log('warrantyEndDatee +================ ' , warrantyEndDate);
    
    navigation.navigate('ProductInfo', {
        // productId: item.id,
        product: route.params.productName,
        brand: route.params.brandName,
        purchaseDate: route.params.purchaseDate,
        warrantyEndDate: warrantyEndDate
      });

  };
// let t = ``
  return (
    <View style={ProductSelectionStyles.container}>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <TouchableOpacity  style={{marginLeft: 5}} onPress={handleArrow} >
          <Icon name="arrow-left"  size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleProductInfo}>Select Warranty Period</Text>
      </View>

      <Text style={{fontSize: 18 , marginLeft: 17, marginTop: 10,fontWeight:'600' , marginBottom:10}}>Select your <Text style={{ color: '#0033A0' , fontWeight: 'bold' }}>{route.params.brandName} {route.params.productName}</Text> warranty period</Text>
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={ProductSelectionStyles.flatListContainer}
      />
       <View style = {{  justifyContent: 'center',alignItems: 'center' , marginBottom:80 }}>
        <TouchableOpacity style={[styles.saveButton , {backgroundColor: '#0033A0'}  ]} onPress={() => handleContinuePress()} >
        <Text style={{color:'#fff' , fontWeight: 'bold' , fontSize:20}}>Continue</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};


export default WarrantyPeriodScreen;
