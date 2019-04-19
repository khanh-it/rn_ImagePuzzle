/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import {
  View,
  Button,
  Share
} from 'react-native';
import { Text } from 'react-native-my';
// Css
import styles from '../styles';

// Component(s)

/**
 * @class HomeComponent
 */
export default class HomeComponent extends PureComponent
{
  constructor(props) {
    super(props);

    // Initial state
    this.state = {};

    // Bind method(s)

    // Navigation event(s)
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    //
    return (
      <View style={[styles.root]}>
        <Text>HomeComponent oh yeah!</Text>
        <Button
          title="toggle drawler"
          onPress={() => {
            // $g.navServTop.navigate('/drawer');
            this.props.navigation.toggleDrawer();
          }}
        />
        <Button onPress={this.onShare} title="Share" />
      </View>
    );
  }
}
