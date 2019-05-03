/**
 * @format
 */

import {AppRegistry} from 'react-native';
// project's globals
import * as _ from './app/global';
// import App from './App';
import App from './App.react-native-sound';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
