import React, { PureComponent } from "react";
import { createStackNavigator } from "react-navigation";
// Import component(s)
import AuthComponent from './AuthComponent';

/**
 * @class StackNavigator
 */
export const StackNavigator = createStackNavigator({
  '/Auth':  {
      screen: AuthComponent
  },
},
{
  // initialRouteName: '/',
  headerMode : 'none',
});
export default StackNavigator;
