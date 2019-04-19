import React, { PureComponent } from "react";
import { createDrawerNavigator } from "react-navigation";
// Component(s)
import TabbedNavigator from './nav.tabbed';
import DrawerScreen from '../DrawerScreen';

/**
 * @class DrawerNavigator
 */
export const DrawerNavigator = createDrawerNavigator({
    '/':  {
        screen: TabbedNavigator
    },
    '/drawer':  {
        screen: DrawerScreen,
    },
},
{
    // initialRouteName: '/',
    headerMode : 'none',
});
export default DrawerNavigator;

