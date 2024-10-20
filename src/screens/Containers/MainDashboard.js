
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

const MainDashboard = ({ navigation }) => {

  const [loader , setLoader] = useState(true);
  const [cardInfo , setCardInfo] = useState([]);
  const {currentUser} = useSelector(state => state.user);
  const [formData , setFormData] = useState();
  const isFocused = useIsFocused();

    const handleGear = () => {
 
    }

      const renderCards = (cardInfo) => {

        console.log('in handle gear _--------->>>>>>> ');
       return cardInfo.map(element => (
        console.log(element , 'elem ') , 
        
           <WarrantyCard cardArray = {element}/>
       ));
       
      }

    useEffect(() => {

     const fetchProduct = async () => {
     try {
      console.log('isme <><><><><>><><> ',currentUser._id);
      const userId ={userId: currentUser._id}
      const res = await fetch(`http://192.168.8.242:3000/api/product/findproduct/${currentUser._id}`);
      const data = await res.json();
      setLoader(false);
      if (data.status === 404) {
       Alert(data.message);
       // return dispatch(signInFailure(data.message));
      }
      if (data.length > 0 ) {
        setCardInfo(data);
      }
    } catch (error) {
      console.log('here in catch');
    }
   
  }
        fetchProduct()
    } , [isFocused])

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
        style={styles.image}
        />
        <Text style={styles.contentText}>You have not added any Warranty Cards.</Text>
        <Text style={styles.subContentText}>Start adding your warranty cards/invoice/bill</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductInfo')}>
        <Icon name="plus" size={20} color="#FFFFFF" />
        <Text style={{marginLeft: 20,color:'#fff' , fontWeight: '600' , fontSize:20}}>Add Warranty Card/Bill/Invoice</Text>
        </TouchableOpacity>
      </View>):
    <>
     <ScrollView>
            <View>
                {renderCards(cardInfo)}
            </View>
        </ScrollView>
         <View style={styles.footer}>
         <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('ProductInfo')}>
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
