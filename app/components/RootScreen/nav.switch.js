import React from "react";
import { createSwitchNavigator } from "react-navigation";
// Component(s)
import DrawerNavigator from './nav.drawer';
import SplashScreen from '../SplashScreen';
import AuthScreen from '../AuthScreen';

/**
 * @class SwitchNavigator
 */
export const SwitchNavigator = createSwitchNavigator({
    '/splash':  {
        screen: SplashScreen
    },
    '/app':  {
        screen: DrawerNavigator
    },
    '/auth':  {
        screen: AuthScreen,
    },
},
{
    initialRouteName: '/splash',
    headerMode : 'none',
});
export default SwitchNavigator;

