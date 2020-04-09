import {createStackNavigator} from '@react-navigation/stack';

if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SyncStorage from 'sync-storage';

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Account from './screens/Account';

const Tabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            signedIn: false,
            token:''
        }
    }

    signedOut = () => {
        return(
            // <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='SignIn'
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name='SignIn'
                        component={SignIn}
                    />
                    <Stack.Screen
                        name='SignUp'
                        component={SignUp}
                    />
                </Stack.Navigator>
            // </NavigationContainer>
        );
    };

    signedIn = () => {
        return(
            <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color}) => {
                        if (route.name === 'Home') {
                            return <Icon name='home'  size={25} color={color}/>;
                        } else if (route.name === 'Cart') {
                            return <Icon name='shopping-cart' size={25} color={color}/>;
                        } else if (route.name === 'Account') {
                            return <Icon name='user-circle' size={23} color={color}/>;
                        }},
                })}
                shifting={true}
                initialRouteName="Home"
                activeColor="#f0edf6"
                inactiveColor="#665205"
                barStyle={tabBarStyles.barStyle}
                onIndexChange
            >
                <Tabs.Screen
                    name='Home'
                    component={Home}
                    // options={{title: 'Home'}}
                />
                <Tabs.Screen
                    name='Cart'
                    component={Cart}
                    // options={{title: 'Cart'}}
                />
                <Tabs.Screen
                    name='Account'
                    component={Account}
                    // options={{title: 'Cart'}}
                />
            </Tabs.Navigator>
        );
    };


    isSignedIn = () => {
        // return new Promise((resolve, reject) => {
        //     SyncStorage.get('TOKEN')
        //         .then(res => {
        //             if(res !== null) {
        //                 resolve(true);
        //             } else {
        //                 resolve(false);
        //             }
        //         })
        //         .catch(err => reject(err));
        // });
        let token = SyncStorage.get('TOKEN');
        if(token === undefined || token === null || token === '') {
            return false;
        } else {
            return true;
        }
    };

    render() {
        return(
            <NavigationContainer>
                {/*<Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                {this.isSignedIn() === false ? (
                    <Stack.Screen
                        name='SignedOut'
                        component={this.signedOut}
                    />
                ) : (
                    <Stack.Screen
                        name='SignedIn'
                        component={this.signedIn()}
                    />
                )
                }
                </Stack.Navigator>*/}
                <Stack.Navigator
                    initialRouteName='SignIn'
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name='SignIn'
                        component={SignIn}
                    />
                    <Stack.Screen
                        name='SignUp'
                        component={SignUp}
                    />
                    <Stack.Screen
                        name='SignedIn'
                        component={ this.signedIn }
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const tabBarStyles = StyleSheet.create({
    labelStyle: {
        fontSize: 50,
        color: 'red',
    },
    barStyle: {
        backgroundColor: '#e5b700',
    }
});

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems
    }
};

