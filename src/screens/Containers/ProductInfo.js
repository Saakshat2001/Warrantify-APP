
import React from 'react';
import { View, Text, TextInput,TouchableOpacity,KeyboardAvoidingView, StyleSheet ,Platform, Dimensions , Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './MainDashboardStyles';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {ApiEndpoints}  from '@/Globals/ApiEndpoints';
import ProductSelectionScreen from './ProductSelectionScreen';
import {navigation} from 'react'
const ProductInfo = ({ navigation , route}) => {

  const {currentUser} = useSelector(state => state.user);
  const [formData , setFormData] = useState();

   // console.log('currentUser _--------->>>>>>> ' ,currentUser );
    const handleArrow = () => {
        console.log('in handle gear _--------->>>>>>> ');
        navigation.goBack();
    }

    const handleSavePress = async () => {

     // navigation.navigate('ProductSelectionScreen')
           // console.log('route params are' , route.params);

            // {
            //   "product":"watch",
            //   "brand": "df",
            //   "modelNumber": "sdsaf",
            //   "comments": "dfsd",
            //   "dealer": "sdfd",
            //   "dealerContactNumber": "dsf",
            //   "purchaseDate": "sdf",
            //   "warrantyEndDate": "sdf",
            //   "userId":"66668a8a4d337f19ee48644a"
            // }

                     let obj = formData;
                     obj.userId = currentUser._id
                    obj={...route.params , ...obj}
                     setFormData(obj)
                    console.log('formData bolte =============================== ' , formData);
                    
                    try {
              console.log('aaya ',`${ApiEndpoints.saveProductInfo}`);
              
                      const res = await fetch(`${ApiEndpoints.saveProductInfo}`, {
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
                        // dispatch(signInSuccess(data));
                      //  await AsyncStorage.setItem('isLoggedIn', 'true');        
                        navigation.navigate("MainDashboard");
                      }
                    } catch (error) {
                      console.log('here in catch');
                      
                      setErrorMessage(error.message);
                      // setLoading(false);
                      // dispatch(signInFailure(data.message));
                    }
    }

  return (

    
    <View style={styles.container}>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <TouchableOpacity  style={{marginLeft: 5}} onPress={handleArrow} >
          <Icon name="arrow-left"  size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleProductInfo}>Other Information</Text>
      </View>
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        extraScrollHeight={20} 
       >

      <View style={styles.productInfoContent}>
        <Text style={{fontWeight:'bold', color:'#000' , marginBottom: 20}}>Fill in the details or skip to proceed.</Text>
     
       <View style={{marginTop: 0}}>
        <Text style={styles.label}>Model Number</Text>
        <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="gray" onChangeText={(e) => { 
          setFormData({...formData, modelNumber:e})}}/>
        </View>
       <View style={{marginTop: 25}}>
        <Text style={styles.label}>Comments</Text>
        <TextInput style={styles.input} placeholder="Type here..."
        placeholderTextColor="gray"  
        onChangeText={(e) => { 
          setFormData({...formData, comments:e})}}/>
        </View>
       <View style={{marginTop: 25}}>
        <Text style={styles.label}>Dealer's Name</Text>
        <TextInput style={styles.input} placeholder="Type here..."
          placeholderTextColor="gray"  
        onChangeText={(e) => { 
          setFormData({...formData, dealer:e})}}/>
        </View>
       <View style={{marginTop: 25}}>
        <Text style={styles.label}>Dealer's Contact</Text>
        <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="gray" onChangeText={(e) => { 
          setFormData({...formData, dealerContactNumber:e})}}/>
        </View>
     
        <View>
            <View style = {{ flex: 1, justifyContent: 'center',alignItems: 'center' , marginTop:15 }}>
        <TouchableOpacity style={styles.saveButton} onPress={() => handleSavePress()}>
        <Text style={{color:'#fff' , fontWeight: 'bold' , fontSize:20}}>Save</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
      </KeyboardAwareScrollView>
    </View>

  );
};


export default ProductInfo;
