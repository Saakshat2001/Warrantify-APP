import React , {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button,FlatList } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation} from '@react-navigation/native';
import Login from '../Onboarding/Login';
import Icon from 'react-native-vector-icons/FontAwesome';
const Account = ({ navigation }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const {currentUser} = useSelector(state => state.user);
     //const navigation = useNavigation();
    const ar = currentUser.name.split(' ');
    console.log('current user is -------->>>>>>>>>>>. ', ar[0],ar[1]);
    let Intials = ar[0].substring(0,1).toUpperCase()
    if(ar[1]?.substring(0,1)?.toUpperCase() !== undefined){
        Intials += ar[1].substring(0,1).toUpperCase()
    }
    const accountOwner = {
        initials: Intials, // Account owner's initials
        fullName: currentUser?.name || 'TestUser', // Account owner's full name
    };

    const options = [
        { id: '1', title: 'About Us', icon: 'info-circle' },
        { id: '2', title: 'Log Out' , icon: 'sign-out' },
    ];

    const handleOptionPress = (option) => {
        if (option === 'Log Out') {
            // Handle log out logic here
            setModalVisible(true);
          
        } else {
            // Handle navigation or any other logic
            console.log(option);
        } 
    };

    const handleLogout = () => {
        setModalVisible(false); // Close the modal
       // AsyncStorage.clear();
        navigation.navigate('Login')
        console.log("User logged out"); // Implement actual logout logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Account</Text>
            </View>
            <View style={styles.profileContainer}>
                <View style={styles.initialsContainer}>
                    <Text style={styles.initials}>{accountOwner.initials}</Text>
                </View>
                <Text style={styles.fullName}>{accountOwner.fullName}</Text>
            </View>
            <FlatList
                data={options}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleOptionPress(item.title)} style={styles.listItem}>
                          <View style={styles.iconTextContainer}> 
                       <Icon name={item.icon} size={20} color="#000" style={styles.icon} />
                        <Text style={styles.listItemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                style={styles.optionsList}
            />
               <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Icon name="close" size={24} color='#0072CE' />
                    </TouchableOpacity>
                    <View style={styles.modalContent}>
                   
                    <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Logout</Text>
                           
                        </View>
                            
                        <Text style={styles.modalText}>Are you sure you want to log out?</Text>

                            {/* Buttons for Cancel and Log Out */}
                        <View style={styles.buttonContainer}>
                     <Button title="Cancel" onPress={() => setModalVisible(false)} />
                         <Button title="Log Out" onPress={handleLogout} />
                                </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop:50
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    initialsContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    initials: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    fullName: {
        fontSize: 18,
        fontWeight: '600',
    },
    optionsList: {
        marginTop: 0,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10, // Space between icon and text
    },
    listItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listItemText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeButton: {
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
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        // textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default Account;
