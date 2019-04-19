import React, { PureComponent } from "react";
// Import component(s)
import { View, Button } from "react-native";
import { Text } from "react-native-my";

// Styles
import styles from '../styles';

/**
 * @class DrawerComponent
 */
export default class DrawerComponent extends PureComponent
{
  render()
  {
    return (
      <View style={[]}>
        <Text>DrawerComponent</Text>
        <Button
          title="toggle drawler"
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}
        />
      </View>
    );
  }
}
