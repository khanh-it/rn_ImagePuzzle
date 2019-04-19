import React, { PureComponent } from "react";
// Import component(s)
import {
  View,
  TextInput
} from "react-native";
import { Text } from "react-native-my";

// Models
import UserModel from '../../../models/UserModel';

// Styles
import styles from '../styles';

/**
 * @class AuthComponent
 */
export default class AuthComponent extends PureComponent
{
  /**
   * @var UserModel
   */
  userModel = null;

  /**
   * @var {Ref}
   */
  textInput = null;

  constructor(props)
  {
    super(props);

    // Init models
    this.userModel = new UserModel();

    // Init state
    this.state = {};

    // Bind method(s)
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  /**
   * Event handler
   */
  onSubmitEditing({ nativeEvent })
  {
    let fullname = nativeEvent.text.toString().trim();
    if (!fullname) {
      this.textInput.focus();
      return;
    }
    //
    let userEnt = this.userModel.create({
      fullname
    });
    if (!userEnt) {
      this.textInput.focus();
      return;
    }
    console.log('create userEnt: ', userEnt);
    $g.navServTop.navigate('/app');
  }

  render()
  {
    return (
      <View style={[styles.signIn]}>
        <Text style={[styles.signIn_text]}>{$g.Lang("Input player's name...")}</Text>
        <TextInput
          ref={ref => { this.textInput = ref; }}
          style={[styles.signIn_textInput]}
          autoFocus={true}
          keyboardType={'default'}
          maxLength={128}
          placeholder={$g.Lang("Input player's name...")}
          placeholderTextColor={styles.signIn_textInputPhTxtColor}
          returnKeyType={'done'}
          textContentType={'name'}
          onSubmitEditing={this.onSubmitEditing}
        />
      </View>
    );
  }
}
