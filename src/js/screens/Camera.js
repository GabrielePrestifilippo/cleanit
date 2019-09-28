// 'use strict';
import React from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Button,
  TouchableHighlight,
} from 'react-native';
import styles from './styles.js';
import {RNCamera} from 'react-native-camera';

const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
  apiKey: 'CLARIFAI_API_KEY',
});
\
process.nextTick = setImmediate;
async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return {status: 'granted'};
    } else {
      return {status: 'denied'};
    }
  } catch (err) {
    console.warn(err);
  }
}

class Camera extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    hasCameraPermission: null,
    prediction: null,
    currentObject: null,
  };

  async componentDidMount() {
    const {status} = await requestCameraPermission();
    this.setState({hasCameraPermission: status === 'granted'});

    this.intervalDetection = setInterval(this.objectDetection, 1000);
  }
  capturePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        quality: 0.5,
        base64: true,
        width: 300,
      });
      return photo.base64;
    }
  };

  predict = async image => {
    let prediction = await clarifai.models.predict(
      {
        id: 'garbage',
      },
      image,
    );
    return prediction;
  };
  objectDetection = async () => {
    clearInterval(this.intervalDetection);
    let photo = await this.capturePhoto();
    let predictions = await this.predict(photo);
    let item = null;
    try {
      item = predictions.outputs[0].data.concepts[0].name;
    } catch (e) {
      console.log('error detecting');
      this.setState({currentObject: '\n Not recognizing this item'});
      this.intervalDetection = setInterval(this.objectDetection, 1000);
    }
    console.log('xxx item:', item);
    if (item !== null) {
      this.props.navigation.navigate('Detail', {item});
    }
  };

  render() {
    const {hasCameraPermission, prediction} = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{flex: 1}}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{flex: 1}}
            type={this.state.type}>
            <TouchableHighlight
              style={[
                styles.button,
                {
                  width: 350,
                  alignSelf: 'center',
                  alignItems: 'center',
                  top: -80,
                  padding: 20,
                },
              ]}>
              <Text style={styles.textButton}>
                Looking for garbage to collect..
              </Text>
            </TouchableHighlight>
            <View
              style={{
                width: '90%',
                height: '50%',
                borderWidth: 2,
                borderColor: '#80c446',
                alignSelf: 'center',
              }}
            />
          </RNCamera>
        </View>
      );
    }
  }
}

export default Camera;
