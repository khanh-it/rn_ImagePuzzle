/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import Sound from "react-native-sound";
//
import {
  View,
  // ScrollView,
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';
// Css
import styles from '../styles';

// Component(s)
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import PhotoFragmentComponent from '../PhotoFragmentComponent';
import GetReadyComponent from './GetReadyComponent';
import PhotoTakerComponent from '../PhotoTakerComponent';

//
import * as helpers from '../../../helpers';

// Enable playback in silence mode
Sound.setCategory('Playback');

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
      fragmentRows: 3, // 3~10
      fragmentCols: 3, // 3~10,
      /** @var {Object}  */
      imgStyle: null,
      /** @var {Object}  */
      fragmentStyle: null,
      /** @var {Number}  */
      gameCnt: 0, // count number of times game played,
      /** @var {Object}  */
      gameStat: {}, // game's current status!
      /** @var {Number}  */
      moveCnt: 0, // move(s) count,
      /** @var {Boolean}  */
      readyFlag: null,
      /** @var {Boolean}  */
      takePhotoFlag: false
    };

    // Bind method(s)
    this._handleLayout = this._handleLayout.bind(this);
    this._handlePtFragPress = this._handlePtFragPress.bind(this);
    this._handlePtFragLoadEnd = this._handlePtFragLoadEnd.bind(this);
    this._setPhotoFragment = this._setPhotoFragment.bind(this);
    this._handleReady = this._handleReady.bind(this);
    // +++
    this._playSound = this._playSound.bind(this);
    this._playSoundSystemBg = this._playSoundSystemBg.bind(this);
    this._playSoundPtFragPress = this._playSoundPtFragPress.bind(this);

    // Navigation event(s)
  }

  componentDidMount()
  {
    // Init sound(s)
    this._playSoundSystemBg({
      onBfPlay: (sound) => {
        sound.setNumberOfLoops(-1);
        return false;
      }
    });
    this._playSoundPtFragPress({ onBfPlay: () => false });
    //.end
    // @TODO: this._startGame();
  }

  componentDidUpdate()
  {
    let {
      gameStat,
      moveCnt
    } = this.state;

    // Case: game is getting finish
    if ('finishing' === gameStat.stat) {

    }

    // Case: game is finished
    if ('finished' === gameStat.stat) {
      Alert.alert(
        'Congratulations',
        `Your score(s): ${moveCnt}.`,
        [
          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Replay',
            onPress: () => {
              this._startGame();
            },
            // style: 'cancel',
          },
          {
            text: 'New Game',
            onPress: () => {
              mapShuffle = map.concat([]);
              this.setState({ mapShuffle });
            }
          },
        ],
        { cancelable: false },
      );
    }
  }

  /**
   * @var {Object} Sound instances
   */
  static _sounds = {};

  /**
   * Helper: play sound
   * @param {String} type
   * @param {Object} opts
   * @return {Object}
   */
  _playSound(type, { isRequire, url, pause, onBfPlay })
  {
    //
    //
    //
    function getSound(callback)
    {
      let sound = _static._sounds[type];
      if (sound) {
        callback(null, sound);
      } else {
        sound = new Sound(url, (error) => {
          if (error) {
            _static._sounds[type] = null;
            Alert.alert("error", error.message);
          }
          callback(error, sound);
        });
      }
      return sound;
    }
    let sound = getSound((error, sound) => {
      if (!error && sound) { 
        // Run optional pre-play callback
        let callBfPlayRs = null;
        if (onBfPlay) {
          callBfPlayRs = onBfPlay(sound);
        }
        if (false !== callBfPlayRs) {
          if (pause) {
            sound.setNumberOfLoops(0);
            sound.stop(() => sound.release());
            _static._sounds[type] = null;
            return;
            return sound.pause(() => {
              console.log(`Pause sound ${type}!`);
            });
          }
          sound.stop(() => sound.play(() => {
            console.log(`Play sound ${type}!`);
            // Release when it's done so we're not using up resources
            // sound.release();
          }));
        }
      }
    });
    return sound;
  }

  /**
   * Play sound system background
   * @param {Object}
   * @return {Object}
   */
  _playSoundSystemBg(opts = {})
  {
    let sound = this._playSound('SYS_BG', Object.assign(opts, {
      isRequire: true,
      url: require("../../../assets/audio/whoosh.mp3")
    }));
    return sound;
  }

  /**
   * Play sound when <PhotoFragment /> is pressed
   * @param {Object}
   * @return {Object}
   */
  _playSoundPtFragPress(opts = {})
  {
    let sound = this._playSound('PT_FRAGMENT', Object.assign(opts, {
      isRequire: true,
      url: require("../../../assets/audio/whoosh.mp3")
    }));
    return sound;
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
    let mapInvisible = [];
    let { map, mapShuffle } = this.state;
    if (map.length && (map.length === mapShuffle.length)) {
      result = true;
      for (let index in map) {
        let item = map[index];
        let _item = mapShuffle[index];
        if (result && !(item.row === _item.row && item.col === _item.col)) {
          result = false;
        }
        if (!item.visible) {
          mapInvisible.push(item);
        }
        if (!_item.visible) {
          mapInvisible.push(_item);
        }
      }
    }
    // Case: the game is finished
    if (result) {
      // Reset <PhotoFragment /> item's state
      mapInvisible.forEach(item => {
        item.visible = true;
      });
      mapShuffle = [];
      this.setState({ mapShuffle, gameStat: { 'stat': 'finished' } });
    }

    // Return
    return result;
  }

  /**
   * @TODO: 
   * @param {*} _selectedPhoto 
   */
  _startGame(_selectedPhoto)
  {
    //
    let selectedPhoto = _selectedPhoto || require('../../../assets/img/puzzle/001.jpg'); // _selectedPhoto
    // Create map data of fragments from photo
    let map = [];
    this._map((row, col) => map.push({
      row, col,
      ref: null, // PhotoFragment's ref
      visible: true
    }));
    //
    this.setState(({ gameCnt }) => {
      return {
        selectedPhoto,
        map,
        mapShuffle: [],
        gameCnt: gameCnt + 1,
        gameStat: {},
        moveCnt: 0,
        readyFlag: false
      }
    });
    // @TODO: 
    this._playSoundSystemBg({});
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
    let a = mapShuffle[0]; mapShuffle[0] = mapShuffle[1]; mapShuffle[1] = a;
    // @TODO:
    helpers.shuffle(mapShuffle);
    // @TODO: detect photo fragment is visible rule?
    mapShuffle[0].visible = false;
    //
    this.setState({ readyFlag: true, mapShuffle });
  }

  _layouts = {}

  /**
   * Handler: component's layout changes
   * @param {Object} event 
   * @param {String} type 
   */
  _handleLayout(event, type)
  {
    // console.log('_handleLayout: ', type, event.nativeEvent);
    let layout = event.nativeEvent.layout;

    // Case: "boby" component!
    if ('body' === type && !this._layouts[type]) {
      let { fragmentRows, fragmentCols } = this.state;
      let { width, height } = layout;
      // +++ Set style for <Image /> in PhotoFragment!
      let imgStyle = { width, height };
      // @TODO: ???
      width -= 1; height -= 0;
      // +++ Calculate style for the PhotoFragment itself
      let fragmentStyle = {
        width: Math.floor(width / fragmentCols),
        height: Math.floor(height / fragmentRows)
      };
      // +++ calculate style for body component
      let paddings = {
        width: width - (fragmentStyle.width * fragmentCols),
        height: height - (fragmentStyle.height * fragmentRows),
      };
      let top = Math.ceil(paddings.height / 2);
      let bottom = paddings.height - top;
      let left = Math.ceil(paddings.width / 2);
      let right = paddings.width - left;
      let bodyStyle = {
        borderTopWidth: top,
        borderRightWidth: right,
        borderBottomWidth: bottom,
        borderLeftWidth: left,
      };
      // console.log({ imgStyle, fragmentStyle, paddings, bodyStyle });
      this._refBody.setNativeProps(bodyStyle);
      // 
      this.setState({ imgStyle, fragmentStyle });
    }
    // Store layout date for later uses
    this._layouts[type] = layout;
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

  /**
   * Handler: on PhotoFragment is pressed
   * @param {Object} param
   */
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
          break;
        }
      }
      // 
      if (posibleItem) {
        // console.log('posibleItem: ', position, posibleItem);
        // Play sound
        this._playSoundPtFragPress();
        // @TODO: switch PhotoFragments
        this.setState(({ mapShuffle, moveCnt }) => {
          let item = mapShuffle[foundItem.index];
          mapShuffle[foundItem.index] = mapShuffle[posibleItem.index];
          mapShuffle[posibleItem.index] = item;
          mapShuffle = mapShuffle.concat([]);
          // Check if game is finished?
          setTimeout(this._isGameFinished.bind(this));
          //
          this._refHeaderComp.setMoveCnt(++moveCnt);
          //
          return { mapShuffle, moveCnt };
        });
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

  /**
   * Render <HeaderComponent />
   */
  _renderHeader()
  {
    let { gameCnt, moveCnt } = this.state;

    return (
      <HeaderComponent
        key={`hdr${gameCnt}`}
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
        ref={ref => {
          this._refBody = ref;
        }}
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
        onSoundSystemPress={(pause) => {
          this._playSoundSystemBg({ pause });
        }}
        handleGetPhotos={() => {
          this.setState({ takePhotoFlag: true });
        }}
      />
    );
  }

  render()
  {
    let {
      takePhotoFlag
    } = this.state;
    //
    return ([
      <ImageBackground
        key='game-box'
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
      </ImageBackground>,
      (takePhotoFlag ? <PhotoTakerComponent
        key='photo-taker-box'
        ref={ref => {
          this.refPhotoTaker = ref;
        }}
        onPhotoSelected={(photo) => {
          this.setState({ takePhotoFlag: false });
          this._startGame(photo.node.image);
        }}
        onClosed={() => {
          this.setState({ takePhotoFlag: false });
        }}
      /> : null)
    ]);
  }
}
// Make alias
const _static = HomeComponent;
