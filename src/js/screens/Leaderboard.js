// 'use strict';
import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import styles from './styles.js';
const logo = require('./reward.png');
const coin = require('./coin.png');
class Leaderboard extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <View style={styles.parentContainer}>
        <>
          <Image
            style={{width: 140, height: 140, resizeMode: 'stretch'}}
            source={logo}
          />
          <Text style={[styles.loadingText, {color: '#80c446'}]}>
            Congratulations!
          </Text>
          <Text style={[styles.smallText, {color: '#80c446'}]}>
            You collected a {item}
          </Text>
          <Text style={[styles.smallText, {color: '#80c446', margin: 40}]}>
            You earned 1 point
          </Text>
          <Image
            style={{width: 40, height: 40, resizeMode: 'stretch'}}
            source={coin}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('MapGoogle')}>
            <Text style={styles.textButton}>Collect More</Text>
          </TouchableHighlight>
        </>
      </View>
    );
  }
}

export default Leaderboard;
