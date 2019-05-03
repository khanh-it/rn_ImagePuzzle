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
  StyleSheet,
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
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import PhotoFragmentComponent from '../PhotoFragmentComponent';
import GetReadyComponent from './GetReadyComponent';

// helpers
import * as helpers from '../../../helpers';

/**
 * @class HomeComponent
 */
export default class HomeComponent extends PureComponent
{
  /**
   * @param {Object}
   */
  _refHeaderComp = null;

  /**
   * @param {Object}
   */
  _refFooterComp = null;

  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {
      selectedPhoto: null,
      map: [],
      mapShuffle: [],
      fragmentRows: 3, // 5~10
      fragmentCols: 3, // 5~10,
      /** @var {Object}  */
      imgStyle: null,
      /** @var {Object}  */
      fragmentStyle: null,
      /** @var {Number}  */
      moveCnt: 0, // move(s) count,
      /** @var {Boolean}  */
      readyFlag: null
    };

    // Bind method(s)
    this._handleLayout = this._handleLayout.bind(this);
    this._handlePtFragPress = this._handlePtFragPress.bind(this);
    this._handlePtFragLoadEnd = this._handlePtFragLoadEnd.bind(this);
    this._setPhotoFragment = this._setPhotoFragment.bind(this);
    this._handleReady = this._handleReady.bind(this);

    // Navigation event(s)
  }

  componentDidMount()
  {
    this._handleSelectPhoto();
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

  /**
   * Helper check if game is finished?
   * @return {Boolean}
   */
  _isGameFinished()
  {
    let result = false;
    let { map, mapShuffle } = this.state;
    if (map.length && (map.length === mapShuffle.length)) {
      result = true;
      for (let index in map) {
        let item = map[index];
        let _item = mapShuffle[index];
        if (!(item.row === _item.row && item.col === _item.col)) {
          result = false;
          break;
        }
      }
    }
    return result;
  }

  /**
   * @TODO: 
   * @param {*} _selectedPhoto 
   */
  _handleSelectPhoto(_selectedPhoto)
  {
    //
    let selectedPhoto = require('../../../assets/img/puzzle/001.jpg'); // _selectedPhoto
    // Create map data of fragments from photo
    let map = [];
    let mapShuffle = [];
    this._map((row, col) => map.push({
      row, col,
      ref: null, // PhotoFragment's ref
      visible: true
    }));
    //
    this.setState({ selectedPhoto, map, mapShuffle });
  }

  /**
   * Handle get ready is done!
   * @returns void
   */
  _handleReady()
  {
    let { map, mapShuffle } = this.state;
    // Shuffle map data of fragments from photo
    mapShuffle = map.concat([]); // copy array
    // @TODO: helpers.shuffle(mapShuffle);
    let a = mapShuffle[0]; mapShuffle[0] = mapShuffle[1]; mapShuffle[1] = a;
    // @TODO: detect photo fragment is visible rule?
    mapShuffle[0].visible = false;
    //
    this.setState({ readyFlag: true, mapShuffle });
  }

  _layouts = {}

  _handleLayout(event, type)
  {
    // console.log('_handleLayout: ', type, event.nativeEvent);
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
  _setPhotoFragment({ row, col, ref, visible })
  {
    let { map } = this.state;
    map.forEach((item) => {
      if (item.row === row && item.col === col) {
        Object.assign(item, { ref });
        if (typeof visible === "boolean") {
          Object.assign(item, { visible });
        }
      }
    });
    // Debug only
    global._refPhotoFragments = global._refPhotoFragments || {};
    global._refPhotoFragments[`${row}.${col}`] = ref;
    //.end
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
      foundRef = this.state.map.find((item, index) => {
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

  _handlePtFragPress({ row, col })
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
            // Check if game is finished?
            setTimeout(() => {
              if (this._isGameFinished()) {
                alert(`Congratulations, your score(s): ${this.state.moveCnt}.`);
              }
            });
            return { mapShuffle/*, moveCnt: moveCnt + 1*/ };
          });
          //
          this._refHeaderComp.setMoveCnt(++this.state.moveCnt);
          break;
        }
      }
    }
  }

  /**
   * Event handler (when photo fragment is loaded)
   * 
   */
  _handlePtFragLoadEnd({ row, col })
  {
    let { fragmentRows, fragmentCols } = this.state;

    if (row === (fragmentRows - 1) && (col === (fragmentCols - 1))) {
      // alert('imgLoadEnd eventually...');
      setTimeout(() => {
        this.setState({ readyFlag: false });
      });
    }
  }

  _renderHeader()
  {
    let { moveCnt } = this.state;

    return (
      <HeaderComponent
        // key={`hdr-mcnt${moveCnt}`}
        ref={ref => { this._refHeaderComp = ref; }}
        moveCnt={moveCnt}
      />
    );
  }

  _renderBody()
  {
    let {
      selectedPhoto,
      map, mapShuffle,
      fragmentRows, fragmentCols,
      imgStyle, fragmentStyle,
      readyFlag
    } = this.state;

    //
    let willRender = (selectedPhoto && imgStyle && fragmentStyle);
    //
    let willRenderGetReady = !!map.length && !mapShuffle.length && (false === readyFlag);

    //
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
        let item = mapShuffle[index] || map[index];
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
              this._handlePtFragPress({ row, col });
            }}
            onImgLoadEnd={() => {
              return this._handlePtFragLoadEnd({ row, col });
            }}
          />
        );
      })}
      {willRenderGetReady && (<GetReadyComponent
        onReady={this._handleReady}
      />)}
      </ImageBackground>
    );
  }

  _renderFooter()
  {
    return (
      <FooterComponent
        ref={ref => { this._refFooterComp = ref; }}
      />
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
