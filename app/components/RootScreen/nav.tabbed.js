import React, { PureComponent } from "react";
import { createStackNavigator } from "react-navigation";
// Import component(s)
import HomeScreen from '../HomeScreen';
import ModalScreen from '../ModalScreen';
import WebViewScreen from '../WebViewScreen';

// Global styles
import styles from '../../assets/css/styles';

/**
 * @class TabbedNavigator
 */
export const TabbedNavigator = createStackNavigator({
    '/':  {
        screen: HomeScreen
    },
    '/modal':  {
        screen: ModalScreen,
    },
    '/webview': {
        screen: WebViewScreen
    }
},
{
    // initialRouteName: '/',
    mode: 'modal',
    headerMode : 'none',
});
export default TabbedNavigator;
