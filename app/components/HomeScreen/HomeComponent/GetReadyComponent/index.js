/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';
// Css
import styles from './styles';

// Component(s)

/**
 * @class GetReadyComponent
 */
export default class GetReadyComponent extends PureComponent
{
  /**
   * @var {Number}|{void}
   */
  _getReadyTimer = null;

  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {
      /** @var {Number}  */
      readyCnt: (typeof props.readyCnt === 'number') ? props.readyCnt : 3
    };

    // Bind method(s)

    // Navigation event(s)
  }

  componentDidMount()
  {
    this._getReadyTimer = setInterval(() => {
      let { readyCnt } = this.state;
      --readyCnt;
      if (readyCnt <= 0) {
        clearInterval(this._getReadyTimer);
        let { onReady } = this.props;
        if (onReady) {
          onReady();
        }
        return;
      }
      this.setState({ readyCnt });
    }, 1000);
  }

  componentWillUnmount()
  {
    clearInterval(this._getReadyTimer);
  }

  render()
  {
    let {
      readyCnt
    } = this.state;

    return (
      <View style={[StyleSheet.absoluteFill, styles.getReady]}>
        <Text style={[styles.getReadyTxt]}>{readyCnt}</Text>
      </View>
    );
  }
}
// Make alias
const _static = GetReadyComponent;
