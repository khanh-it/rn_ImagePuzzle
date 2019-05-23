/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import * as Ani from 'react-native-animatable';
//
import {
  View,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  CameraRoll,
  TextInput,
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
import CameraComponent from '../CameraComponent';

/**
 * @class PhotoTakerComponent
 */
export default class PhotoTakerComponent extends PureComponent
{
  constructor(props)
  {
    super(props);

    // Initial state
    this.state = {
      /** @var {Object}  */
      photos: {
        edges: [],
        page_info: {}
      },
      /** @var {Boolean}  */
      cameraFlag: false
    };

    // Bind method(s)
    this._cameraRollGetPhotos = this._cameraRollGetPhotos.bind(this);
    this._handleSelectPhoto = this._handleSelectPhoto.bind(this);
    this._handleTakePhotoFromCamera = this._handleTakePhotoFromCamera.bind(this);
    this._handleCloseMe = this._handleCloseMe.bind(this);
    this._renderPhotos = this._renderPhotos.bind(this);
    //
    this._cameraRollRequestPermissions = this._cameraRollRequestPermissions.bind(this);
    this._cameraRollGetPhotos = this._cameraRollGetPhotos.bind(this);

    // Navigation event(s)
  }

  componentDidMount()
  {
    this._cameraRollGetPhotos();
  }

  async _cameraRollRequestPermissions()
  {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Cool Photo App needs access to your camera so you can take awesome pictures.',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return granted;
      } else {
        throw new Error('Permission denied!!!');
      }
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * 
   */
  async _cameraRollGetPhotos()
  {
    const granted = await this._cameraRollRequestPermissions();
    if (undefined !== granted) {
      let { photos } = this.state;
      CameraRoll.getPhotos({
        first: 20,
        after: photos.page_info.end_cursor,
        assetType: 'Photos',
      })
      .then(photos => {
        console.log('getPhotos: ', photos);
        this.setState({ photos });
      })
      .catch((err) => {
        //Error Loading Images
        console.warn(err);
        alert($g.Lang('Load photos has failed!'));
      });
    }
  }

  /**
   * 
   */
  _handleSelectPhoto(photo, index)
  {
    console.log(`Image ${index}: ${photo.node.image.uri} is selected!`);
    let { onPhotoSelected } = this.props;
    if (onPhotoSelected) {
      onPhotoSelected(photo, index);
    }
  }

  _handleTakePhotoFromCamera(event)
  {
    this.setState({ cameraFlag: true });
  }

  _handleCloseMe(event)
  {
    this.refAniView.bounceOutDown(700)
      .then((endState) => {
        let { onClosed } = this.props;
        if (onClosed) {
          onClosed(event);
        }
      });
  }

  _renderToolBox()
  {
    return (
      <View
        style={[styles.toolBox]}
      >
        <View
          style={[styles.toolBoxL]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._handleTakePhotoFromCamera}
            style={[styles.toolBoxIco, styles.toolBoxLIco, styles.toolBoxLIcoTakePhoto]}
          >
            <VectorIcon nameAndroid="md-camera" nameIos="ios-camera" size={32} />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.toolBoxR]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._handleCloseMe}
            style={[styles.toolBoxIco, styles.toolBoxRIco, styles.toolBoxRIcoClose]}
          >
            <VectorIcon nameAndroid="md-close-circle-outline" nameIos="ios-close-circle-outline" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderPhotos()
  {
    let {
      photos
    } = this.state;

    return (
      <View
        style={[styles.photos]}
      >
        <ScrollView
          style={[styles.photosSV]}
          contentContainerStyle={[styles.photosSVC]}
        >
          {(photos.edges || []).map((p, i) => {
          return (
            <TouchableOpacity 
              key={`photo-${i}`}
              onPress={() => this._handleSelectPhoto(p, i)}
            >
              <Image
                source={{ uri: p.node.image.uri }}
                style={styles.photosImg}
              />
            </TouchableOpacity>
          );
        })}
        </ScrollView>
      </View>
    );
  }

  _renderTakePhoto()
  {
    let { cameraFlag } = this.state;

    return (cameraFlag 
      ? (
        <CameraComponent
          onClose={() => {
            this.setState({ cameraFlag: false });
          }}
          onPhotoTaken={async (data) => {
            // eslint-disable-next-line
            // console.log('taken photo: ', data);
            await CameraRoll.saveToCameraRoll(data.uri, 'photo');
            await this._cameraRollGetPhotos();
            this.setState({ cameraFlag: false });
          }}
        />
      )
      : null
    );
  }

  render()
  {
    return (
      <Ani.View
        ref={ref => { this.refAniView = ref; }}
        style={[StyleSheet.absoluteFill, styles.root]}
        animation='bounceInUp'
        duration={700}
        // onAnimationEnd={}
      >
        {/* Toolbox */}{this._renderToolBox()}{/* .end#Toolbox */}
        {/* Photos */}{this._renderPhotos()}{/* .end#Photos */}
        {/* TakePhoto */}{this._renderTakePhoto()}{/* .end#TakePhoto */}
      </Ani.View>
    );
  }
}
// Make alias
const _static = PhotoTakerComponent;
