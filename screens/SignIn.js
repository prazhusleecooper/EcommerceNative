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

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            invalidCredentials: false,
            invalidCredentialsText: '',
        };
        this.auth();
    };

    // Setting route parameters to display success message when user is redirected from sign-up to sign-in after successful Sign-up
    signUp = this.props.route.params;


    // Non-Rendering methods
    // Method to handle the User Sign-in
    userSignIn = () => {
        let emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(this.state.email === '' || this.state.password === '') {
            this.setState({
                invalidCredentials: true,
                invalidCredentialsText: 'Credentials cannot be empty!'
            });
        } else if(!emailRegExp.test(this.state.email)) {
            this.setState({
                invalidCredentials: true,
                invalidCredentialsText: 'Email is not valid!'
            });
        } else if(emailRegExp.test(this.state.email) && this.state.password !== '') {
            this.setState({
                invalidCredentials: false,
                invalidCredentialsText: ''
            });
            console.log('VALID SIGNIN CREDENTIALS');
            let userLoginCredentials = {
                email: this.state.email,
                password: this.state.password
            };
            fetch("http://192.168.0.106:1338/userlogin",
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(userLoginCredentials),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(
                    /*
                    * LOGIN CODES:
                    *  -1: email/user does not exist
                    *   1: email and the password matches
                    *   2: email exists but the password is incorrect
                    * */
                    (result) => {
                        console.log("THE RESULT IS::", result);
                        if(result.code === -1) {
                            this.setState({
                                invalidCredentials: true,
                                invalidCredentialsText: 'The Entered Email does not exist!'
                            });
                        } else if(result.code === 1) {
                            this.setState({
                                invalidCredentials: false,
                                invalidCredentialsText: ''
                            });
                            console.log('VALID CRED');
                            // let time = Math.round((new Date()).getTime() / 1000);
                            SyncStorage.set('TOKEN', result.token)
                                .then(() => {
                                    console.log('TOKEN HAS BEEN SET IN SYNC STORAGE')
                                })
                                .catch((error) => {
                                        console.log('Error STORING TOKEN IN LOCAL STORAGE', error);
                                    }
                                );
                            SyncStorage.set('cartItems', result.cartItems)
                                .then(() => {
                                    console.log('USER CART ITEMS HAS BEEN SET IN SYNC STORAGE')
                                })
                                .catch((error) => {
                                        console.log('Error STORING USER CART ITEMS IN LOCAL STORAGE', error);
                                    }
                                );
                            // this.props.navigator.navigate('Home');
                            /*
                            *
                            *
                            *
                            *       NAVIGATE TO HOME
                            *
                            *
                            * */
                            this.props.navigation.navigate('SignedIn');
                            console.log('+++++++++++++++++++++++++++++++++++ NAVIGATING TO HOME +++++++++++++++++++++++++++++++++++');
                        } else if(result.code === 2) {
                            this.setState({
                                invalidCredentials: true,
                                invalidCredentialsText: 'The entered password is wrong'
                            });
                        }

                    },
                    (error) => {
                        console.log("THE ERROR IS::", error);
                        this.setState({
                            invalidCredentials: true,
                            invalidCredentialsText: 'Error Signing you in. Please try again later'
                        });
                    }
                );
        } else {
            this.setState({
                invalidCredentials: true,
                invalidCredentialsText: 'Error Signing you in. Please try again later'
            });
        }
    };

    // Authentication method
    auth = () => {
        let tokenFromStorage = SyncStorage.get('TOKEN');
        console.log('TOKEN FROM STORAGE:::::::::', tokenFromStorage);
        if(
            tokenFromStorage !== undefined
        ) {
            this.props.navigation.navigate('SignedIn');
        }
    };


    // Rendering methods
    // Method to render the invalid credentials text
    invalidCredentialsText = () => {
        if(this.state.invalidCredentials) {
            return(
                <Text style={ styles.invalidCredentialsText }>
                    { this.state.invalidCredentialsText }
                </Text>
            );
        }
    };

    // Method to render the Sign up successful text
    // (After the user signs-up he is redirected to sign-in with a success message)
    signUpSuccessText = () => {
        if(this.props.route.params !== undefined && this.props.route.params.signUp === 'success') {
            return(
                <Text style={ styles.signupSuccessText }>
                    Sign-up Successful! Please Sign-in to continue
                    <Icon
                        name='thumbs-up'
                        size={ 20 }
                        color='green'
                        onPress={ () => this.toggleModal() }
                    />
                </Text>
            );
        }
    };

    // Render Method
    render() {
        return(
               <SafeAreaView style={ styles.primarySection }>
                   <Text style={ styles.pageHeading }>
                        Sign In
                   </Text>
                   <SafeAreaView
                        style={ styles.yellowHR }
                   />
                   <TextInput
                       label='Email'
                       mode='outlined'
                       secureTextEntry={false}
                       value={this.state.email}
                       onChangeText={email => this.setState({email})}
                       style={styles.textInputStyle}
                       theme={{
                           colors: {
                               placeholder: variables.primaryYellowDark,
                               text: variables.primaryYellowDark,
                               primary: variables.primaryYellowDark,
                               underlineColor: 'transparent',
                               background: variables.primaryLight
                           }
                       }}
                   />
                   <TextInput
                       label='Password'
                       placeholder='Password'
                       mode='outlined'
                       secureTextEntry={true}
                       value={this.state.password}
                       onChangeText={password => this.setState({password})}
                       style={styles.textInputStyle}
                       theme={{
                           colors: {
                               placeholder: variables.primaryYellowDark,
                               text: variables.primaryYellowDark,
                               primary: variables.primaryYellowDark,
                               underlineColor: 'transparent',
                               background: variables.primaryLight
                           }
                       }}
                   />
                   <Button
                       mode="contained"
                       style={styles.signInButton}
                       color={variables.primaryYellow}
                       dark={true}
                       onPress={() => this.userSignIn()}
                   >
                       Sign in
                   </Button>
                   {this.invalidCredentialsText()}
                   {this.signUpSuccessText()}
                   <Text style={styles.bottomText}>
                       Dont have an Account? Click the button below to Sign-up!
                   </Text>
                   <Button
                       mode="text"
                       style={styles.signInButton}
                       color={variables.primaryYellow}
                       dark={true}
                       onPress={() => this.props.navigation.navigate('SignUp')}
                   >
                       Sign up
                   </Button>
               </SafeAreaView>
        );
    }
}

// Style variables
    const variables = {
        primaryYellow: 'rgb(229, 183, 0)',
        primaryYellowOpacity: 'rgba(229, 183, 0, 0.8)',
        primaryYellowDark: '#b38f00',
        primaryLight: '#fff',
        primaryDark: '#000000',
    };

// Stylesheet
const styles = StyleSheet.create({
    primarySection: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 35,
        backgroundColor: variables.primaryLight
    },
    pageHeading: {
        fontSize: 35,
        color: variables.primaryDark,
        fontWeight: 'bold',
    },
    yellowHR: {
        borderBottomColor: variables.primaryYellow,
        borderBottomWidth: 5,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        width: '100%'

    },
    textInputStyle: {
        width: '100%',
        marginBottom: 20,
        color: 'black'
    },
    signInButton: {
        width: '100%'
    },
    invalidCredentialsText: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        fontWeight: 'normal',
    },
    signupSuccessText: {
        marginTop: 15,
        fontSize: 15,
        color: 'green',
        fontWeight: 'normal',
    },
    bottomText: {
        marginTop: 75,
        marginBottom: 15,
        fontSize: 15,
        color: variables.primaryDark,
        fontWeight: 'normal',
    }
});

export default SignIn;
