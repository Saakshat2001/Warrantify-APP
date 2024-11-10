import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import styles from './MainDashboardStyles';
import ProductSelectionStyles from '../styles/ProductSelectionStyles';

const PurchaseDateScreen = ({ navigation, route }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabled , setDisabled] = useState(true);
  const [formattedDate , setFormattedDate] = useState();

  const handleArrow = () => {
    navigation.goBack();
  };

  const handleContinuePress = () => {
            console.log('route is ---------',route);
            navigation.navigate('WarrantyPeriodScreen' , {
                productName: route.params.productName,
                brandName: route.params.brandName,
                purchaseDate: formattedDate
            })
  }

  // Disable future dates\
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); 
  const maxDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

  // Handler for date selection
  const onDateSelect = (day) => {
    console.log('day ============', day);
    setDisabled(false);
    // Extracting the date components
    const [year, month, date] = day.dateString.split('-'); // Splitting the 'YYYY-MM-DD' format
  
    // Formatting to 'DD-MM-YYYY'
    const formattedDate = `${date}-${month}-${year}`;
    setFormattedDate(formattedDate)
    setSelectedDate(day.dateString);
    console.log('Selected Date:', formattedDate);
  };

  return (
    <View style={ProductSelectionStyles.container}>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <TouchableOpacity style={{ marginLeft: 5 }} onPress={handleArrow}>
          <Icon name="arrow-left" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleProductInfo}>Select Purchase Date</Text>
      </View>

      {/* Subtitle */}
      <Text style={{ fontSize: 18, marginLeft: 17, marginTop: 10, marginBottom: 10 }}>
        Choose your{' '}
        <Text style={{ color: '#0033A0', fontWeight: 'bold' }}>{route.params.brandName}</Text> product purchase date.
      </Text>

      {/* Calendar */}
      <View style={{marginHorizontal: 17 , borderRadius: 20}}>
      <Calendar
          onDayPress={onDateSelect}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#0033A0',
              textColor: '#fff', // This ensures the text color is visible
            },
          }}
          maxDate={maxDate} // Disable dates after today
          theme={{
            arrowColor: '#0033A0',
            todayTextColor: '#0033A0',
            textMonthFontWeight: 'bold', // Makes the month name bold
            textMonthFontSize: 18,       // Adjust font size if needed
            textMonthFontFamily: 'System', // Optional, for default bold font
          }}
          style={{
            borderRadius: 10,
            elevation: 3,
          }}
        />
          <View style = {{ flex: 1, justifyContent: 'center',alignItems: 'center' , marginTop:40 }}>
        <TouchableOpacity style={[styles.saveButton ,  disabled ? { backgroundColor: '#B0B0B0' } : { backgroundColor: '#0033A0' }]} onPress={() => handleContinuePress()} disabled={disabled}>
        <Text style={{color:'#fff' , fontWeight: 'bold' , fontSize:20}}>Continue</Text>
        </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default PurchaseDateScreen;
