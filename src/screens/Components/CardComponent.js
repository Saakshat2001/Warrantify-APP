import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard ,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing from react-native-vector-icons
import normalize from 'react-native-normalize';
import { ScrollView } from 'react-native-gesture-handler';
const WarrantyCard = (cardArray) => {

    console.log('aaya>>>>>>>>>>>>>>>> ',cardArray);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setDeleteModalVisible] = useState(false);
       console.log('props are ++++++++++++++++++ ' ,cardArray);
       
       const handleLogout = (e) => {
        setDeleteModalVisible(false); // Close the modal
        console.log('event is ',e);
        
       // AsyncStorage.clear();
        // navigation.navigate('Login')
        // console.log("User logged out"); // Implement actual logout logic here
    };

    const handleDeletePress = () => {
        setDeleteModalVisible(true);
    }

    return (

        <View style={styles.card}>
            <View style={styles.leftContainer}>
                <Image 
                    source={cardArray.cardArray.imageUrl} // Replace with your logo path
                    style={styles.logo}
                    resizeMode="contain"
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
                     <TouchableOpacity style={styles.deleteIcon} onPress={handleDeletePress}>
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

             <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.delteModalContainer}>
                <TouchableOpacity style={styles.deleteCloseButton} onPress={() => setDeleteModalVisible(false)}>
                        <Icon name="close" size={24} color='#0072CE' />
                    </TouchableOpacity>
                    <View style={styles.deleteModalContent}>
                   
                    <View style={styles.deleteModalHeader}>
                            <Text style={styles.deleteModalTitle}>Delete</Text>
                           
                        </View>
                            
                        <Text style={styles.delteModalText}>Are you sure you want to remove the card?</Text>

                            {/* Buttons for Cancel and Log Out */}
                        <View style={styles.buttonContainer}>
                     <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
                         <Button title="Remove" onPress={handleLogout} />
                                </View>

                    </View>
                    </View>
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
        width: 90, // Increased size
        height: 110, // Increased size
        marginBottom: 5,
        marginLeft: 5,
        mode:'contain'
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

    //----------------
    delteModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    deleteCloseButton: {
        // position: 'absolute',
        // top: '35%',
        // right: '10%',
        // zIndex: 1, // Ensures the button is above the modal content
        // padding: 10,

        position: 'absolute',
        top: '33%',
        right: '10%',
        zIndex: 1,
        backgroundColor: '#fff',  // Button background color
        width: 40,                  // Width and height set to make it a circle
        height: 40,
        borderRadius: 20,           // Half of width/height to make it a full circle
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteModalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    deleteModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    delteModalText: {
        fontSize: 20,
        marginBottom: 20,
        // textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default WarrantyCard;
