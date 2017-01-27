import React, { Component } from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
// import { createStore, applyMiddleware } from 'redux';
// import LandingPage from './components/LandingPage';
import { Provider } from 'react-redux';
// import firebase from 'firebase';
import store from './store';

import Router from './components/Router';
// import reducers from './reducers';

// Disables yellow warnings! Yay!
console.disableYellowBox = true;

const config = {
  identifier: 'jeans geofence',
  latitude: 0,
  longitude: 0,
  radius: '100', // in meters... is this supposed to be a string??
  notifyOnEntry: true,
  notifyOnExit: false,
  notifyOnDwell: false, // Android only
  loiteringDelay: '0' // Android only
};

const createGeofence = (config) => {
  const bgGeo = global.BackgroundGeolocation;
  bgGeo.addGeofence(config, createGeofenceSuccess, createGeofenceFail);
  // BackgroundGeolocation.addGeofence(config, createGeofenceSuccess, createGeofenceFail);
};

const createGeofenceSuccess = (identifier) => {
  console.log('you successfully created a geofence!:', identifier);
};

const createGeofenceFail = (error) => {
  console.warn('- addGeofence error: ', error);
};

export default class App extends Component {
  componentWillMount() {
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // This handler fires when a geofence crossing event occurs
    BackgroundGeolocation.on('geofence', this.onGeofenceCross);

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
// 41.888723, -87.637215 is merchandise mart
// 41.908076, -87.631128 is close to where the fence is
    BackgroundGeolocation.addGeofence({
      identifier: 'jeans geofence',
      latitude: 41.908759,
      longitude: -87.6310154,
      radius: '100', // in meters... is this supposed to be a string??
      notifyOnEntry: true,
      notifyOnExit: false,
      notifyOnDwell: false, // Android only
      loiteringDelay: '0' // Android only
    }, (identifier) => {
      console.log('you successfully created a geofence!:', identifier);
    }, (error) => {
      console.warn('- addGeofence error: ', error);
    });
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
    BackgroundGeolocation.un('geofence', this.onGeofenceCross);
  }
  onLocation(location) {
    console.log('- [js]location: ', JSON.stringify(location));
  }
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }
  onGeofenceCross({ location, identifier, action }) {
    try {
      console.log('A geofence has been crossed: ', identifier);
      console.log('ENTER or EXIT?: ', action);
      console.log('location: ', JSON.stringify(location));
    } catch (err) {
      console.error('onGeofenceCross error happened:', err);
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
