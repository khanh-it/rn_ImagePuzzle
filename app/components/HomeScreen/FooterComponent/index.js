/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';
// Css
import styles from './styles';

// Component(s)

/**
 * @class FooterComponent
 */
export default class FooterComponent extends PureComponent
{
  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {
      soundSystemFlag: (typeof props.soundSystemFlag == "boolean") ? props.soundSystemFlag : false
    };

    // Bind method(s)
    this._handleGetPhotos = this._handleGetPhotos.bind(this);
    this._handleSoundSystemPress = this._handleSoundSystemPress.bind(this);

    // Navigation event(s)
  }

  componentDidMount()
  {}

  _handleGetPhotos(event)
  {
    let { handleGetPhotos } = this.props;
    if (handleGetPhotos) {
      handleGetPhotos(event);
    }
  }

  /**
   * @public Switch sound system on/off 
   * @param {} soundSystemFlag 
   */
  switchSoundSystem(soundSystemFlag)
  {
    if (typeof soundSystemFlag === "boolean") {
      this.setState({ soundSystemFlag });
    }
  }

  /**
   * 
   */
  _handleSoundSystemPress(event)
  {
    let {
      onSoundSystemPress
    } = this.props;
    let {
      soundSystemFlag
    } = this.state;

    let result = null;
    soundSystemFlag = !soundSystemFlag;
    if (onSoundSystemPress) {
      result = onSoundSystemPress(soundSystemFlag, event);
    }
    if (false !== result) {
      this.setState({ soundSystemFlag });
    }
  }

  _renderFooterL()
  {
    return (
      <View style={[styles.footerL]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this._handleGetPhotos}
        >
          {/* <TextInput style={{ borderWidth: 1, borderColor: 'grey' }} /> */}
          <VectorIcon nameAndroid="md-photos" nameIos="ios-photos" size={32} />
        </TouchableOpacity>
      </View>
    );
  }

  _renderFooterR()
  {
    let {
      soundSystemFlag
    } = this.state;

    return (
      <View style={[styles.footerR]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this._handleSoundSystemPress}
        >
          {soundSystemFlag
            ? (
              <VectorIcon nameAndroid="md-volume-off" nameIos="ios-volume-off" size={32} />
            )
            : (
              <VectorIcon nameAndroid="md-volume-high" nameIos="ios-volume-high" size={32} />
            )
          } 
        </TouchableOpacity>
      </View>
    );
  }

  render()
  {
    return (
      <View style={[styles.footer]}>
        {/* Footer's left */}{this._renderFooterL()}
        {/* Footer's right */}{this._renderFooterR()}
      </View>
    );
  }
}
// Make alias
const _static = FooterComponent;
