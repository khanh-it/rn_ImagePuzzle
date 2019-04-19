import React, { PureComponent } from 'react';
import { WebView } from 'react-native';
import {
  injectWebViewOnSroll,
  injectWebViewOnWillNavigate
} from './WebViewBridge';

/**
 * @class WebViewExtended
 */
export default class WebViewExtended extends PureComponent {

  constructor(props) {
    super(props);

    // Init state
    this.state = {};

    // Bind method(s)
    // ...
  }

  onMessage(event) {
    let {
      onScroll,
      onWillNavigate,
      onMessage
    } = this.props;
    // Inject js...
    let msgObj = null;
    try {
      msgObj = JSON.parse(event.nativeEvent.data);
      // Fire callback!
      // +++ 
      if (onScroll && (msgObj && ('__WebViewOnScroll' === msgObj.type))) {
        let { scroll } = msgObj;
        return onScroll({ scroll });
      }
      // +++ 
      if (onWillNavigate && (msgObj && ('__WebViewWillNavigate' === msgObj.type))) {
        let { uri } = msgObj;
        return onWillNavigate({ uri });
      }
    } catch (err) {
      // ...
    }
    // Fire callback?
    if (onMessage) {
      return onMessage(event);
    }
  }

  onLoadEnd(event) {
    let {
      onScroll,
      onWillNavigate,
      willNavigateRules,
      onLoadEnd
    } = this.props;
    // Inject js...
    if (onScroll) {
      this.refWebView.injectJavaScript(injectWebViewOnSroll());
    }
    if (onWillNavigate) {
      this.refWebView.injectJavaScript(injectWebViewOnWillNavigate(willNavigateRules));
    }
    // Fire callback?
    if (onLoadEnd) {
      return onLoadEnd(event);
    }
  }

  render() {
    let { wvref, ...props } = this.props;
    //
    let ref = (ref) => {
      this.refWebView = ref;
      if (wvref) {
        return wvref(ref);
      }
    };
    //.end
    //.end
    return (
      <WebView
        ref={ref}
        onMessage={this.onMessage.bind(this)}
        onLoadEnd={this.onLoadEnd.bind(this)}
        {...props}
      />
    );
  }
}
