
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Platform, Dimensions , Image, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WarrantyCard from '../Components/CardComponent';
import Loader from '../Components/Loader';
import { useState } from 'react';
import styles from './MainDashboardStyles';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import Account from './Account';
import { useNavigation } from '@react-navigation/native';
import {ApiEndpoints} from '../../../src/Globals/ApiEndpoints'
import ProductSelectionScreen from './ProductSelectionScreen';
const MainDashboard = ({ navigation }) => {

  const [loader , setLoader] = useState(true);
  const [cardInfo , setCardInfo] = useState([]);
  const {currentUser} = useSelector(state => state?.user);
  const [formData , setFormData] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isHandleDeleteCalled , setIsHandleDeleteCalled] = useState(false);
  const isFocused = useIsFocused();
 const navigationn = useNavigation();

    const handleGear = () => {
   console.log('in handle gear------>>>... ');
   navigationn.navigate('Account')
    }

      const renderCards = (cardInfo) => {

        console.log('in handle gear _--------->>>>>>> ');
       return cardInfo.map(element => {
        console.log('in handle gear _--------->>>>>>> ' , element.product);
        if(element.product === 'Air Conditioner')
          element.imageUrl = require('./assets/ac.png');
        else if(element.product === 'Battery')
          element.imageUrl = require('./assets/battery.png');
        else if(element.product === 'Watch')
          element.imageUrl =  require('./assets/watch.png');
        else if(element.product === 'Laptop')
          element.imageUrl =  require('./assets/laptop.png');
        else if(element.product === 'Tv')
          element.imageUrl =  require('./assets/tv.png');
        else {
          element.imageUrl =  require('./assets/tv.png');
        }
          return <WarrantyCard cardArray = {element} onEditPress={() => handleEditPress(element)} onDelete={() => handleDeleteCard(element)} />
      });
       
      }
     
      const handleEditPress = async(element) => {
        console.log('element ------------ ',element );
        navigation.navigate('ProductSelectionScreen' , {
            modifyElement : element
        })
      }
      const handleDeleteCard = async(element) => {
     
        console.log('in card array props _=>>>>>,,,,,.>>>>>>>>>>>'  , `${ApiEndpoints.deleteCard}/${element._id}`);

      //  const userId ={userId: currentUser?._id}
      try{
        const res = await fetch(`${ApiEndpoints.deleteCard}/${element._id}`,
            { method: 'DELETE'}
        );
        console.log('res ------_>>>>>>>>> ' , res);
       // setDeleteModalVisible(false);
        if (res.ok) {
        const data = await res.json();
        setIsHandleDeleteCalled(true);
        console.log('sab theek');
        }
        if (res.status === 404) {
         Alert.alert(data.message);
         // return dispatch(signInFailure(data.message));
        }
        console.log('res  ' , res);
       
      } catch (error) {
        console.log('here in catch of Main Dashboard' , error);
      }
       // AsyncStorage.clear();
        // navigation.navigate('Login')
        // console.log("User logged out"); // Implement actual logout logic here
    };
  
    useEffect(() => {

     const fetchProduct = async () => {
     try {
      console.log('isme <><><><><>><><> ',currentUser?._id);
      const userId ={userId: currentUser?._id}
      const res = await fetch(`${ApiEndpoints.fetchProductByUser}/${currentUser._id}`);
      const data = await res.json();
      
      if (data.status === 404) {
       Alert.alert(data.message);
       // return dispatch(signInFailure(data.message));
      }
      console.log('data ' , data.length);
   
      if (data.length > 0 ) {
        setCardInfo(data);
      }
      else{
        setCardInfo(data);
      }
      setLoader(false);
    } catch (error) {
      console.log('here in catch of Main Dashboard' , error);
    }
   setIsHandleDeleteCalled(false);
  }
        fetchProduct()
    } , [isFocused , isHandleDeleteCalled])

  return (
    <View style={styles.container}>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <Text style={styles.title}>Warranty Cards</Text>
     
        <TouchableOpacity  style={styles.gearButton} onPress={handleGear}>
          <Icon name="cog"  size={25} color="#6200EE" />
        </TouchableOpacity>
     
      </View>
      
      {loader?<Loader />:null}
      {/* Main Content */}
      {!loader && (cardInfo.length===0 ? (<View style={styles.content}>
        <Image source={{uri: 'https://t4.ftcdn.net/jpg/00/72/70/77/360_F_72707719_hltmyPNrFAqEOqEIJRVTsBWQqR9ofH5D.jpg'}} 
        resizeMode='contain'
        style={styles.image1}
        />
        <Text style={styles.contentText}>You have not added any Warranty Cards.</Text>
        <Text style={styles.subContentText}>Start adding your warranty cards/invoice/bill</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductSelectionScreen')}>
        <Icon name="plus" size={20} color="#FFFFFF" />
        <Text style={{marginLeft: 20,color:'#fff' , fontWeight: '600' , fontSize:20}}>Add Warranty Card/Bill/Invoice</Text>
        </TouchableOpacity>
      </View>):
    <>
     <ScrollView style={{marginBottom: 100}}>
            <View>
                {renderCards(cardInfo)}
            </View>
        </ScrollView>
         <View style={styles.footer}>
         <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('ProductSelectionScreen')}>
        <Icon name="plus" size={20} color="#FFFFFF" />
        <Text style={{marginLeft: 20,color:'#fff' , fontWeight: '600' , fontSize:20}}>Add Warranty Card/Bill/Invoice</Text>
        </TouchableOpacity>
     </View>
     </>
      )}
    </View>
      )
};


export default MainDashboard;
