/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import {
  View,
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';
// Css
import styles from './styles';

// Component(s)

/**
 * @class HeaderComponent
 */
export default class HeaderComponent extends PureComponent
{
  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {
      /** @var {Number}  */
      moveCnt: (typeof props.moveCnt === "number") ? props.moveCnt : 0, // move(s) count,
    };

    // Bind method(s)
    this.setMoveCnt = this.setMoveCnt.bind(this);

    // Navigation event(s)
  }

  componentDidMount()
  {}

  /**
   * @public Set (change) number move counted
   * @param {number} moveCnt
   * @returns void
   */
  setMoveCnt(_moveCnt)
  {
    let moveCnt = (1 * _moveCnt);
    this.setState({ moveCnt });
  }

  render()
  {
    let {
      moveCnt
    } = this.state;

    return (
      <View style={[styles.header]}>
        <View style={[styles.headerL]}>
          <Text style={[styles.headerTxt001]}>{$g.Lang('Your scores')}:</Text>
          <Text style={[styles.headerTxt002]}>({$g.Lang('lower is better')})</Text>
        </View>
        <View style={[styles.headerR]}>
          <Text style={[styles.headerTxt101]}>{moveCnt}</Text>
        </View>
      </View>
    );
  }
}
// Make alias
const _static = HeaderComponent;
