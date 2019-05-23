/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import { RNCamera } from 'react-native-camera';
//
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';
// Css
import styles from './styles';

// Component(s)

/**
 * @class CameraComponent
 */
export default class CameraComponent extends PureComponent
{
  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {
      photo: null,
      cameraOpts: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto
      }
    };

    // Bind method(s)
    this._takePicture = this._takePicture.bind(this);
    this._handleCloseMe = this._handleCloseMe.bind(this);
    this._handleTakePhoto = this._handleTakePhoto.bind(this);
    this._handleSetCameraOpts = this._handleSetCameraOpts.bind(this);

    // Navigation event(s)
  }

  componentDidMount()
  {}

  componentWillUnmount()
  {
  }
  
  async _takePicture(camera)
  {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  }

  _handleCloseMe(event)
  {
    let { onClose } = this.props;
    if (onClose) {
      onClose(event);
    }
  }

  /**
   * 
   */
  async _handleTakePhoto()
  {
    let { onPhotoTaken } = this.props;
    const options = {};
    const data = await this.refCamera.takePictureAsync(options);
    if (onPhotoTaken) {
      onPhotoTaken(data);
    }
  }

  /**
   * 
   */
  _handleSetCameraOpts(cameraOpts = {})
  {
    let { cameraOpts: camOpts } = this.state;
    if ('type' in cameraOpts) {
      cameraOpts.type = (camOpts.type === RNCamera.Constants.Type.back)
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back;
    }
    this.setState({ cameraOpts });
  }

  _renderToolBox()
  {
    return (
      <View
        style={[styles.toolBox]}
      >
        <View
          style={[styles.toolBoxItem, styles.toolBoxL]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._handleCloseMe}
            style={[styles.toolBoxIco, styles.toolBoxLIco, styles.toolBoxIcoClose]}
          >
            <VectorIcon nameAndroid="md-images" nameIos="ios-images" size={32} />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.toolBoxItem, styles.toolBoxC]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._handleTakePhoto}
            style={[styles.toolBoxIco, styles.toolBoxCIco, styles.toolBoxIcoAperture]}
          >
            <VectorIcon nameAndroid="md-aperture" nameIos="ios-aperture" size={32} />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.toolBoxItem, styles.toolBoxR]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              return this._handleSetCameraOpts({ type: true });
            }}
            style={[styles.toolBoxIco, styles.toolBoxRIco, styles.toolBoxIcoSync]}
          >
            <VectorIcon nameAndroid="md-sync" nameIos="ios-sync" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render()
  {
    let { cameraOpts } = this.state;

    //
    return (
      <View style={[StyleSheet.absoluteFill, styles.root]}>
        <RNCamera
          ref={ref => { this.refCamera = ref; }}
          style={[styles.preview]}
          type={cameraOpts.type}
          flashMode={cameraOpts.flashMode}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ status }) => {
            if (status !== 'READY') return <View style={[styles.pendingView]} />;
            return this._renderToolBox();
          }}
        </RNCamera>
      </View>
    );
  }
}
// Make alias
const _static = CameraComponent;
