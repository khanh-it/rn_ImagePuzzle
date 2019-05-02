/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import {
  View,
  // ScrollView,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
  CameraRoll,
  // Image,
  TextInput
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';
import { RNCamera } from 'react-native-camera';
// Css
import styles from '../styles';

// Component(s)
import PhotoFragmentComponent from '../PhotoFragmentComponent';

// helpers
import * as helpers from '../../../helpers';

/**
 * @class HomeComponent
 */
export default class HomeComponent extends PureComponent
{
  /**
   * @var {Array}
   */
  _refFragments = [];

  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {
      selectedPhoto: null,
      map: [],
      mapShuffle: [],
      fragmentRows: 4, // 5~10
      fragmentCols: 4, // 5~10,
      /** @var {Object}  */
      imgStyle: null,
      /** @var {Object}  */
      fragmentStyle: null,
      /** @var {Number}  */
      moveCnt: 0 // move(s) count
    };

    // Bind method(s)
    this._handleGetPhotos = this._handleGetPhotos.bind(this);
    this._cameraRollRequestPermissions = this._cameraRollRequestPermissions.bind(this);
    this._cameraRollGetPhotos = this._cameraRollGetPhotos.bind(this);
    this._handleLayout = this._handleLayout.bind(this);
    this._handlePhotoFragmentPress = this._handlePhotoFragmentPress.bind(this);
    this._setPhotoFragment = this._setPhotoFragment.bind(this);

    // Navigation event(s)
  }

  componentDidMount()
  {
    this._handleSelectedPhoto();
  }

  _map(cb)
  {
    let {
      fragmentRows,
      fragmentCols
    } = this.state;

    return Array(fragmentRows).fill(null).map((_null, row) => {
      return Array(fragmentCols).fill(null).map((_null, col) => {
        return cb(row, col);
      });
    });
  }

  _handleSelectedPhoto(_selectedPhoto)
  {

    let selectedPhoto = require('../../../assets/img/puzzle/001.jpg');
    //
    // let {} = this.state;

    //
    let map = [];
    let mapShuffle = [];
    this._map((row, col) => map.push({
      row, col, visible: !(0 === row && 0 === col) // @TODO
    }));
    mapShuffle = map.concat([]); // copy array
    helpers.shuffle(mapShuffle);
    // console.log('mapShuffle : ', mapShuffle);
    //
    this.setState({
      selectedPhoto,
      map,
      mapShuffle
    });
  }

  _handleGetPhotos()
  {
    this._cameraRollRequestPermissions()
      .then(this._cameraRollGetPhotos)
      .then((result) => {
        console.log('_cameraRollGetPhotos: ', result);
        this.setState({ photos: result.edges });
      });
  }

  async _cameraRollRequestPermissions()
  {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Cool Photo App needs access to your camera so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return granted;
      } else {
        throw new Error('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async _cameraRollGetPhotos()
  {
    let result = await CameraRoll.getPhotos({
      first: 25,
      assetType: 'Photos'
    });
    return result;
  }

  _layouts = {}

  _handleLayout(event, type)
  {
    console.log('_handleLayout: ', type, event.nativeEvent);
    let layout = event.nativeEvent.layout;
    this._layouts[type] = layout;
    //
    if ('body' === type) {
      let {
        fragmentRows,
        fragmentCols
      } = this.state;
      // +++
      let imgStyle = { width: layout.width, height: layout.height };
      // +++
      let fragmentStyle = {
        width: Math.floor(layout.width / fragmentCols) - 1,
        height: Math.floor(layout.height / fragmentRows)
      };
      //
      this.setState({
        imgStyle, fragmentStyle
      });
    }
  }

  /**
   * 
   */
  _isPtFragVisible({ row, col })
  {
    let result = false;
    let ptFragment = this._findPhotoFragment({ row, col });
    if (ptFragment) {
      result = ptFragment.visible;
    } else {
      result = (0 === row && 0 === col);
    }
    return result;
  }

  /**
   * Helper, set photo fragment ref
   * @param {Object}
   * @return void
   */
  _setPhotoFragment({ row, col, ref, visible = true })
  {
    this._refFragments.push({ row, col, ref, visible });
    global._refPhotoFragments = global._refPhotoFragments || {};
    global._refPhotoFragments[`${row}.${col}`] = ref;
  }

  /**
   * Helper, find photo fragment by row, col
   * @param {Object} { row, col, visible }
   * @return {Object}|null
   */
  _findPhotoFragment({ row, col, visible })
  {
    let foundRef = null;
    let foundIdx = 0;
    if (row >= 0 && col >= 0) {
      foundRef = this._refFragments.find((item, index) => {
        let result = (item.row === row && item.col === col);
        if (result && (typeof visible === "boolean")) {
          let { ref: { props } } = item;
          result = (visible === props.visible);
        }
        if (result) {
          foundIdx = index;
        }
        return result;
      });
    }
    if (foundRef) {
      foundRef = Object.assign({ index: foundIdx }, foundRef);
    }
    // console.log('foundRef: ', foundRef);
    return foundRef;
  }

  _handlePhotoFragmentPress({ row, col })
  {
    let foundItem = this._findPhotoFragment({ row, col, visible: true });
    if (foundItem) {
      // Can move?
      let posibleItem = null;
      let posibleMoves = {
        'top': { row: row - 1, col: col },
        'right': { row: row, col: col + 1 },
        'bottom': { row: row + 1, col: col },
        'left': { row: row, col: col - 1 },
      };
      // console.log('posibleMoves: ', posibleMoves);
      for (let position in posibleMoves) {
        let moveItem = posibleMoves[position];
        posibleItem = this._findPhotoFragment(Object.assign({ visible: false }, moveItem));
        if (posibleItem) {
          // console.log('posibleItem: ', position, posibleItem);
          // @TODO: switch PhotoFragments
          this.setState(({ mapShuffle, moveCnt }) => {
            let item = mapShuffle[foundItem.index];
            mapShuffle[foundItem.index] = mapShuffle[posibleItem.index];
            mapShuffle[posibleItem.index] = item;
            mapShuffle = mapShuffle.concat([]);
            return {
              mapShuffle,
              moveCnt: moveCnt + 1
            };
          });
          // this._switchPhotoFragments(foundItem, posibleItem);
          break;
        }
      }
    }
  }

  /**
   * Method: move photo fragment
   */
  _switchPhotoFragments(foundItem, posibleItem)
  {
    let imgStyle = this._calImgStyle({
      row, col
    });
    console.log('moved#imgStyle: ', imgStyle);
    // this._refAniView.setNativeProps(imgStyle);
  }

  _renderHeader()
  {
    let {
      moveCnt
    } = this.state;

    return (
      <View style={[styles.header]}>
        <View style={[styles.headerL]}>
          <Text>Header</Text>
        </View>
        <View style={[styles.headerR]}>
          <Text>Moves: {moveCnt}</Text>
        </View>
      </View>
    );
  }

  _renderBody()
  {
    let {
      selectedPhoto,
      map,
      mapShuffle,
      // fragments,
      fragmentRows,
      fragmentCols,
      imgStyle,
      fragmentStyle
    } = this.state;

    //
    let willRender = (selectedPhoto && imgStyle && fragmentStyle);
    //
    this._refFragments = [];

    return (
      <ImageBackground
        source={require('../../../assets/img/empty_bg_xs.jpg')}
        style={[styles.body]}
        onLayout={(event) => {
          this._handleLayout(event, 'body');
        }}
        imageStyle={[styles.bodyBg]}
        resizeMode={'repeat'}
        resizeMethod="resize"
      >
      {map.map(({ row, col, visible }, index) => {
        let item = mapShuffle[index];
        // console.log(`row/col: ${row}/${col} --> ${item.row}/${item.col}`);
        return (
          <PhotoFragmentComponent
            ref={(ref) => {
              // console.log(`ptFragRef: `, ref);
              if (ref) {
                this._setPhotoFragment(Object.assign({ ref }, { row, col }));
              }
            }}
            key={`fragment-r${row}-c${col}`}
            imgSrc={selectedPhoto}
            imgStyle={imgStyle}
            rows={fragmentRows}
            cols={fragmentCols}
            row={item.row}
            col={item.col}
            fragmentStyle={fragmentStyle}
            visible={item.visible}
            onPress={(event) => {
              this._handlePhotoFragmentPress({ row, col });
            }}
          />
        );
      })}
      </ImageBackground>
    );
  }

  _renderFooter()
  {
    return (
      <View style={[styles.footer]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this._handleGetPhotos}
        >
          {/* <TextInput style={{ borderWidth: 1, borderColor: 'grey' }} /> */}
          <VectorIcon nameAndroid="md-photos" nameIos="ios-photos" size={32} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    //
    return (
      <ImageBackground
        source={{}}
        style={[styles.root]}
      >
        {/* box */}
        <View style={[styles.box]}>
          {/* header */}{this._renderHeader()}{/* .end#header */}
          {/* body */}{this._renderBody()}{/* .end#body */}
          {/* footer */}{this._renderFooter()}{/* .end#footer */}
        </View>
        {/* .end#box */}
      </ImageBackground>
    );
  }
}
// Make alias
const _static = HomeComponent;
