/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Ani from 'react-native-animatable';
import {
  Text
} from 'react-native-my';

// Css
import styles from './styles';

// Component(s)

/**
 * @class PhotoFragmentComponent
 */
export default class PhotoFragmentComponent extends PureComponent
{
  /**
   * @var {Object}
   */
  _refAniView = null;

  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {};

    // Bind method(s)
    this._handlePress = this._handlePress.bind(this);
  }

  componentDidMount()
  {
  }

  /**
   * 
   * @param {Object} param
   * @param {Object} event 
   * @return void
   */
  _handlePress({ row, col }, event)
  {
    // console.log(`fragment-r${row}-c${col} is touched!`);
    let {
      onPress
    } = this.props;
    //
    if (onPress) {
      onPress({ row, col });
    }
  }

  /**
   * Calculate <Image /> style
   */
  _calImgStyle(opts = {})
  {
    let {
      imgStyle,
      row, col,
      fragmentStyle
    } = this.props;

    return Object.assign({}, imgStyle, {
      top: -1 * (fragmentStyle.height * (opts.row || row)),
      left: -1 * (fragmentStyle.width * (opts.col || col))
    });
  }

  render()
  {
    let {
      imgSrc,
      imgStyle,
      rows, row,
      cols, col,
      fragmentStyle,
      visible
    } = this.props;
    if (!imgStyle) {
      return null;
    }
    // +++
    let _imgStyle = this._calImgStyle();
    //
    // console.log(`fragment-r${row}-c${col}# fragmentStyle: ${JSON.stringify(fragmentStyle)} '-- imgStyle: ${JSON.stringify(imgStyle)}`);
    //
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={(event) => {
          this._handlePress({ row, col }, event);
        }}
      >
        <Ani.View
          ref={ref => {
            this._refAniView = ref;
            global._refFragments = global._refFragments || {};
            global._refFragments[`${row}.${col}`] = ref;
          }}
          style={[(false === visible) && { opacity: 0 }, styles.root, fragmentStyle]}
          // contentContainerStyle={[styles.rootCCS, imgStyle]}
          // scrollEnabled={true}
          // horizontal={true}
          // bounces={false}
          // showsHorizontalScrollIndicator={true}
          // showsVerticalScrollIndicator={true}
          // pinchGestureEnabled={false}
        >
          <Image
            ref={ref => {
              global._refImgs = global._refImgs || {};
              global._refImgs[`${row}.${col}`] = ref;
            }}
            style={[styles.img, _imgStyle]}
            source={imgSrc}
            onLoadEnd={this.props.onImgLoadEnd}
          />
        </Ani.View>
      </TouchableOpacity>
    );
  }
}
