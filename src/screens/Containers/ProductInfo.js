
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
import { log } from 'console';
const ProductInfo = ({ navigation , route}) => {

  const {currentUser} = useSelector(state => state.user);
  const [formData , setFormData] = useState();


   // console.log('currentUser _--------->>>>>>> ' ,currentUser );
    const handleArrow = () => {
        console.log('in handle gear _--------->>>>>>> ');
        navigation.goBack();
    }

    const handleSavePress = async () => {

                     let obj = formData;
                     if(!route.params.editCard)
                     obj.userId = currentUser._id
                    const {editCard , cardId , ...newObj} = route.params;
              
                    
                    obj={...newObj , ...obj}
                    console.log(' obj are ', obj);
                     setFormData(obj)
                     console.log('in product info ********************************************** ' ,`http://localhost:3000/api/product/editCard/${route.params.cardId}`);
                    
                    try {
            //  console.log('aaya ',`${ApiEndpoints.saveProductInfo}`);
              let res = '';
                     if(route.params.editCard){
                      console.log('aaya ');
                      
                       res = await fetch(`http://192.168.10.47:3000/api/product/editCard/${route.params.cardId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(obj),
                      });
                     }
                     else{
                       res = await fetch(`${ApiEndpoints.saveProductInfo}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(obj),
                      });
                    }
                    console.log(res , '---------------------');
                    
                      const data = await res.json();
                      console.log('data is ............' , data);
                      
                      if (data.status === 404) {
                        return setErrorMessage(data.message);
                        // return dispatch(signInFailure(data.message));
                      }
                
                      if (res.status == 200) {
                        // dispatch(signInSuccess(data));
                        // dispatch(signInSuccess(data));
                      //  await AsyncStorage.setItem('isLoggedIn', 'true');        
                        navigation.navigate("MainDashboard");
                      }
                    } catch (error) {
                      console.log('here in catch' , error);
                      
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
