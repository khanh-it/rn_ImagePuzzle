import React, { PureComponent } from "react";
import { createStackNavigator } from "react-navigation";
// Import component(s)
import DrawerComponent from './DrawerComponent';

/**
 * @class StackNavigator
 */
export const StackNavigator = createStackNavigator({
  '/drawer':  {
      screen: DrawerComponent
  },
},
{
  // initialRouteName: '/',
  headerMode : 'none',
});
export default StackNavigator;
