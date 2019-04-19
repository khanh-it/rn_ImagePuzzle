/**
 * 
 */
import React, { Component } from 'react';
import { Text as RNText } from 'react-native';

/**
 * @class Text
 */
export class Text extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { style, ...props } = this.props;
        style = (style instanceof Array) ? style : [style];
        // style = [{ color: 'white' }].concat(style);
        return (
            <RNText style={style} {...props} />
        );
    }
}
export default Text;
