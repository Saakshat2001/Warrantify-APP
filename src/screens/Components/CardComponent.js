import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing from react-native-vector-icons
import normalize from 'react-native-normalize';
import { ScrollView } from 'react-native-gesture-handler';
const WarrantyCard = (cardArray) => {

    console.log('aaya>>>>>>>>>>>>>>>> ');
    
    const [modalVisible, setModalVisible] = useState(false);
       console.log('props are ++++++++++++++++++ ' ,cardArray);
       
    return (

        <View style={styles.card}>
            <View style={styles.leftContainer}>
                <Image 
                    source={require('../Images/WatchImage.png')} // Replace with your logo path
                    style={styles.logo}
                />
                <Text style={styles.label}>Purchase Date:</Text>
                <Text style={styles.boldText}>{cardArray.cardArray.purchaseDate}</Text>
                <Text style={styles.label}>Warranty Up To:</Text>
                <Text style={styles.boldText}>{cardArray.cardArray.warrantyEndDate}</Text>
            </View>
            <View style={styles.borderLine} />
            <View style={styles.rightContainer}>
                 <View style={styles.iconContainer}>
                     <Text style={styles.watchTitle}>{cardArray.cardArray.product}</Text>
                     <TouchableOpacity style={styles.editIcon}>
                         <Icon name="create-outline" size={25} color="black" />
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.deleteIcon}>
                         <Icon name="trash-outline" size={25} color="black" />
                     </TouchableOpacity>
                 </View>
                 <TouchableOpacity
                     style={styles.supportButton}
                     onPress={() => setModalVisible(true)}
                 >
                     <Text style={styles.buttonText}>Support</Text>
                     <Icon name="arrow-down" size={16} color="white" />
                 </TouchableOpacity>
             </View>

             {/* Modal */}
             <Modal
                 animationType="slide"
                 transparent={true}
                 visible={modalVisible}
                 onRequestClose={() => setModalVisible(false)}
             >
             <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                     <View style={styles.modalContainer}>
                         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                             <View style={styles.modalContent}>
                                 <Text style={styles.modalText}>Support Information</Text>
                                 <TouchableOpacity onPress={() => setModalVisible(false)}>
                                 <Text style={styles.closeButton}>Close</Text>
                                 </TouchableOpacity>
                             </View>
                         </TouchableWithoutFeedback>
                     </View>
                 </TouchableWithoutFeedback>
             </Modal>
         </View>
     );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 3, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        margin: 20,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        width: 80,
    },
    logo: {
        width: 100, // Increased size
        height: 110, // Increased size
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    boldText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    borderLine: {
        width: 1,
        backgroundColor: '#ccc',
        marginLeft: normalize(-65),
        marginRight: 10,
    },
    rightContainer: {
        justifyContent: 'space-between', // Adjusted for layout
        alignItems: 'flex-start',
        flex: 1,
    },
    watchTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
        marginLeft: 5,
        flex: 1, // Allow to take available space
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    editIcon: {
        marginLeft: 10,
    },
    deleteIcon: {
        marginLeft: 10,
    },
    supportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'darkblue', // Changed to dark blue
        padding: 10,
        borderRadius: 5,
        position: 'absolute', // Positioning it at the bottom right
        bottom: 10,
        right: 5,
    },
    buttonText: {
        color: 'white',
        marginRight: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: '50%', 
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        
    },
    closeButton: {
        fontSize: 16,
        color: 'blue',
    },
});

export default WarrantyCard;
