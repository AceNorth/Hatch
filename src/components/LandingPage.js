'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, MapView } from 'react-native';
import { Button, Spinner } from './common';

let events = require('events');
let eventEmitter = new events.EventEmitter();

/*
current location
x: 41.889189...
y: -87.635707...
*/

export default class LocationDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: { 
        timestamp: 0, 
        coords: { 
          latitude: 1, 
          longitude: 1 
        } 
      },
      packagePosition: {
        // x: 41.889189...
        // y: -87.635707...
        coords: {
          lat: 41.889189,
          long: -87.635707
        }
      },
      fenceRadius: 1,
      loading: false
    };

    this.onButtonPress = this.onButtonPress.bind(this);

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

  onButtonPress() {
    // eventually we'll want to set "loading" to true while we
    // check the user's location data against the package data:
    // this.setState({ loading: true });
    // ...but not yet.
    this.updateCurrentPosition();
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onButtonPress}>
        Get current location
        </Button>
  }
  
  componentDidMount() {
    this.updateCurrentPosition();
  } 

  //checks fence ==> this will be emitted very time a user changes location
  //how to we automatically ping the user's location
  markerCheck(x,y){

    let radius = 0.0050;

    //change the similuator x value to 41.880189
    //(x - center_x)^2 + (y - center_y)^2 < radius^2
    let fence = Math.pow(x-(41.889189), 2) + Math.pow(y-(-87.6354), 2)
    if(fence < Math.pow(radius, 2)){
      return true
    }

    return false;
    //41.888189, -87.6354 ==> true
    //41.880189, -87.6357 ==> false
  }

  renderFenceCheck(){
    const position = this.state.currentPosition;
    if(this.markerCheck(position.coords.latitude, position.coords.longitude) === true){
      return <Text>You're Within Bounds</Text>
    }

    return <Text>Outta Bounds: </Text>
  }

  render() {
    const position = this.state.currentPosition;
    return (
      <View>
        <MapView
          style={{height: 400, width: 400, margin: 0}}
          showsUserLocation={true}
          region={{latitude: position.coords.latitude, longitude: position.coords.longitude, 
                   latitudeDelta: .01, longitudeDelta: .01}}
          overlays={[
            { coordinates: [
                {latitude: position.coords.latitude,longitude: position.coords.longitude },
              ],
              strokeColor: '#640C64',
              lineWidth: 50,
            }]
          }
        />
        <Text style={styles.title}>Current position: </Text>
        <Text> X: {position.coords.latitude} </Text>
        <Text> Y: {position.coords.longitude} </Text>
        <Text> Timestamp: {position.timestamp} </Text>
        {this.renderButton()}
        
        <Text> Inbounds?: </Text>
        {this.renderFenceCheck()}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
