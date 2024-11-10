import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import styles from './MainDashboardStyles';
import  ProductSelectionStyles  from '../styles/ProductSelectionStyles';
import BrandSelection from './BrandSelection';
//import navigation from 'react-native';

const ProductSelectionScreen = ({ navigation }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState();

  const handleArrow = () => {
    navigation.goBack();
  };

  const productData = [
    { id: '1', name: 'Air Conditioner', image: require('./assets/ac.png') },
    { id: '2', name: 'Watch', image: require('./assets/watch.png') },
    { id: '3', name: 'Battery', image: require('./assets/battery.png') },
    { id: '4', name: 'Laptop', image: require('./assets/laptop.png') },
    { id: '5', name: 'TV', image: require('./assets/tv.png') },
    // { id: '6', name: 'Kitchen Appliances', image: require('./assets/kitchen_appliances.png') },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={ProductSelectionStyles.card} onPress={() => handleCardPress(item)}>
      <Image source={item.image} style={ProductSelectionStyles.image} />
      <Text style={ProductSelectionStyles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleCardPress = (item) => {
    console.log('Selected Product:', item.name);
    navigation.navigate('BrandSelection', {
      // productId: item.id,
      productName: item.name,
    });
    // You can navigate or perform any action here
    // Example: navigation.navigate('ProductDetails', { product: item });
  };

  return (
    <View style={ProductSelectionStyles.container}>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <TouchableOpacity  style={{marginLeft: 5}} onPress={handleArrow} >
          <Icon name="arrow-left"  size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleProductInfo}>Select Product</Text>
      </View>

      {/* Subtitle */}
      <Text style={ProductSelectionStyles.title}>Which product do you have?</Text>

      {/* Product List */}
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={ProductSelectionStyles.flatListContainer}
      />
    </View>
  );
};


// const styles1 = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 10,
//   },
//   titleBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     backgroundColor: '#ffffff',
//   },
//   titleProductInfo: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   flatListContainer: {
//     paddingBottom: 20,
//     paddingHorizontal: 10,
//   },
//   card: {
//     width: cardWidth,
//     height: cardWidth , // Increase height for text below image
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 10,
//     padding: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   image: {
//     width: '100%',
//     height: '60%',
//     resizeMode: 'cover',
//   },
//   cardText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#007BFF',
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });
export default ProductSelectionScreen;
