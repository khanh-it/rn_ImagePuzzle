import React, { PureComponent } from 'react';
import { createStackNavigator } from "react-navigation";
// Component(s)
import WVComp from './WebViewComponent';

// Global style(s)
// ...

/**
 * @class WebViewComponent
 */
export class WebViewComponent extends PureComponent
{
  render()
  {
    /* Public webview util. */
    return (
      <WVComp ref={ref => {
        $g.utils.WebView = (this.refWebView = ref);
      }} />
    );
  }
}

/**
 * @class WebViewScreen (WebViewStackNavigator)
 */
const WebViewScreen = createStackNavigator({
  '/webview': {
      screen: WebViewComponent,
  }
},
{
  headerMode : 'none',
});
export default WebViewScreen;
