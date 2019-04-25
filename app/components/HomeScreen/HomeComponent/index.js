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
  refFragments = [];

  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {
      photos: [],
      selectedPhoto: null,
      fragments: [],
      fragmentRows: 4, // 5~10
      fragmentCols: 4, // 5~10,
      /** @var {Object}  */
      imgStyle: null,
      /** @var {Object}  */
      fragmentStyle: null
    };

    // Bind method(s)
    this._handleGetPhotos = this._handleGetPhotos.bind(this);
    this._cameraRollRequestPermissions = this._cameraRollRequestPermissions.bind(this);
    this._cameraRollGetPhotos = this._cameraRollGetPhotos.bind(this);
    this._handleLayout = this._handleLayout.bind(this);

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
    this.setState({ selectedPhoto });
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

  _renderHeader()
  {
    return (
      <View style={[styles.header]}>
        <Text>Header</Text>
      </View>
    );
  }

  _renderBody()
  {
    let {
      selectedPhoto,
      // fragments,
      fragmentRows,
      fragmentCols,
      imgStyle,
      fragmentStyle
    } = this.state;

    //
    let willRender = (selectedPhoto && imgStyle && fragmentStyle);
    //
    this.refFragments.splice(0);

    //
    let fragments = [];
    if (willRender) {
      this._map((row, col) => {
        fragments.push({ row, col });
      });
      fragments = helpers.shuffle(fragments);
    }
    console.log('fragments: ', fragments);

    return (
      <View
        style={[styles.body]}
        onLayout={(event) => {
          this._handleLayout(event, 'body');
        }}
      >
        {fragments.map(({ row, col }) => {
          return (
            <PhotoFragmentComponent
              ref={ref => {
                this.refFragments.push(ref);
              }}
              key={`fragment-r${row}-c${col}`}
              imgSrc={selectedPhoto}
              imgStyle={imgStyle}
              rows={fragmentRows}
              cols={fragmentCols}
              row={row}
              col={col}
              fragmentStyle={fragmentStyle}
            />
          );
        })}
      </View>
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
