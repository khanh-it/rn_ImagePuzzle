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
import {
  Text,
  VectorIcon
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
   * Ref
   * @var {Object}
   */
  refScrollView = null;

  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {};

    // Bind method(s)

  }

  componentDidMount()
  {
  }

  render()
  {
    let {
      imgSrc,
      imgStyle,
      rows, row,
      cols, col,
      fragmentStyle
    } = this.props;
    if (!imgStyle) {
      return null;
    }
    // +++
    let _imgStyle = Object.assign({}, imgStyle, {
      top: -1 * (fragmentStyle.height * row),
      left: -1 * (fragmentStyle.width * col)
    });
    //
    // console.log(`fragment-r${row}-c${col}# fragmentStyle: ${JSON.stringify(fragmentStyle)} '-- imgStyle: ${JSON.stringify(imgStyle)}`);
    //
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          alert(`fragment-r${row}-c${col} is touched!`);
        }}
      >
        <View
          ref={ref => {
            this.refScrollView = ref;
            global._refFragments = global._refFragments || {};
            global._refFragments[`${row}.${col}`] = ref;
          }}
          style={[styles.root, fragmentStyle]}
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
          />
        </View>
      </TouchableOpacity>
    );
  }
}
