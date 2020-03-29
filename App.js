if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from './screens/Home';
import Cart from './screens/Cart';

const Tabs = createMaterialBottomTabNavigator();

export default App = () => {
    return(
      <NavigationContainer>

        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color}) => {
                    if (route.name === 'Home') {
                        return <Icon name='home'  size={25} color={color}/>;
                    } else if (route.name === 'Cart') {
                        return <Icon name='shopping-cart' size={25} color={color}/>;
                    }
                },
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
        </Tabs.Navigator>
      </NavigationContainer>
  );
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

