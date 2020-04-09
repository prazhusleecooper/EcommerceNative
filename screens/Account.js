import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Modal,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SyncStorage from 'sync-storage';

let jwtDecode = require('jwt-decode');

class Account extends Component {
    constructor(props) {
        super(props);
        this.auth();
    }

    // Non-Rendering Methods
    // Authentication method
    auth = () => {
        let tokenFromStorage = SyncStorage.get('TOKEN');
        console.log('TOKEN FROM STORAGE:::::::::', tokenFromStorage);
        if(
            tokenFromStorage === undefined
        ) {
            this.props.navigation.navigate('SignIn');
        }
    };


    // Rendering Method
    // Method to render User Email addredd
    userEmail = () => {
        let decodedToken = jwtDecode(SyncStorage.get('TOKEN'));
        return(decodedToken.email);
    };

    // Method to handle the User Sign-out
    userSignOut = () => {
        SyncStorage.remove('TOKEN');
        this.props.navigation.navigate('SignIn');
    };

    render() {
        return(
            <SafeAreaView style={styles.primaryContainer}>
                <Icon
                    name='user-circle'
                    size={ 100 }
                    color={ variables.primaryYellow }
                    onPress={ () => this.toggleModal() }
                />
                <Text style={styles.infoText}>
                    Signed in as
                </Text>
                <Text style={styles.emailText}>
                    {/*prashanth5454@gmail.com*/}
                    {this.userEmail()}
                </Text>
                <Button
                    mode="contained"
                    style={styles.signOutButton}
                    color={variables.primaryYellow}
                    dark={true}
                    onPress={() => this.userSignOut()}
                >
                    Sign out
                </Button>
            </SafeAreaView>
        );
    }
}

const variables = {
    primaryYellow: 'rgb(229, 183, 0)',
    primaryYellowOpacity: 'rgba(229, 183, 0, 0.8)',
    primaryYellowDark: '#b38f00',
    primaryLight: '#fff',
    primaryDark: '#000000',
};


const styles = StyleSheet.create({
    primaryContainer: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 35,
        paddingBottom: 100,
        backgroundColor: variables.primaryLight,
    },
    infoText: {
        // marginTop: 75,
        marginBottom: 15,
        fontSize: 20,
        color: variables.primaryDark,
        fontWeight: 'normal',
    },
    emailText: {
        // marginTop: 75,
        marginBottom: 15,
        fontSize: 25,
        color: variables.primaryYellow,
        fontWeight: 'bold',
    },
    signOutButton: {
        width: '100%'
    },
});


export default Account;
