import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
import LandingPage from './components/LandingPage';
// import ReduxThunk from 'redux-thunk';

// import Router from './Router';
// import reducers from './reducers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class App extends Component {
  componentWillMount() {
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // Now configure the plugin.
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: true, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      // url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
      // autoSync: true,         // <-- POST each location immediately to server
      // params: {               // <-- Optional HTTP params
      //   "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      // }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }
  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  }
  onLocation(location) {
    console.log('- [js]location: ', JSON.stringify(location));
  }
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }
  render() {
    return (
      <View style={styles.container}>
         <LandingPage />
      </View>
    );
  }
}
