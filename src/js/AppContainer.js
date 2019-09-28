import React from 'react';
import {Provider} from 'react-redux';
import store from './reduxStore';

import MapGoogle from './screens/MapGoogle';
import Login from './screens/Login';
import Camera from './screens/Camera';
import CameraDetail from './screens/CameraDetail';
import Leaderboard from './screens/Leaderboard';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    MapGoogle: {screen: MapGoogle},
    Leaderboard: {screen: Leaderboard},
    Camera: createStackNavigator(
      {
        CameraScreen: {screen: Camera},
        Detail: {screen: CameraDetail},
      },
      {mode: 'modal', headerMode: 'none'},
    ),
  },
  {header: null, headerMode: 'none'},
);

let Navigation = createAppContainer(AppNavigator);

class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default AppContainer;
