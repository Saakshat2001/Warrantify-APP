import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet , Dimensions ,PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import styles from './MainDashboardStyles';
import  ProductSelectionStyles  from '../styles/ProductSelectionStyles';
import PurchaseDateScreen from './PurchaseDateScreen';

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
//const itemWidth = screenWidth / numColumns - 23;
const cardMargin = 10;
const itemWidth = (screenWidth - (7 + 1) * cardMargin) / numColumns;

const BrandSelection = ({ navigation ,route}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState();
const [productData , setProductData] = useState()
  const handleArrow = () => {
    navigation.goBack();
  };
console.log('prod name' , route.params.productName);

  const acProductData = [
    { id: '1', name: 'Blue Star' },
    { id: '2', name: 'BPL' },
    { id: '3', name: 'Carrier' },
    { id: '4', name: 'Croma' },
    { id: '5', name: 'Cruise' },
    { id: '6', name: 'Daikin' },
    { id: '7', name: 'Electrolux' },
    { id: '8', name: 'Godrej' },
    { id: '9', name: 'Gree' },
    { id: '10', name: 'Haier' },
    { id: '11', name: 'Hisense' },
    { id: '12', name: 'Hyundai' },
    { id: '13', name: 'IFB' },
    { id: '14', name: 'Impex' },
    { id: '15', name: 'Intex' },
    { id: '16', name: 'Kelvinator' },
    { id: '17', name: 'LG' },
    { id: '18', name: 'Livpure' },
    { id: '19', name: 'Lloyd' },
    { id: '20', name: 'MarQ by Flipkart' },
    { id: '21', name: 'Micromax' },
    { id: '22', name: 'Midea' },
    { id: '23', name: 'Mitsubhishi' },
    { id: '24', name: 'Motorola' },
    { id: '25', name: 'Onida' },
    { id: '26', name: 'Panasonic' },
    { id: '27', name: 'Samsung' },
    { id: '28', name: 'Voltas' },
    { id: '29', name: 'Whirlpool' },
    { id: '30', name: 'Toshiba' },
    { id: '31', name: 'Sansui' },
    // { id: '2', name: 'Watch', image: require('./assets/watch.png') },
    // { id: '3', name: 'Battery', image: require('./assets/battery.png') },
    // { id: '4', name: 'Laptop', image: require('./assets/laptop.png') },
    // { id: '5', name: 'TV', image: require('./assets/tv.png') },
    // { id: '6', name: 'Kitchen Appliances', image: require('./assets/kitchen_appliances.png') },
  ];
  const watchProductData = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'boAt' },
    { id: '3', name: 'Casio' },
    { id: '4', name: 'CITIZEN' },
    { id: '5', name: 'Daniel Klein' },
    { id: '6', name: 'Daniel Wellington'},
    { id: '7', name: 'Fastrack' },
    { id: '8', name: 'Fossil' },
    { id: '9', name: 'Maxima' },
    { id: '10', name: 'OMEGA' },
    { id: '11', name: 'Rado' },
    { id: '12', name: 'Sonata' },
    { id: '13', name: 'Timex' },
    { id: '14', name: 'Titan' },
    { id: '15', name: 'Other' },
  ];
  const batteryProductData = [
    { id: '1', name: 'Amaron' },
    { id: '2', name: 'Bosch' },
    { id: '3', name: 'Eveready' },
    { id: '4', name: 'Exide' },
    { id: '5', name: 'Goldstar' },
    { id: '6', name: 'HBL'},
    { id: '7', name: 'Indo' },
    { id: '8', name: 'Livguard' },
    { id: '9', name: 'Loom' },
    { id: '10', name: 'Luminous' },
    { id: '11', name: 'Microtek' },
    { id: '12', name: 'OKAYA' },
    { id: '13', name: 'Panasonic' },
    { id: '14', name: 'Su-Kam' },
    { id: '15', name: 'Tata' },
  ];
  const laptopProductData = [
    { id: '1', name: 'Acer' },
    { id: '2', name: 'AGB' },
    { id: '3', name: 'Apple' },
    { id: '4', name: 'Asus' },
    { id: '5', name: 'Avita' },
    { id: '6', name: 'Lenovo'},
    { id: '7', name: 'HP' },
    { id: '8', name: 'Lava' },
    { id: '9', name: 'LG' },
    { id: '10', name: 'Microsoft' },
    { id: '11', name: 'Redmi' },
    { id: '12', name: 'Sony' },
  ];
  const tvProductData = [
    { id: '1', name: 'Samsung' },
    { id: '2', name: 'Sony' },
    { id: '3', name: 'One Plus' },
    { id: '4', name: 'Onida' },
    { id: '5', name: 'Panasonic' },
    { id: '6', name: 'LG'},
  ];

  useEffect(() => {
  if (route.params.productName === 'Battery')
    setProductData(batteryProductData)
 else if(route.params.productName === 'TV')
    setProductData(tvProductData)
 else if(route.params.productName === 'Laptop')
    setProductData(laptopProductData)
 else if(route.params.productName === 'Watch')
    setProductData(watchProductData)
 else 
    setProductData(acProductData)
  },[])
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[ProductSelectionStyles.card1 , {width: itemWidth}]} onPress={() => handleCardPress(item)}>
      <Text style={ProductSelectionStyles.cardText1}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleCardPress = (item) => {
    console.log('Selected Brand:', item.name);
    navigation.navigate('PurchaseDateScreen', {
        // productId: item.id,
        productName: route.params.productName,
        brandName: item.name,
      });
    // You can navigate or perform any action here
    // Example: navigation.navigate('ProductDetails', { product: item });
  };
// let t = ``
  return (
    <View style={ProductSelectionStyles.container}>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <TouchableOpacity  style={{marginLeft: 5}} onPress={handleArrow} >
          <Icon name="arrow-left"  size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleProductInfo}>Select Brand</Text>
      </View>

      {/* Subtitle */}
      <Text style={{fontSize: 18 , marginLeft: 17, marginTop: 10 , marginBottom:10}}>Choose your <Text style={{ color: '#0033A0' , fontWeight: 'bold' }}>{route.params.productName}</Text> brand</Text>

      {/* Product List */}

      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={ProductSelectionStyles.flatListContainer}
      />
    </View>
  );
};


export default BrandSelection;
