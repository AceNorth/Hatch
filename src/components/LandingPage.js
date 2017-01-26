'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, MapView } from 'react-native';
import { Button, Spinner } from './common';

export default class LocationDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: { timestamp: 0, coords: { latitude: 1, longitude: 1 } },
      loading: false
    };

    this.onButtonPress = this.onButtonPress.bind(this);

  }


  onPackageRetrievalSuccess() {
    // what we do if the user is in the correct spot to retrieve their package
    // this.setState({ loading: false });
  }

  onPackageRetrievalFailure() {
    // what we do if the user is NOT in the correct spot to retrieve their package
    // this.setState({ loading: false });
  }

  componentDidMount() {
    this.updateCurrentPosition();
  }

  onButtonPress() {
    // eventually we'll want to set "loading" to true while we
    // check the user's location data against the package data:
    // this.setState({ loading: true });
    // ...but not yet.
    this.updateCurrentPosition();

  }

  updateCurrentPosition() {

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 1
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ currentPosition: position })
      , null, options);
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onButtonPress}>
        Get current location
        </Button>
  }

  render() {
    const position = this.state.currentPosition;
    return (
      <View>
        <MapView
          style={{height: 400, width: 400, margin: 0}}
          showsUserLocation={true}
          region={{latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .01, longitudeDelta: .01}}
        />
        <Text style={styles.title}>Current position: </Text>
        <Text> X: {position.coords.latitude} </Text>
        <Text> Y: {position.coords.longitude} </Text>
        <Text> Timestamp: {position.timestamp} </Text>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
