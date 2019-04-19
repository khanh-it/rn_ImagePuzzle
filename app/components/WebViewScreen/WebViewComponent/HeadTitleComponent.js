//
import React, { PureComponent } from 'react';
//
import {
  Text
} from 'react-native';

/**
 * @class HeadTitleComponent
 */
export default class HeadTitleComponent extends PureComponent {

    constructor(props) {
      super(props);
  
      // Init state
      this.state = {
        children: this.props.children
      };
    }
  
    updatetext(children) {
      this.setState(() => ({ children }));
    }
  
    render() {
      let { children } = this.state;
      return (
        <Text {...this.props}>{children}</Text>
      );
    }
  }