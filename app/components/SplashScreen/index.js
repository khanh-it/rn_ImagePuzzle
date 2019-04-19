import React, { PureComponent } from "react";
import { createStackNavigator } from "react-navigation";
// Import component(s)
import SplashComponent from './SplashComponent';

/**
 * @class StackNavigator
 */
export const StackNavigator = createStackNavigator({
  '/Splash':  {
      screen: SplashComponent
  },
},
{
  // initialRouteName: '/',
  headerMode : 'none',
});
export default StackNavigator;
