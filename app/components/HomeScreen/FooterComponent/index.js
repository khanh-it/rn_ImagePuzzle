/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  CameraRoll,
  TextInput
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';
// Css
import styles from './styles';

// Component(s)

/**
 * @class FooterComponent
 */
export default class FooterComponent extends PureComponent
{
  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {};

    // Bind method(s)
    this._handleGetPhotos = this._handleGetPhotos.bind(this);
    this._cameraRollRequestPermissions = this._cameraRollRequestPermissions.bind(this);
    this._cameraRollGetPhotos = this._cameraRollGetPhotos.bind(this);

    // Navigation event(s)
  }

  componentDidMount()
  {}

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

  render()
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
}
// Make alias
const _static = FooterComponent;
