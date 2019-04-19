import React, { PureComponent } from "react";
import { createAppContainer } from "react-navigation";
// Import component(s)
import SwitchNavigator from './nav.switch';

// Global styles
import styles from '../../assets/css/styles';

/**
 * @class RootNavigatorContainer
 */
const RootNavigatorContainer = createAppContainer(SwitchNavigator);

/**
 * @class RootScreen
 */
export default class RootScreen extends PureComponent
{
  render()
  {
    return (
      <RootNavigatorContainer
        style={[styles.html]}
        ref={navigatorRef => {
          $g.navServTop.setNavigator(navigatorRef);
        }}
        uriPrefix={'kdtpimgpzl://'}
      />
    );
  }
}
