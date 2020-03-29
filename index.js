/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer/reducer';

const store = createStore(reducer);

const Application = () => (
        <Provider store={store}>
            <App />
        </Provider>
);

AppRegistry.registerComponent(appName, () => Application);
