//
import React, { PureComponent } from 'react';
//
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  WebView
} from 'react-native';
//
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import * as Ani from 'react-native-animatable';
//
import {
  WebViewExtended
} from 'react-native-my'

// Css
import styles from './styles';

//
import injectedJS from './WebViewBridge';
import HeadTitleComponent from './HeadTitleComponent';

/**
 * @class WebViewComponent
 */
export default class WebViewComponent extends PureComponent {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      // 
      source: props.source,
      //
      // @var {Boolean} is show?
      visible: (typeof props.visible === 'boolean') ? props.visible : false,
      //
      duration: 512,
      // show/hide head more menu
      showheadMenuMenu: false
    };

    // Bind method(s)
    this.open = this.open.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.close = this.close.bind(this);
    this.more = this.more.bind(this);
  }

  componentDidMount() {
    // Show on first load?
    let { initialVisible } = this.props;
    if (!(initialVisible === false)) {
      setTimeout(this.show, 128);
    }
  }

  toggleVisible(cb, visible, opts = {}) {
    let {
      onToggleVisibleStart,
      onToggleVisibleEnd
    } = this.props;
    // Toggle visible
    this.state.visible = visible;
    // Trigger event
    if (onToggleVisibleStart) {
      onToggleVisibleStart(this, visible);
    }
    // Animation
    let duration = (opts.duration || this.state.duration);
    if (visible) { // case: show
      duration = parseInt(duration * 0.9);
    } else { // case: hide
      duration = parseInt(duration * 0.6);
    }
    this.refAniViewRoot.transitionTo({
      left: visible ? 0 /* show */ : $g.dimensions.screen.width /* hide */
    }, duration);
    // 
    setTimeout(() => {
      // Trigger event
      if (onToggleVisibleEnd) {
        onToggleVisibleEnd(this, visible);
      }
      // Fire callback?
      if (cb) { cb(); }
    }, duration + 64);
  }

  open(source, opts = {}) {
    if (source === undefined) {
      source = this.state.source;
    }
    this.show(() => {
      if (typeof source === 'object') {
        this.setState({ source });
      }
    }, opts);
  }

  show(cb, opts = {}) {
    return this.toggleVisible(cb, true, opts);
  }

  hide(cb, opts = {}) {
    return this.toggleVisible(cb, false, opts);
  }

  close(opts = {}) {
    this.hide(() => {
      this.setState({ source: null });
      // Self destroy?!
      if (this.props.onClose) {
        this.props.onClose(this);
      }
    }, opts);
  }

  get isVisible() {
    return this.state.visible;
  }

  more(act = '') {
    // show/hide more menu
    const toggleMenu = () => {
      let showheadMenuMenu = (this.state.showheadMenuMenu = !this.state.showheadMenuMenu);
      this.refAniViewheadMenu.transitionTo({
        right: showheadMenuMenu ? 2 : -$g.dimensions.screen.width
      });
    };

    switch (act) {
      // reload
      case 'reload': {
        this.refWebView.reload();
      } break;
      // back
      case 'back': {
        this.refWebView.goBack();
      } break;
      // forward
      case 'forward': {
        this.refWebView.goForward();
      } break;
    }
    // show/hide more menu?
    toggleMenu();
  }

  onMessage(event) {
    let msgObj = event.nativeEvent.data;
    // post back reply as soon as possible to enable sending the next message
    this.refWebView.postMessage(msgObj);
    try {
      msgObj = JSON.parse(msgObj);
      //
      //switch (msgObj.type) {}
      //.end
    } catch(err) {
      console.warn(err);
    }
    // console.log('msgObj: ', msgObj);
    // trigger success callback
    //...
  }

  onNavigationStateChange(event) {
    // console.log('onNavigationStateChange: ', event);
    // Update head title text
    let { title } = event;
    title = (title === 'about:blank') ? '' : title;
    this.refHeadTitle.updatetext(title);
  }

  _renderHead() {
    return ([
      /*head*/
      <View key='head' style={[styles.head]}>
        <View style={[styles.headLR, styles.headL]}>
          <TouchableOpacity onPress={this.close}>
            <View><Ionicon name='md-close' style={[styles.headBtn, styles.btnClose]} /></View>
          </TouchableOpacity>
        </View>
        <View style={[styles.headTitle]}>
          <HeadTitleComponent
            ref={ref => { this.refHeadTitle = ref; }} 
            style={[styles.titleTxt]}
          />
        </View>
        <View style={[styles.headLR, styles.headR]}>
          <TouchableOpacity onPress={this.more}>
            <View><Ionicon name='md-more' style={[styles.headBtn, styles.btnMore]} /></View>
          </TouchableOpacity>
        </View>
      </View>,
      /*menu*/
      <Ani.View
        key='menu'
        ref={ref => { this.refAniViewheadMenu = ref; }}
        style={[styles.headMenu]}
      >
        <View style={[styles.headMenuItem]}>
          <TouchableOpacity
            style={[styles.headMenuTouch]}
            onPress={() => this.more('back')}
          >
            <View><Text style={[styles.headBtnTxt, styles.btnTxtBack]}>
              <Ionicon name='md-arrow-back' style={[styles.headBtnIcon, styles.btnIconBack]} />
            </Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headMenuTouch]}
            onPress={() => this.more('reload')}
          >
            <View><Text style={[styles.headBtnTxt, styles.btnTxtReload]}>
              <Ionicon name='md-refresh' style={[styles.headBtnIcon, styles.btnIconReload]} />
            </Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headMenuTouch]}
            onPress={() => this.more('forward')}
          >
            <View><Text style={[styles.headBtnTxt, styles.btnTxtForward]}>
              <Ionicon name='md-arrow-forward' style={[styles.headBtnIcon, styles.btnIconForward]} />
            </Text></View>
          </TouchableOpacity>
        </View>
        <View style={[styles.headMenuLink]}>
          <TouchableOpacity
            style={[styles.headMenuTouch]}
            onPress={() => alert('copy link (WIP)...')}
          >
            <View><Text style={[styles.headBtnTxt, styles.btnTxtForward]}>
              <Ionicon name='md-arrow-forward' style={[styles.headBtnIcon, styles.btnIconForward]} /> {$g.Lang('Copy link')}
            </Text></View>
          </TouchableOpacity>
        </View>
      </Ani.View>
    ]);
  }

  _renderWebView() {
    let { source } = this.state;
    return (
      <View style={[styles.webview]}>
        <WebViewExtended
          wvref={ref => { this.refWebView = ref; }}
          style={[styles.webviewWV]}
          source={source}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={[styles.loading]}>
              <ActivityIndicator size="large" color={$g.ESS.value('$primaryBlue')} />
            </View>
          )}
          // mixedContentMode={'compatibility'}
          // injectedJavaScript={injectedJS()} // <-- uses "onLoad"
          // onScroll={(event) => { console.log('onScroll: ', event); }}
          onLoad={() => { this.refWebView.injectJavaScript(injectedJS()); }}
          onMessage={this.onMessage.bind(this)}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </View>
    );
  }

  render() {
    return (
      <Ani.View
        style={[styles.wv]}
        ref={ref => { this.refAniViewRoot = ref; }}
      >
        {this._renderHead()}
        {this._renderWebView()}
      </Ani.View>
    );
  }
}
