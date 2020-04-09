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
import SyncStorage from 'sync-storage';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            invalidCredentials: false,
            invalidCredentialsText: ''
        };
        this.auth();
    };

    // Non-Rendering methods
    // User Sign-up
    userSignUp = () => {
        let emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(this.state.email ==='' || this.state.password === '' || this.state.confirmPassword === '') {
            this.setState({
                invalidCredentials: true,
                invalidCredentialsText: 'Credentials cannot be empty',
            });
        } else if(!emailRegExp.test(this.state.email)) {
            this.setState({
                invalidCredentials: true,
                invalidCredentialsText: 'Entered email is not Valid',
            });
        } else if(this.state.password !== this.state.confirmPassword) {
            this.setState({
                invalidCredentials: true,
                invalidCredentialsText: 'The passwords donot match',
            });
        } else if(emailRegExp.test(this.state.email) && this.state.password === this.state.confirmPassword) {
            this.setState({
                invalidCredentials: false,
                invalidCredentialsText: '',
            });
            let userDetails = {
                "email": this.state.email,
                "password": this.state.password,
            };
            fetch('http://192.168.0.106:1338/createuser',
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(userDetails),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(
                    /*
                    * SIGN-UP CODES:
                    *  -1: email/user already exists
                    *   0: Sign-up Error
                    *   1: Sign-up successful
                    * */
                    (result) => {
                        if(result.code === -1) {
                            this.setState({
                                invalidCredentials: true,
                                invalidCredentialsText: 'Email already exists! Please try Signing in or Sign-up with a different email',
                            });
                        } else if(result.code === 0) {
                            this.setState({
                                invalidCredentials: true,
                                invalidCredentialsText: 'Error Signing you up. Please try again later',
                            });
                        } else if(result.code === 1) {
                            this.setState({
                                invalidCredentials: false,
                                invalidCredentialsText: '',
                            });
                            SyncStorage.set('signup', 1);
                            this.props.navigation.navigate('SignIn', {
                                signUp: 'success',
                            })
                        }
                    },
                    (error) => {
                        console.log("ERROR CREATING USER::", error);
                        this.setState({
                            invalidCredentials: true,
                            invalidCredentialsText: 'Error Signing you up. Please try again later',
                        });
                    }
                );
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

    // Render Method
    render() {
        return(
            <SafeAreaView style={ styles.primarySection }>
                <Text style={ styles.pageHeading }>
                    Sign Up
                </Text>
                <SafeAreaView
                    style={ styles.yellowHR }
                />
                <TextInput
                    label='Email'
                    mode='outlined'
                    secureTextEntry={ false }
                    value={ this.state.email }
                    onChangeText={ email => this.setState({email}) }
                    style={ styles.textInputStyle }
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
                    secureTextEntry={ true }
                    value={ this.state.password }
                    onChangeText={ password => this.setState({password}) }
                    style={ styles.textInputStyle }
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
                    label='Confirm Password'
                    placeholder='Password'
                    mode='outlined'
                    secureTextEntry={ true }
                    value={ this.state.confirmPassword }
                    onChangeText={ confirmPassword => this.setState({ confirmPassword }) }
                    style={ styles.textInputStyle}
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
                    style={ styles.signUpButton }
                    color={ variables.primaryYellow }
                    dark={ true }
                    onPress={ () => this.userSignUp() }
                >
                    Sign up
                </Button>
                {this.invalidCredentialsText()}
                <Text style={styles.bottomText}>
                    Already have an Account? Click the button below to Sign-in!
                </Text>
                <Button
                    mode="text"
                    style={styles.signUpButton}
                    color={variables.primaryYellow}
                    dark={true}
                    onPress={() => this.props.navigation.navigate('SignIn')}
                >
                    Sign in
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
    signUpButton: {
        width: '100%'
    },
    invalidCredentialsText: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
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

export default SignUp;
