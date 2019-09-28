import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
const logo = require('./CleanCity.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.onStart = this.onStart.bind(this);
  }

  onStart() {
    this.props.navigation.navigate('MapGoogle');
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <Image
          style={{width: 325 / 1.5, height: 159 / 1.5, resizeMode: 'stretch'}}
          source={logo}
        />

        <Text
          style={{
            fontSize: 25,
            color: 'rgba(255, 255, 255, 1)',
          }}
        />

        <TouchableHighlight style={styles.button} onPress={this.onStart}>
          <Text style={styles.textButton}>Start Game</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

Login.navigationOptions = {
  header: null,
};

export default Login;
