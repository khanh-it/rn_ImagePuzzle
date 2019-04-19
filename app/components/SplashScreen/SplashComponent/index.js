import React, { PureComponent } from "react";
// Import component(s)
import {
  View,
  ActivityIndicator
} from "react-native";
import { Text } from "react-native-my";

// Models
import UserModel from '../../../models/UserModel';

// Styles
import styles from '../styles';

/**
 * @class SplashComponent
 */
export default class SplashComponent extends PureComponent
{
  /**
   * @var UserModel
   */
  userModel = null;
  
  /**
   * @var UserEntity
   */
  userEnt = null;

  constructor(props)
  {
    super(props);

    // Init models
    this.userModel = new UserModel();

    // Init state
    this.state = {};

    //
  }

  componentDidMount()
  {
    //
    this.userEnt = this.userModel.findOne();
    console.log('userEnt: ', this.userEnt);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(this.userEnt ? '/app' : '/auth');
  }

  render()
  {
    return (
      <View style={[styles.root]}>
        <ActivityIndicator size={64} color="#00ff00" />
      </View>
    );
  }
}
