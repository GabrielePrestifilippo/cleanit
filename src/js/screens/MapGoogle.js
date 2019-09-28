import React, {Component} from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import {
  PermissionsAndroid,
  ActivityIndicator,
  Text,
  TouchableHighlight,
} from 'react-native';
import {View, Button} from 'react-native';
import styles from './styles.js';

class MapGoogle extends Component {
  constructor(props) {
    super(props);
    this.openCamera = this.openCamera.bind(this);
    this.map = null;
    this.state = {
      loading: true,
      timer: 12000,
    };
  }

  getMarkers = () => [
    {
      latlng: {
        latitude: 47.3901024,
        longitude: 8.5151693,
      },
      color: styles.getDensityStyle('high'),
      size: 80,
    },
    {
      latlng: {
        latitude: 47.3905024,
        longitude: 8.5121693,
      },
      color: styles.getDensityStyle('high'),
      size: 80,
    },
    {
      latlng: {
        latitude: 47.3921524,
        longitude: 8.5132693,
      },
      color: styles.getDensityStyle('low'),
      size: 45,
    },
    {
      latlng: {
        latitude: 47.3941524,
        longitude: 8.5128293,
      },
      color: styles.getDensityStyle('low'),
      size: 45,
    },
  ];
  successPosition = position => {
    this.setState({loading: false});

    if (this.map && position.coords && position.coords.latitude) {
      this.map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.00121,
      });
    }
  };

  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Enable position to collect litter',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        geolocation.getCurrentPosition(this.successPosition);
        this.watchId = geolocation.watchPosition(
          this.successPosition,
          e => alert(JSON.stringify(e)),
          {enableHighAccuracy: true, distanceFilter: 0},
        );
      } else {
        alert('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentDidMount() {
    this.requestPermission();
    setTimeout(() => {
      this.setState({loading: false});
    }, 1000);

    this.timer = this.setInterval(() => {
      if (this.state.timer > 1000) {
        this.setState({timer: this.state.timer - 1000});
      } else {
        clearInterval(this.timer);
        this.props.navigation.navigate('Leaderboard');
      }
    }, 1000);
  }
  componentWillUnmount() {
    geolocation.clearWatch(this.watchId);
  }

  openCamera() {
    this.props.navigation.navigate('CameraScreen');
  }
  getTime = () => {
    const date = new Date(null);
    date.setSeconds(this.state.timer);
    return date.toISOString().substr(11, 8);
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={styles.parentContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}> Preparing the challenge</Text>
            <ActivityIndicator size="large" color={'white'} />
          </View>
        )}
        <MapView
          ref={el => {
            this.map = el;
          }}
          style={styles.map}
          initialRegion={{
            latitude: 47.3901024,
            longitude: 8.5151693,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.00121,
          }}
          showsMyLocationButton
          showsCompass
          showsScale
          showsUserLocation
          followsUserLocation
          showsIndoors>
          <Text style={{backgroundColor: 'rgba(0,0,0,0.5)', color: 'white'}}>
            Time left: {this.getTime()}
          </Text>
          {this.getMarkers().map((marker, id) => (
            <Circle
              key={id}
              center={marker.latlng}
              radius={marker.size}
              fillColor={marker.color}
            />
          ))}
        </MapView>
        {!loading && (
          <TouchableHighlight
            style={[styles.button, {position: 'absolute', bottom: 20}]}
            onPress={this.openCamera}>
            <Text style={styles.textButton}>Collect litter</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

MapGoogle.navigationOptions = {
  header: null,
};
export default MapGoogle;
