//
import React, { PureComponent } from 'react';
//
import {
  WebView
} from 'react-native';

/**
 * @class WebViewComponent
 */
export default class WebViewLoadComponent extends PureComponent {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      source: props.source
    };

    // Bind method(s)
    this.load = this.load.bind(this);
  }

  load(source, opts = {}) {
    this.setState(() => ({ source }));
  }

  render() {
    let { source } = this.state;
    let ref = (_ref) => {
      if (this.props.wbref) {
        this.props.wbref(_ref);
      }
    };
    return (
      source ? (<WebView {...this.props} ref={ref} source={source} />) : null
    );
  }
}
